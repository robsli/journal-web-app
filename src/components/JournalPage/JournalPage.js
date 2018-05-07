import React from 'react';
import EntriesApi from '../../api/entriesApi';
import Header from '../Common/Header';
import EntryForm from '../EntryForm/EntryForm';
import JournalEntries from '../JournalEntries/JournalEntries';
import SearchBar from '../SearchBar/SearchBar';
import './JournalPage.css';
import formatDate from '../Common/FormatDate';

class JournalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEntry: emptyEntry,
      journalEntries: [],
      searchInitiatied: false,
      searchItem: '',
      searchResults: [],
      showForm: false,
      viewEntries: false
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.saveEntry = this.saveEntry.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {
    EntriesApi.getAllEntries()
      .then((response) => {
        this.setState({ journalEntries: response });
      })
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    
    if (name === 'searchItem') {
      this.setState(prevState => ({
        [name]: value
      }));
    } else {
      this.setState(prevState => ({
        currentEntry: Object.assign({}, prevState.currentEntry, {[name]:value})
      }));
    }
  }

  handleDelete(entryId, event) {
    EntriesApi.deleteEntry(entryId)
      .then((response) => {
        EntriesApi.getAllEntries()
          .then((response) => {
            this.setState((prevState) => ({ journalEntries: response }));
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  handleSearch(event) {
    if (event.type === 'keydown' && event.keyCode === 13) {
      if (this.state.searchItem === '') {
        this.setState(prevState => ({
          searchInitiated: false,
          searchResults: []
        }));
        // console.log('You didn\'t enter anything into the search field. Can\'t search for nothing!');
      } else {
        const searchResults = Object.assign([], this.state.journalEntries).filter(entry => {
          return (entry.name.toLowerCase().includes(this.state.searchItem.toLowerCase()) || 
                  entry.notes.toLowerCase().includes(this.state.searchItem.toLowerCase()))
        })
        this.setState(prevState => ({
          searchInitiated: true,
          searchResults: searchResults
        }));
      }
    } else if (event.target.className === 'fa fa-times') {
      this.setState(prevState => ({
        searchItem: '',
        searchInitiated: false,
        searchResults: []
      }));
    } else if (event.type === 'change') {
      const name = event.target.name;
      const value = event.target.value;

      if (value !== '') {
        document.getElementsByName('clearSearch')[0].classList.add('clear-search');
      } else {
        document.getElementsByName('clearSearch')[0].classList.remove('clear-search');
      }
  
      this.setState(prevState => ({
        [name]: value
      }));
    }
  }

  handleUpdate(entryId, event) {
    const selectedEntry = Object.assign({}, this.state.journalEntries.filter(entry => {
      return entry._id === entryId;
    }))[0];
    this.setState(prevState => ({
      currentEntry: selectedEntry
    }));
    this.toggleView({target: {id: 'showForm'}});
  }
  
  saveEntry() {
    let entry = Object.assign({}, this.state.currentEntry);
    
    if (entry._id === undefined || entry._id === null) {
      EntriesApi.addEntry(entry)
        .then((response) => {
          EntriesApi.getAllEntries()
            .then((response) => {
              this.setState((prevState) => ({ currentEntry: emptyEntry, journalEntries: response }));
            })
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      entry.lastModified = new Date();
      EntriesApi.updateEntry(entry)
      .then((response) => {
        EntriesApi.getAllEntries()
          .then((response) => {
            this.setState((prevState) => ({ currentEntry: emptyEntry, journalEntries: response }));
          })
      })
      .catch((err) => {
        console.log(err);
      });
    }
    this.toggleView({target: {id: 'showForm'}});
  }

  toggleView(event) {
    const name = event.target.name || event.target.id;
    this.setState(prevState => ({
      [name]: !prevState[name]
    }))
    if (this.state.showForm) {
      this.setState(prevState => ({
        currentEntry: emptyEntry
      }));
    };
    if (name === 'showForm') {
      document.getElementsByClassName('form-component')[0].classList.toggle('open');
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <Header />
        <div className='journal-app'>
          <SearchBar
              handleChange = { this.handleSearch }
              handleSearch = { this.handleSearch }
              searchItem = { this.state.searchItem } />
          <div className='body'>
            <JournalEntries
              formatDate = { formatDate }
              handleDelete = { this.handleDelete }
              handleUpdate = { this.handleUpdate }
              journalEntries = { this.state.searchInitiated ? this.state.searchResults : this.state.journalEntries }
              viewEntries = { this.state.viewEntries } />
            <EntryForm
              currentEntry = { this.state.currentEntry }
              formatDate = { formatDate }
              handleChange = { this.handleChange }
              saveEntry = { this.saveEntry }
              showForm = { this.state.showForm }
              toggleView = { this.toggleView } />
          </div>
        </div>
      </div>
    );
  }
}

const emptyEntry = {
  createdDate: new Date(),
  name: '',
  notes: ''
}

export default JournalPage;
