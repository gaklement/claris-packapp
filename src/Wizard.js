import { compose, withHandlers, withState } from 'recompose'
import { flatten, isNil, values } from 'lodash'

import React from 'react'
import { database } from './firebase'
import { defaultStyle } from 'substyle'
import wizardQuestions from './wizardQuestions'

function Wizard({
  currentQuestionId,
  onNextClick,
  onTravelLengthComplete,
  pendingAnswer,
  setPendingAnswer,
  setTravelLength,
  style,
  travelLength,
}) {
  const wizardEnd = !wizardQuestions[currentQuestionId]

  return (
    <div {...style}>
      {!wizardEnd && (
        <div id="question">{`${wizardQuestions[currentQuestionId].question}`}</div>
      )}
      {!wizardEnd &&
        (wizardQuestions[currentQuestionId].specialQuestion ? (
          <input
            type="number"
            onChange={({ target }) => {
              setTravelLength(target.value)
              setPendingAnswer('unLockNextButton')
            }}
          />
        ) : (
          wizardQuestions[currentQuestionId].answers.map((answer, key) => (
            <div key={key} {...style('answer')}>
              {
                <input
                  key={answer.id}
                  type="radio"
                  name="answer"
                  value={answer.id}
                  onClick={() => setPendingAnswer(answer.id)}
                />
              }
              <div>{answer.option}</div>
            </div>
          ))
        ))}
      {!wizardEnd && (
        <button
          id="next"
          onClick={() => {
            if (wizardQuestions[currentQuestionId].specialQuestion) {
              onTravelLengthComplete(travelLength)
            }
            onNextClick()
          }}
          type="text"
          disabled={
            travelLength === undefined ||
            (travelLength !== undefined && isNil(pendingAnswer))
          }
        >
          Next
        </button>
      )}
    </div>
  )
}

const styled = defaultStyle(() => ({
  width: 400,
  backgroundColor: 'lightblue',
  margin: 'auto',

  answer: {
    display: 'flex',
  },
}))

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
  }),
  styled
)(Wizard)

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
    if (category.includePackageIds) {
      category.includePackageIds.forEach(includePackageId =>
        implicitCategories.push(includePackageId)
      )
    }
  })

  return [...packageIds, ...implicitCategories]
}
