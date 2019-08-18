import { configure, mount } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import React from 'react'
import Wizard from './Wizard'

configure({ adapter: new Adapter() })

describe('App', () => {
  const findAmountField = () =>
    component.find('input').filter({
      type: 'number',
    })
  const findItemField = () => component.find('input').filter({ type: 'text' })

  let component
  beforeEach(() => {
    component = mount(<App />)
  })

  it('should show 1 as amount default', () => {
    expect(findAmountField().prop('value')).toBe(1)
  })

  it('should be possible to change the amount', () => {
    findAmountField().prop('onChange')({ target: { value: 4 } })

    component.update()

    expect(findAmountField().prop('value')).toBe(4)
  })

  it('should be possible to enter an item name', () => {
    findItemField().prop('onChange')({ target: { value: 'Unterbuchsen' } })

    component.update()

    expect(findItemField().prop('value')).toBe('Unterbuchsen')
  })

  it('should be possible to add an item to the list', () => {
    findAmountField().prop('onChange')({ target: { value: 8 } })
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
    ).toContain('8 T-Shirts')
  })

  it.only('should start the wizard when the button is clicked', () => {
    component
      .find('button')
      .filter({ id: 'wizard' })
      .prop('onClick')()

    expect(Wizard).toBeTruthy()
  })
})
