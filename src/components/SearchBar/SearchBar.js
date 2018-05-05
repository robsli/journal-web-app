import React from 'react';
import './SearchBar.css';

function SearchBar(props) {

  const handleCloseClick = (event) => {
    document.getElementsByName('searchItem')[0].value = '';
    event.target.classList.remove('clear-search');
    props.handleSearch(event);
  }
  
  return (
    <div className='search-container'>
      <input 
        type='text' 
        name='searchItem' 
        value={props.searchItem} 
        onChange={props.handleSearch}
        onKeyDown={props.handleSearch}
        placeholder='Enter search item here' />
      <i name='clearSearch' className='fa fa-times' aria-hidden='true' onClick={handleCloseClick}></i>
    </div>
  );
}

export default SearchBar;
