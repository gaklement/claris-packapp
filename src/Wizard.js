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
  const currentQuestion = wizardQuestions[currentQuestionId]
  return (
    <div>
      <WizardQuestion currentQuestion={currentQuestion.question} />
      <WizardAnswers
        currentQuestionId={currentQuestion.id}
        currentQuestionAnswers={currentQuestion.answers}
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
