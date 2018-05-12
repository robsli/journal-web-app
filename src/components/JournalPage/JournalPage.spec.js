import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import renderer from 'react-test-renderer'

import EntriesApi from '../../api/entriesApi'
import JournalPage from './JournalPage'

configure({ adapter: new Adapter() })

jest.mock('../../api/entriesApi')

describe('<JournalPage /> component', () => {
  let initialState
  let journalPage

  beforeEach(() => {
    initialState = {
      formHidden: true,
      journalEntries: [
        { _id: 1, name: 'Entry 1', createdDate: new Date('2018-01-01'), notes: 'Entry 1 notes' },
        { _id: 2, name: 'Entry 2', createdDate: new Date('2018-02-02'), notes: 'Entry 2 notes' }
      ],
      searchQuery: '',
      selectedEntryId: ''
    }
    journalPage = shallow(<JournalPage />)
  })

  it('calls the EntriesApi correctly on load and accurately updates the state', async () => {
    // Arrange
    journalPage.setState(initialState)

    // Act
    await journalPage.instance().componentDidMount()
    journalPage.update()

    // Assert
    expect(journalPage.state()).toEqual({
      formHidden: true,
      journalEntries: [
        { _id: 1, name: 'Entry 1', createdDate: new Date('2018-01-01'), notes: 'Entry 1 notes' },
        { _id: 2, name: 'Entry 2', createdDate: new Date('2018-02-02'), notes: 'Entry 2 notes' }
      ],
      searchQuery: '',
      selectedEntryId: ''
    })
  })

  it('opens the add entry form when user clicks the "+" button', () => {
    // Arrange
    journalPage.setState(initialState)
    expect(journalPage.state().formHidden).toBe(true)

    // Act
    const addIcon = journalPage.find('.fa-times')
    addIcon.simulate('click')
    const rendered = renderer.create(journalPage)

    // Assert
    expect(journalPage.state().formHidden).toBe(false)
    expect(rendered.toJSON()).toMatchSnapshot()

  })

  it('correctly clears the searchQuery when handleClearSearch is called', () => {
    // Arrange
    initialState.searchQuery = 'test'
    journalPage.setState(initialState)

    // Act
    journalPage.instance().handleClearSearch()

    // Assert
    expect(journalPage.state().searchQuery).toBe('')
  })

  it('opens entry form and passes correct information to EntryForm component when handleUpdate is called', () => {
    // Arrange
    journalPage.setState(initialState)

    // Act
    journalPage.instance().handleUpdate(2)
    journalPage.update()
    const rendered = renderer.create(journalPage)

    // Assert
    expect(journalPage.state().selectedEntryId).toBe(2)
    expect(journalPage.state().formHidden).toBe(false)
    expect(rendered.toJSON()).toMatchSnapshot()
  })

  it('deletes the correct entry when handleDelete is called', () => {
    // TODO: this test does not actually work due to how the function is implemented.
    //       It calls EntriesApi.getAllEntries(), which then refreshes to the original mock data state
    
    // Arrange
    journalPage.setState(initialState)

    // Act
    journalPage.instance().handleDelete(2)
    journalPage.update()
    const rendered = renderer.create(journalPage)

    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
