import { compose, withHandlers, withState } from 'recompose'
import { flatten, values } from 'lodash'

import React from 'react'
import Wizard from './Wizard'
import { database } from './firebase'
import wizardQuestions from './wizardQuestions'

function WizardContainer({
  currentQuestionId,
  onNextClick,
  pendingAnswer,
  setPendingAnswer,
  setTravelLength,
  travelLength,
}) {
  const wizardEnd = !wizardQuestions[currentQuestionId]

  if (wizardEnd) {
    return <div />
  }

  return (
    <Wizard
      currentQuestionId={currentQuestionId}
      onNextClick={onNextClick}
      pendingAnswer={pendingAnswer}
      setPendingAnswer={setPendingAnswer}
      setTravelLength={setTravelLength}
      travelLength={travelLength}
      wizardQuestions={wizardQuestions}
    />
  )
}

export default compose(
  withState('currentQuestionId', 'setCurrentQuestionId', 0),
  withState('givenAnswers', 'setGivenAnswers', []),
  withState('pendingAnswer', 'setPendingAnswer'),
  withState('travelLength', 'setTravelLength'),
  withHandlers({
    resolveItems: ({
      givenAnswers,
      onWizardComplete,
      pendingAnswer,
      travelLength,
    }) => () => {
      const packagesRef = database.ref('packages')

      packagesRef.once('value', packagesSnapshot => {
        const packageIdsFromAnswers = getMappedPackageIds({
          givenAnswers,
          pendingAnswer,
          categories: values(packagesSnapshot.val()),
        })

        const itemsRef = database.ref('items')

        itemsRef.once('value', itemsSnapshot => {
          const allItems = values(itemsSnapshot.val())

          // get all the items that include one or more of the packageIds from the answers
          // then replace the item's packageIds array with only one of packageIds from the answers
          // so in the final packlist the items with multiple packageIds only get listed once,
          // and can be grouped in one key later in the processing

          const mappedItems = allItems
            .filter(item => {
              let isIncludedInPackage

              packageIdsFromAnswers.forEach(packageIdFromAnswers => {
                if (item.packageIds.includes(packageIdFromAnswers)) {
                  isIncludedInPackage = true
                }
              })
              return isIncludedInPackage
            })
            .map(item => {
              return {
                ...item,
                amount:
                  item.dayFactor && travelLength
                    ? Math.ceil(travelLength * item.dayFactor)
                    : null,
                packageIds: [
                  item.packageIds.find(packageId =>
                    packageIdsFromAnswers.includes(packageId)
                  ),
                ],
              }
            })

          onWizardComplete(mappedItems)
        })
      })
    },
  }),
  withHandlers({
    onNextClick: ({
      currentQuestionId,
      resolveItems,
      givenAnswers,
      pendingAnswer,
      setCurrentQuestionId,
      setGivenAnswers,
      setPendingAnswer,
    }) => () => {
      const wizardEnd = !wizardQuestions[currentQuestionId + 1]

      if (wizardEnd) {
        resolveItems()
      }

      setPendingAnswer(null)
      setGivenAnswers([...givenAnswers, pendingAnswer])
      setCurrentQuestionId(currentQuestionId + 1)
    },
  })
)(WizardContainer)

function getMappedPackageIds({ categories, givenAnswers, pendingAnswer }) {
  // get all possible answer options
  const allAnswerOptions = flatten(
    wizardQuestions.reduce(
      (question, currentValue) => [...question, currentValue.answers],
      []
    )
  )

  // filter for the ones that are relevant based on the given answers
  const matchingAnswerOptions = allAnswerOptions.filter(answerOption =>
    [...givenAnswers, pendingAnswer].includes(answerOption.id)
  )

  // get their packageIds
  const packageIds = flatten(
    matchingAnswerOptions.map(matchingAnswerOption => {
      return matchingAnswerOption.packageIds
    })
  )

  // get the packageIds that are implicitly included in
  // one of the categories that will be displayed on the packlist

  let implicitCategories = []

  categories.forEach(category => {
    if (!packageIds.includes(category)) {
      return
    }
    if (category.includePackageIds) {
      category.includePackageIds.forEach(includePackageId =>
        implicitCategories.push(includePackageId)
      )
    }
  })

  return [...packageIds, ...implicitCategories]
}
