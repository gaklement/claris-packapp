import NextButton from './NextButton'
import React from 'react'
import WizardAnswers from './WizardAnswers'
import WizardQuestion from './WizardQuestion'
function Wizard({
  currentQuestionId,
  onNextClick,
  pendingAnswer,
  setPendingAnswer,
  setTravelLength,
  travelLength,
  wizardQuestions,
}) {
  return (
    <div>
      <WizardQuestion
        currentQuestion={wizardQuestions[currentQuestionId].question}
      />
      <WizardAnswers
        currentQuestion={wizardQuestions[currentQuestionId]}
        setPendingAnswer={setPendingAnswer}
        setTravelLength={setTravelLength}
      />
      <NextButton
        onNextClick={onNextClick}
        pendingAnswer={pendingAnswer}
        travelLength={travelLength}
      />
    </div>
  )
}

export default Wizard
