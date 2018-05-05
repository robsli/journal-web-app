import React from 'react';
import './JournalEntries.css';

function JournalEntries(
  {
    formatDate,
    handleDelete,
    handleUpdate,
    journalEntries,
    viewEntries,
    toggleView
  }) {

  const entries = journalEntries.map(entry => {
    return (
      <div className='entry-card' key={ entry._id }>
        <div className='entry-card-heading'>
          <span className='entry-name'>{ entry.name }</span>
          <span className='entry-date'>{ formatDate(new Date(entry.date)) }</span>
          <span className='entry-update' onClick={ (e) => handleUpdate(entry._id, e) }>update</span>
          <span className='entry-delete' onClick={ (e) => handleDelete(entry._id, e) }>delete</span>
        </div>
        <span className='entry-notes'>{entry.notes}</span>
      </div>
    )
  })
  
  return (
    <div className='entry-list-component'>
      <h2>Journal Entries</h2>
      <div className='entry-cards'>
        { entries }
      </div>
    </div>
  );
}

export default JournalEntries;
