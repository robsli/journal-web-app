import React from 'react'
import './SearchBar.css'

function SearchBar({
  handleSearchField,
  handleClearSearch,
  searchQuery
}) {
  return (
    <div className='search-container'>
      <input 
        type='text' 
        name='searchQuery' 
        value={ searchQuery } 
        onChange={ handleSearchField }
        placeholder='Enter search item here'
        size='10' />
      { searchQuery.length > 0 &&
        <i name='clearSearch' className='fa fa-times' aria-hidden='true' onClick={ handleClearSearch }></i>
      }
    </div>
  )
}

export default SearchBar
