import React from 'react'
import Modal from 'react-modal'
import AuthApi from '../../api/authApi'
import EntriesApi from '../../api/entriesApi'
import Header from '../Common/Header'
import formatDate from '../Common/FormatDate'
import EntryForm from '../EntryForm/EntryForm'
import JournalEntries from '../JournalEntries/JournalEntries'
import SearchBar from '../SearchBar/SearchBar'
import './JournalPage.css'

Modal.setAppElement('#root')
class JournalPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entryFormHidden: true,
      isAuthenticated: false,
      journalEntries: [],
      modalIsOpen: false,
      password: '',
      searchQuery: '',
      selectedEntryId: '',
      username: ''
    }
    this.closeModal = this.closeModal.bind(this)
    this.getEntries = this.getEntries.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClearSearch = this.handleClearSearch.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.openModal = this.openModal.bind(this)
    this.toggleFormState = this.toggleFormState.bind(this)
  }

  componentDidMount() {
    EntriesApi.getEntries()
      .then((response) => {
        this.setState({
          isAuthenticated: document.cookie,
          journalEntries: response })
      })
  }

  closeModal() {
    this.setState(prevState => ({ modalIsOpen: false }))
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

  getEntries() {
    EntriesApi.getEntries()
    .then((response) => {
      this.setState((prevState) => ({ journalEntries: response }))
    })
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
        [name]: value
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
        this.getEntries()
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
          this.getEntries()
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      entry.lastModified = new Date()
      EntriesApi.updateEntry(entry)
        .then((response) => {
          this.getEntries()
        })
      .catch((err) => {
        console.log(err)
      })
    }
    this.toggleFormState()
  }
  
  handleUpdate(entryId, event) {
    this.setState(prevState => ({
      entryFormHidden: false,
      selectedEntryId: entryId
    }))
  }

  login(username, password) {
    const credentials = { username, password }
    AuthApi.login(credentials)
      .then((response) => {
        if (response.username) {
          console.log('Login successful!')
          this.setState(prevState => ({
            isAuthenticated: true,
            modalIsOpen: false,
            username: response.username
          }))
          this.getEntries()
        } else {
          console.log('Login unsuccessful')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  logout() {
    AuthApi.logout()
      .then((response) => {
        this.setState(prevState => ({
          isAuthenticated: false
        }))
        this.getEntries()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  openModal() {
    this.setState(prevState => ({ modalIsOpen: true }))
  }

  toggleFormState() {
    this.setState(prevState => ({
      entryFormHidden: !prevState.entryFormHidden,
      selectedEntryId: !prevState.entryFormHidden ? '' : prevState.selectedEntryId
    }))
  }

  render() {
    return (
      <div className='wrapper'>
        <Header 
          handleChange={ this.handleChange }
          isAuthenticated={ this.state.isAuthenticated }
          logout={ this.logout }
          openModal={ this.openModal }
          username={ this.state.username }
        />
        <div className='journal-app'>
          <SearchBar
            handleChange={ this.handleChange }
            handleClearSearch={ this.handleClearSearch }
            searchQuery={ this.state.searchQuery }
          />
          <div className='body'>
            <JournalEntries
              formatDate={ formatDate }
              handleDelete={ this.handleDelete }
              handleUpdate={ this.handleUpdate }
              journalEntries={ this.state.searchQuery.length > 0 ? this.executeSearch() : this.state.journalEntries }
            />
            <i className={ this.state.entryFormHidden ? 'fa fa-times' : 'fa fa-times show'} onClick={ this.toggleFormState }></i>
            { !this.state.entryFormHidden &&
              <EntryForm
                handleSave = { this.handleSave }
                selectedEntry = { this.findEntry(this.state.selectedEntryId) }
              />
            }
            <Modal 
              className='user-modal'
              contentLabel='User Modal'
              isOpen={ this.state.modalIsOpen }
              onRequestClose= {this.closeModal }
              overlayClassName='modal-overlay'
            >
              <h1>Welcome Back!</h1>
              <div className='input-group'>
                <i className='fa fa-user'></i>
                <input
                  onChange={ this.handleChange }
                  name='username'
                  placeholder='Username'
                  type='text'
                />
              </div>
              <div className='input-group'>
                <i className='fa fa-lock'></i>
                <input
                  onChange={ this.handleChange }
                  name='password'
                  placeholder='Password'
                  type='password'
                />
              </div>
              <div className='modal-actions'>
                <button className='cancel' onClick={ () => this.closeModal() }>Cancel</button>
                <button className='login' onClick={ () => this.login(this.state.username, this.state.password) }>Log In</button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default JournalPage
