import React from 'react'
import './SearchBar.css'

function SearchBar({
  handleChange,
  handleClearSearch,
  searchQuery
}) {
  return (
    <div className='search-container'>
      <input 
        type='text' 
        name='searchQuery' 
        value={ searchQuery } 
        onChange={ handleChange }
        placeholder='Search for an entry here...' />
      { searchQuery.length > 0 &&
        <i name='clearSearch' className='fa fa-times' aria-hidden='true' onClick={ handleClearSearch }></i>
      }
    </div>
  )
}

export default SearchBar
