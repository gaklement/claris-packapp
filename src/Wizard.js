import { compose, withHandlers, withState } from 'recompose'

import React from 'react'
import { defaultStyle } from 'substyle'
import wizardQuestions from './wizardQuestions'

function Wizard({ onClick, style, wizardActive }) {
  return (
    <div {...style()}>
      <button onClick={onClick}>Wizard</button>
      {wizardActive && (
        <div {...style('container')}>
          {wizardQuestions.map((wizardQuestion, questionKey) => (
            <div key={questionKey}>
              <div>{wizardQuestion.question}</div>
              {wizardQuestion.answers.map((answer, answerKey) => (
                <div key={answerKey}>{answer}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styled = defaultStyle(() => ({
  container: {
    width: 400,
    backgroundColor: 'lightblue',
    margin: 'auto',
  },
}))

export default compose(
  withState('wizardActive', 'setWizardActive', false),
  withHandlers({
    onClick: ({ setWizardActive }) => () => {
      setWizardActive(true)
    },
  }),
  styled
)(Wizard)
