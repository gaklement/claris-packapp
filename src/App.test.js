import App from './App'
import React from 'react'
import Wizard from './Wizard'
import { mount } from 'enzyme'

describe('App', () => {
  const findItemField = () =>
    component.find('input').filter({ type: 'text', id: 'adHocName' })

  let component
  beforeEach(() => {
    component = mount(<App />)
  })

  it('should be possible to enter an item name', () => {
    findItemField().prop('onChange')({ target: { value: 'Unterbuchsen' } })

    component.update()

    expect(findItemField().prop('value')).toBe('Unterbuchsen')
  })

  it('should be possible to add an item to the list', () => {
    findItemField().prop('onChange')({ target: { value: 'T-Shirts' } })

    component
      .find('button')
      .filter({ type: 'submit' })
      .prop('onClick')()

    expect(
      component
        .find('div')
        .filter({ id: 'items' })
        .text()
    ).toContain('T-Shirts')
  })

  it('should start the wizard when the button is clicked', () => {
    component
      .find('button')
      .filter({ id: 'wizard' })
      .prop('onClick')()

    component.update()
    expect(component.find(Wizard)).toExist()
  })
})
