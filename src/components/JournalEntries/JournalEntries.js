import React from 'react'
import SortOptions from '../Common/SortOptions'

import './JournalEntries.css'

function JournalEntries(
  {
    entryFormHidden,
    formatDate,
    handleDelete,
    handleUpdate,
    journalEntries,
    sortOrder,
    toggleFormState,
    updateSort
  }) {
  
  function sortEntries(entries) {
    switch (sortOrder) {
      case SortOptions.date.newToOld:
        return entries.sort((curr, next) => {
          return new Date(next.createdDate) - new Date(curr.createdDate)
        })
      case SortOptions.date.oldToNew:
        return entries.sort((curr, next) => {
          return new Date(curr.createdDate) - new Date(next.createdDate)
        })
      case SortOptions.name.aToZ:
        return entries.sort((curr, next) => {
          if (curr.name.toLowerCase() < next.name.toLowerCase()) {
            return -1
          } else if (curr.name.toLowerCase() > next.name.toLowerCase()) {
            return 1
          } else {
            return 0
          }
        })
      case SortOptions.name.zToA:
        return entries.sort((curr, next) => {
          if (curr.name.toLowerCase() > next.name.toLowerCase()) {
            return -1
          } else if (curr.name.toLowerCase() < next.name.toLowerCase()) {
            return 1
          } else {
            return 0
          }
        })
      default:
        return entries.sort((curr, next) => {
          return new Date(next.createdDate) - new Date(curr.createdDate)
        })
    }
  }

  function displayEntries(entries) {
    return entries.map(entry => {
      return (
        <div className='entry-card' key={ entry._id }>
          <div className='entry-card-heading'>
            <span className='entry-name'>{ entry.name }</span>
            <span className='entry-date'>{ formatDate(new Date(entry.createdDate)) }</span>
            <span className='entry-update' onClick={ (e) => handleUpdate(entry._id, e) }>update</span>
            <span className='entry-delete' onClick={ (e) => handleDelete(entry._id, e) }>delete</span>
          </div>
          <span className='entry-notes'>{entry.notes}</span>
        </div>
      )
    })
  }

  return (
    <div className='entry-list-component'>
      <div className='entry-list-header'>
        <i className={ entryFormHidden ? 'fa fa-times' : 'fa fa-times show'} onClick={ toggleFormState }></i>
        <h2>Journal Entries</h2>
        <select className='entry-sort' value={ sortOrder } onChange={ updateSort }>
          <option value={ SortOptions.date.newToOld }>Date: New to Old</option>
          <option value={ SortOptions.date.oldToNew }>Date: Old to New</option>
          <option value={ SortOptions.name.aToZ }>Name: A to Z</option>
          <option value={ SortOptions.name.zToA }>Name: Z to A</option>
        </select>
      </div>
      <div className='entry-cards'>
        { displayEntries(sortEntries(journalEntries)) }
      </div>
    </div>
  )
}

export default JournalEntries
