import React, { useState } from 'react'
import { duration, transition } from './transitions'

import NextButton from './NextButton'
import { Transition } from 'react-transition-group'
import WizardAnswers from './WizardAnswers'
import WizardQuestion from './WizardQuestion'
import { button } from './theme'

function Wizard({
  currentQuestionId,
  onNextClick,
  pendingAnswer,
  setPendingAnswer,
  setTravelLength,
  travelLength,
  wizardQuestions,
}) {
  const [inProp, setInProp] = useState(true)

  const currentQuestion = wizardQuestions[currentQuestionId]
  return (
    <Transition in={inProp} timeout={duration}>
      {state => {
        return (
          <div
            style={{
              ...defaultStyles,
              ...transitionStyles[state],
            }}
          >
            <WizardQuestion currentQuestion={currentQuestion.question} />
            <WizardAnswers
              currentQuestionId={currentQuestion.id}
              currentQuestionAnswers={currentQuestion.answers}
              setPendingAnswer={setPendingAnswer}
              setTravelLength={setTravelLength}
            />
            <NextButton
              onNextClick={() => {
                setInProp(false)
                setTimeout(() => {
                  setInProp(true)
                  onNextClick()
                }, duration)
              }}
              pendingAnswer={pendingAnswer}
              travelLength={travelLength}
            />
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
  exited: { opacity: 0 },
}

export default Wizard
