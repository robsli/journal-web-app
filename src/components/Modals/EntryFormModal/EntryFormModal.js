import React from 'react'
import Modal from 'react-modal'
import './EntryFormModal.css'

class EntryFormModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: this.props.selectedEntry,
      modalIsOpen: !props.entryFormHidden
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.isoDateformat = this.isoDateFormat.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEntry._id !== this.state.entry._id ||
        nextProps.entryFormHidden !== this.state.entryFormHidden ) {
      this.setState({
        entry: nextProps.selectedEntry,
        modalIsOpen: !nextProps.entryFormHidden
      })
    }
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    this.setState(prevState => ({
      entry: Object.assign({}, prevState.entry, { [name]:value })
    }))
  }

  handleFocus(event) {
    const label = document.getElementsByName(`${event.target.name}-label`)
    if (label.length) {
      label[0].classList.toggle('in-focus')
    }
  }

  isoDateFormat(date) {
    const isoDate = (new Date(date)).toISOString()
    const formattedDate = isoDate.split('T')[0]
  
    return formattedDate
  }

  render() {
    return (
      <Modal
        className='entry-form-modal'
        contentLabel='Entry Form Modal'
        isOpen={ this.state.modalIsOpen }
        onRequestClose={ this.props.toggleFormState }
        overlayClassName='modal-overlay'
      >
        <h2>{ this.state.entry._id.length ? 'Update Journal Entry' : 'Add Journal Entry'}</h2>
        <div className='title-input-group'>
          <label name='name-label'>Entry Title</label>
          <input 
            name='name'
            onBlur={ this.handleFocus }
            onChange={ this.handleChange }
            onFocus={ this.handleFocus }
            placeholder='Entry Title'
            type='text'
            value={ this.state.entry.name } />
        </div>
        <div className='date-input-group'>
          <label name='date-label'>Date</label>
          <input
            disabled={ this.state.entry._id.length ? true : false }
            name='createdDate'
            onChange={ this.handleChange }
            placeholder={ this.isoDateFormat(this.state.entry.createdDate) }
            type='date'
            value={ this.isoDateFormat(this.state.entry.createdDate) } />
        </div>
        <label>Notes</label>
        <textarea
          name='notes'
          onChange={ this.handleChange }
          value={ this.state.entry.notes } 
        />
        <div className='entry-form-modal-actions'>
          <button className='save' onClick={ () => this.props.handleSave(this.state.entry) }>Save</button>
          <button className='cancel' onClick={ () => this.props.toggleFormState() }>Cancel</button>
        </div>
      </Modal>
    )
  }
}

export default EntryFormModal
