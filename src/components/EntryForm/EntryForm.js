import React from 'react';
import './EntryForm.css';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: this.props.selectedEntry
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.isoDateformat = this.isoDateFormat.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEntry._id !== this.state.entry._id) {
      this.setState({ entry: nextProps.selectedEntry });
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      entry: Object.assign({}, prevState.entry, { [name]:value })
    }));
  }

  handleFocus(event) {
    const label = document.getElementsByName(`${event.target.name}-label`)
    if (label.length) {
      label[0].classList.toggle('in-focus');
    }
    if (event.target.name === 'date') {
      event.target.type = event.target.type === 'text' ? 'date' : 'text';
    }
  }

  isoDateFormat(date) {
    const isoDate = (new Date(date)).toISOString();
    const formattedDate = isoDate.split('T')[0];
  
    return formattedDate;
  }

  render() {
    return (
      <div className='form-component'>
        <div className='form-container'>
          <h2>{ this.state.entry._id.length ? 'Update Journal Entry' : 'Add Journal Entry'}</h2>
          <div className='input-group'>
            <label name='date-label'>Date</label>
            <input
              disabled={ this.state.entry._id.length ? true : false }
              name='createdDate'
              onBlur={ this.handleFocus }
              onChange={ this.handleChange }
              onFocus={ this.handleFocus }
              placeholder={ this.isoDateFormat(this.state.entry.createdDate) }
              type='date'
              value={ this.isoDateFormat(this.state.entry.createdDate) } />
          </div>

          <div className='input-group'>
            <label name='name-label'>Name</label>
            <input 
              name='name'
              onBlur={ this.handleFocus }
              onChange={ this.handleChange }
              onFocus={ this.handleFocus }
              placeholder='Name'
              type='text'
              value={ this.state.entry.name } />
          </div>

          <label>Notes</label>
          <textarea
            name='notes'
            onChange={ this.handleChange }
            value={ this.state.entry.notes } />

          <button onClick={ () => this.props.handleSave(this.state.entry) }>Save</button>
        </div>
      </div>
    )
  }
}
// function EntryForm({
//   currentEntry,
//   handleChange,
//   handleSave
// }) {  

//   function handleFocus(event) {
//     const label = document.getElementsByName(`${event.target.name}-label`)
//     if (label.length) {
//       label[0].classList.toggle('in-focus');
//     }
//     if (event.target.name === 'date') {
//       event.target.type = event.target.type === 'text' ? 'date' : 'text';
//     }
//   }

//   function isoDateFormat(date) {
//     const isoDate = (new Date(date)).toISOString();
//     const formattedDate = isoDate.split('T')[0];
  
//     return formattedDate;
//   }

//   return (
//     <div className='form-component'>
//       <div className='form-container'>
//         <h2>{ currentEntry._id ? 'Update Journal Entry' : 'Add Journal Entry'}</h2>
//         <div className='input-group'>
//           <label name='date-label'>Date</label>
//           <input
//             disabled={ currentEntry._id ? true : false }
//             name='createdDate'
//             onBlur={ handleFocus }
//             onChange={ handleChange }
//             onFocus={ handleFocus }
//             placeholder={ isoDateFormat(currentEntry.createdDate) }
//             type='date'
//             value={ isoDateFormat(currentEntry.createdDate) } />
//         </div>

//         <div className='input-group'>
//           <label name='name-label'>Name</label>
//           <input 
//             name='name'
//             onBlur={ handleFocus }
//             onChange={ handleChange }
//             onFocus={ handleFocus }
//             placeholder='Name'
//             type='text'
//             value={ currentEntry.name } />
//         </div>

//         <label>Notes</label>
//         <textarea
//           name='notes'
//           onChange={ handleChange }
//           value={ currentEntry.notes } />

//         <button onClick={ handleSave }>Save</button>
//       </div>
//     </div>
//   );
// }

export default EntryForm;
