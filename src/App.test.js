import { configure, mount } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import React from 'react'

configure({ adapter: new Adapter() })

describe('App', () => {
  let component
  beforeEach(() => {
    component = mount(<App />)
  })
  it('should be possible to change the amount', () => {
    console.log(component)
  })
})
