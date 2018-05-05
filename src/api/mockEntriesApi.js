const sampleEntries = [
  {id: 1, dish: 'Dish 1', date: new Date().toDateString(), notes: ''},
  {id: 2, dish: 'Dish 2', date: new Date().toDateString(), notes: ''},
  {id: 3, dish: 'Dish 3', date: new Date().toDateString(), notes: ''},
  {id: 4, dish: 'Dish 4', date: new Date().toDateString(), notes: ''}
]

let storage;
if (typeof(localStorage) !== 'undefined') {
  try {
    localStorage.setItem('testFeature', 'yes');
    if(localStorage.getItem('testFeature') === 'yes') {
      localStorage.removeItem('testFeature');
      storage = localStorage;
    } else {
      storage = localStorage;
    }
  } catch(e) {
    storage = sampleEntries;
    console.log('Local storage is disabled: ' + e);
  }
  if (storage.getItem('entries') == null) {
    storage.setItem('entries', '[]');
  }
} else {
  storage = sampleEntries;
}

class EntryApi {
  static getAllEntries() {
    return new Promise((resolve, reject) => {
      resolve(Object.assign([], JSON.parse(storage.getItem('entries'))))
    })
  }

  static saveEntry(entry) {
    entry = Object.assign({}, entry);
    return new Promise((resolve, reject) => {
      let entries = JSON.parse(storage.getItem('entries'));

      entries.push(entry);
      storage.setItem('entries', JSON.stringify(entries));
      resolve(entry);
    })
  }
}

export default EntryApi;
