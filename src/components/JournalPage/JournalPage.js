import React from 'react'
// import { CSSTransitionGroup } from 'react-transition-group'
import EntriesApi from '../../api/entriesApi'
import Header from '../Common/Header'
import formatDate from '../Common/FormatDate'
import EntryForm from '../EntryForm/EntryForm'
import JournalEntries from '../JournalEntries/JournalEntries'
import SearchBar from '../SearchBar/SearchBar'
import './JournalPage.css'

class JournalPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formHidden: true,
      journalEntries: [],
      searchQuery: '',
      selectedEntryId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClearSearch = this.handleClearSearch.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.toggleFormState = this.toggleFormState.bind(this)
  }

  componentDidMount() {
    EntriesApi.getAllEntries()
      .then((response) => {
        this.setState({ journalEntries: response })
      })
  }

  executeSearch() {
    if (this.state.searchQuery.length > 0) {
      const searchResults = Object.assign([], this.state.journalEntries).filter(entry => {
        return (entry.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
          entry.notes.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
          entry.createdDate.toString().toLowerCase().includes(this.state.searchQuery.toLowerCase()))
        })

      return searchResults
     }
  }

  findEntry(entryId) {
    const result = Object.assign([], this.state.journalEntries).filter(entry => {
      return entry._id === entryId
    })
    if (result.length === 0) {
      return {
        _id: '',
        createdDate: new Date(),
        name: '',
        notes: ''
      }
    } else {
      return result[0]
    }
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    
    if (name === 'searchQuery') {
      this.setState(prevState => ({
        searchQuery: value
      }))
    } else {
      this.setState(prevState => ({
        currentEntry: Object.assign({}, prevState.currentEntry, {[name]:value})
      }))
    }
  }

  handleClearSearch(event) {
    this.setState(prevState => ({
      searchQuery: ''
    }))
  }

  handleDelete(entryId, event) {
    EntriesApi.deleteEntry(entryId)
      .then((response) => {
        EntriesApi.getAllEntries()
          .then((response) => {
            this.setState((prevState) => ({ journalEntries: response }))
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  handleSave(entry) {    
    if (entry._id === '') {
      delete entry._id // TODO: find a better way to implement this.
      EntriesApi.addEntry(entry)
        .then((response) => {
          EntriesApi.getAllEntries()
            .then((response) => {
              this.setState((prevState) => ({ selectedEntryId: '', journalEntries: response }))
            })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      entry.lastModified = new Date()
      EntriesApi.updateEntry(entry)
        .then((response) => {
          EntriesApi.getAllEntries()
            .then((response) => {
              this.setState((prevState) => ({ selectedEntryId: '', journalEntries: response }))
            })
        })
      .catch((err) => {
        console.log(err)
      })
    }
    this.toggleFormState()
  }
  
  handleUpdate(entryId, event) {
    this.setState(prevState => ({
      formHidden: false,
      selectedEntryId: entryId
    }))
  }

  toggleFormState() {
    this.setState(prevState => ({
      formHidden: !prevState.formHidden,
      selectedEntryId: !prevState.formHidden ? '' : prevState.selectedEntryId
    }))
  }

  render() {
    return (
      <div className='wrapper'>
        <Header />
        <div className='journal-app'>
          <SearchBar
            handleChange = { this.handleChange }
            handleClearSearch = { this.handleClearSearch }
            searchQuery = { this.state.searchQuery } />
          <div className='body'>
            <JournalEntries
              formatDate = { formatDate }
              handleDelete = { this.handleDelete }
              handleUpdate = { this.handleUpdate }
              journalEntries = { this.state.searchQuery.length > 0 ? this.executeSearch() : this.state.journalEntries } />
            <i className={ this.state.formHidden ? 'fa fa-times' : 'fa fa-times show'} onClick={ this.toggleFormState }></i>
            {/* <CSSTransitionGroup
              transitionName='form'
              transitionEnterTimeout={20000}
              transitionLeaveTimeout={20000}> */}

              { !this.state.formHidden &&
                <EntryForm
                  handleSave = { this.handleSave }
                  selectedEntry = { this.findEntry(this.state.selectedEntryId) } />
              }
            {/* </CSSTransitionGroup> */}
          </div>
        </div>
      </div>
    )
  }
}

export default JournalPage
