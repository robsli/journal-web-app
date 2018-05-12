import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

import SearchBar from './SearchBar'

describe('SearchBar', () => {

  it('renders the default view correctly', () => {
    // Act
    const searchBar = renderer
      .create(<SearchBar searchQuery="" />)
      .toJSON()

    //Assert
    expect(searchBar).toMatchSnapshot()
  })

  it('renders the the user input correctly and displays clear input icon', () => {
    // Arrange
    const searchQuery = 'test'

    // Act
    const searchBar = renderer
      .create(<SearchBar searchQuery={searchQuery} />)
      .toJSON()
    
    // Assert
    expect(searchBar).toMatchSnapshot()
  })

  it('correctly calls the function to clear the search input field when the clear input icon is clicked', () => {
    // Arrange
    const searchQuery = 'test'
    const handleClearSearch = jest.fn()
    const wrapper = shallow(
      <SearchBar
        handleClearSearch={handleClearSearch}
        searchQuery={searchQuery}
      />
    )
    expect(handleClearSearch).not.toBeCalled()

    // Act
    wrapper.find('i').simulate('click')

    // Assert
    expect(handleClearSearch).toBeCalled()

  })

  it('clear input field icon disappears when searchQuery prop is cleared', () => {
    // Arrange
    const searchQuery = 'test'
    const wrapper = shallow(
      <SearchBar
        searchQuery={searchQuery}
      />
    )
    expect(wrapper.find('input').props().value).toEqual(searchQuery)

    // Act
    wrapper.setProps({ searchQuery: '' })
    const rendered = renderer.create(wrapper)

    // Assert
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
