const endpoint = process.env.NODE_ENV === 'production' ? 'https://my-journal-app.herokuapp.com/' : 'http://localhost:3001/'

const EntriesApi = {
  addEntry: (entry) => {
    return fetch(`${endpoint}entries/addEntry`, {
      body: JSON.stringify(entry),
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      method: 'POST'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  },
  deleteEntry: (entryId) => {
    return fetch(`${endpoint}entries/deleteEntry`, {
      body: JSON.stringify({ _id: entryId }),
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getEntries: () => {
    return fetch(`${endpoint}`, {
      credentials: 'include',
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        console.error(error)
        return []
      })
  },
  updateEntry: (entry) => {
    return fetch(`${endpoint}entries/updateEntry`, {
      body: JSON.stringify(entry),
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      method: 'PUT'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export default EntriesApi
