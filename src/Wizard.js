import React, { useState } from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { duration, transition } from './transitions'
import { flatten, isNil, values } from 'lodash'

import { Transition } from 'react-transition-group'
import WizardQuestion from './WizardQuestion'
import { button } from './theme'
import { color } from './theme'
import { database } from './firebase'
import { defaultStyle } from 'substyle'
import wizardQuestions from './wizardQuestions'

function Wizard({
  currentQuestionId,
  onNextClick,
  pendingAnswer,
  setPendingAnswer,
  setTravelLength,
  style,
  travelLength,
}) {
  const wizardEnd = !wizardQuestions[currentQuestionId]
  const [inProp, setInProp] = useState(false)

  if (wizardEnd) {
    return <div />
  }

  setTimeout(() => setInProp(true), duration)

  return (
    <Transition in={inProp} duration={duration}>
      {state => {
        return (
          <div
            style={{
              ...defaultStyles,
              ...transitionStyles[state],
              ...style,
            }}
          >
            <WizardQuestion
              currentQuestion={wizardQuestions[currentQuestionId].question}
            />
            {wizardQuestions[currentQuestionId].id ===
            'travelLengthQuestion' ? (
              <input
                {...style('numberInput')}
                type="number"
                placeholder="Gib eine Zahl ein"
                onChange={({ target }) => {
                  setTravelLength(target.value)
                  setPendingAnswer('unLockNextButton')
                }}
              />
            ) : (
              <div {...style('answersContainer')}>
                {wizardQuestions[currentQuestionId].answers.map(
                  (answer, key) => (
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
                  )
                )}
              </div>
            )}
            {
              <button
                {...style('nextButton')}
                id="next"
                onClick={() => {
                  onNextClick()
                }}
                type="text"
                disabled={
                  travelLength === undefined ||
                  (travelLength !== undefined && isNil(pendingAnswer))
                }
              >
                Weiter
              </button>
            }
          </div>
        )
      }}
    </Transition>
  )
}
const defaultStyles = {
  backgroundColor: 'white',
  border: 'none',
  borderRadius: button.borderRadius,
  opacity: 0,
  padding: 10,
  textAlign: 'center',
  transition,
}

const transitionStyles = {
  entered: { opacity: 0.6 },
}

const styled = defaultStyle(() => ({
  answer: {
    display: 'flex',
  },

  answersContainer: {
    width: '80%',
    margin: '0 auto',
  },

  nextButton: {
    backgroundColor: color.primary,
    border: 'none',
    borderRadius: button.borderRadius,
    color: 'white',
    height: button.height,
    marginTop: 10,
  },

  numberInput: {
    backgroundColor: color.secondary,
    border: 'none',
    display: 'block',
    height: 20,
    margin: 'auto',
    paddingLeft: button.padding,
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
