import React from 'react';
import './EntryForm.css';

function EntryForm({
  currentEntry,
  handleChange,
  handleSave,
  showForm,
  toggleView
}) {  

  function handleFocus(event) {
    const label = document.getElementsByName(`${event.target.name}-label`)
    if (label.length) {
      label[0].classList.toggle('in-focus');
    }
    if (event.target.name === 'date') {
      event.target.type = event.target.type === 'text' ? 'date' : 'text';
    }
  }

  function isoDateFormat(date) {
    const isoDate = (new Date(date)).toISOString();
    const formattedDate = isoDate.split('T')[0];
    return formattedDate;
  }

  return (
    <div className='form-component'>
      <i id='showForm' className={showForm ? 'fa fa-times' : 'fa fa-times show'} onClick={toggleView}></i>
      {showForm &&
        <div className='form-container'>
          <h2>{ currentEntry._id ? 'Update Journal Entry' : 'Add Journal Entry'}</h2>
          <div className='input-group'>
            <label name='date-label'>Date</label>
            <input
              disabled={ currentEntry._id ? true : false }
              name='createdDate'
              onBlur={ handleFocus }
              onChange={ handleChange }
              onFocus={ handleFocus }
              placeholder={ isoDateFormat(currentEntry.createdDate) }
              type='date'
              value={ isoDateFormat(currentEntry.createdDate) } />
          </div>

          <div className='input-group'>
            <label name='name-label'>Name</label>
            <input 
              name='name'
              onBlur={ handleFocus }
              onChange={ handleChange }
              onFocus={ handleFocus }
              placeholder='Name'
              type='text'
              value={ currentEntry.name } />
          </div>

          <label>Notes</label>
          <textarea
            name='notes'
            onChange={ handleChange }
            value={ currentEntry.notes } />

          <button onClick={ handleSave }>Save</button>
        </div>
      }
    </div>
  );
}

export default EntryForm;
