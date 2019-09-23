import React from 'react'
import { defaultStyle } from 'substyle'

function WizardQuestion({ currentQuestion, style }) {
  return (
    <div {...style('question')} id="question">
      {currentQuestion}
    </div>
  )
}

const styled = defaultStyle(() => ({
  question: {
    paddingTop: 5,
    paddingBottom: 10,
  },
}))

export default styled(WizardQuestion)
