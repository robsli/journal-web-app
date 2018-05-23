import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Modal from 'react-modal'
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
      entryFormHidden: true,
      isAuthenticated: false,
      isLoading: true,
      journalEntries: [
        { _id: 1, name: 'Entry 1', createdDate: new Date('2018-01-01'), notes: 'Entry 1 notes' },
        { _id: 2, name: 'Entry 2', createdDate: new Date('2018-02-02'), notes: 'Entry 2 notes' },
        { _id: 3, name: 'New entry', createDate: new Date('2018-03-03'), notes: 'This is a new entry.'}
      ],
      modalIsOpen: false,
      password: '',
      searchQuery: '',
      selectedEntryId: '',
      username: ''
    }
    journalPage = shallow(<JournalPage />)
    Modal.setAppElement(journalPage)
  })

  it('closes the modal when closeModal() is called', () => {
    // Arrange
    initialState.modalIsOpen = true
    journalPage.setState(initialState)

    // Act
    journalPage.instance().closeModal()
    
    // Assert
    expect(journalPage.state().modalIsOpen).toEqual(false)
  })

  it('calls the EntriesApi correctly on load and accurately updates the state', () => {
    // Arrange
    journalPage.setState(initialState)

    // Act
    journalPage.instance().componentDidMount()

    // Assert
    expect(journalPage.state()).toEqual(initialState)
  })

  it('opens the add entry form when user clicks the "+" button', () => {
    // Arrange
    journalPage.setState(initialState)
    expect(journalPage.state().entryFormHidden).toBe(true)

    // Act
    const addIcon = journalPage.find('.fa-times')
    addIcon.simulate('click')
    const rendered = renderer.create(journalPage)

    // Assert
    expect(journalPage.state().entryFormHidden).toBe(false)
    expect(rendered.toJSON()).toMatchSnapshot()

  })

  it('clears the selected entry details when user closes entry form', () => {
    // Arrange
    initialState.entryFormHidden = false
    initialState.selectedEntryId = 'test1234'
    journalPage.setState(initialState)
    
    // Act
    const closeIcon = journalPage.find('.fa-times')
    closeIcon.simulate('click')
    const rendered = renderer.create(journalPage)

    // Assert
    expect(journalPage.state().selectedEntryId).toBe('')
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

  it('opens entry form modal and passes correct information to EntryForm component when handleUpdate is called', () => {
    // Arrange
    journalPage.setState(initialState)

    // Act
    journalPage.instance().handleUpdate(2)
    journalPage.update()
    const rendered = renderer.create(journalPage)

    // Assert
    expect(journalPage.state().selectedEntryId).toBe(2)
    expect(journalPage.state().entryFormHidden).toBe(false)
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
