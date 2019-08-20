import React from 'react'
import Wizard from './Wizard'
import { mount } from 'enzyme'
import wizardquestions from './wizardQuestions'

describe('Wizard', () => {
  let component

  beforeEach(() => {
    component = mount(<Wizard currentQuestionId={0} />)
  })

  it('should show a question and relevant answers', () => {
    const currentQuestionId = component.prop('currentQuestionId')
    const answerOptions = wizardquestions.find(
      question => question.id === currentQuestionId
    ).answers

    expect(component.find('div').filter({ id: 'question' })).toHaveLength(1)
    expect(component.find('input').filter({ type: 'radio' })).toHaveLength(
      answerOptions.length
    )
  })

  it('should not be possible to click "next" button when no answer was given', () => {
    expect(
      component
        .find('button')
        .filter({ id: 'next' })
        .prop('disabled')
    ).toBe(true)

    component
      .find('input')
      .at(1)
      .prop('onClick')('some answer')

    component.update()

    expect(
      component
        .find('button')
        .filter({ id: 'next' })
        .prop('disabled')
    ).toBe(false)
  })
})
