import React from 'react';
import './EntryForm.css';


function EntryForm({
  currentEntry,
  handleChange,
  saveEntry,
  showForm,
  toggleView
}) {  

  const handleFocus = (event) => {
    const label = document.getElementsByName(`${event.target.name}-label`)
    if (label.length) {
      label[0].classList.toggle('in-focus');
    }
    if (event.target.name === 'date') {
      event.target.type = event.target.type === 'text' ? 'date' : 'text';
    }
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
              name='date'
              onBlur={ handleFocus }
              onChange={ handleChange }
              onFocus={ handleFocus }
              placeholder={ currentEntry.date }
              type='text'
              value={ currentEntry.date } />
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

          <button onClick={ saveEntry }>Save</button>
        </div>
      }
    </div>
  );
}

export default EntryForm;
