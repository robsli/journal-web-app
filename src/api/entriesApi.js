const endpoint = 'https://my-journal-app.herokuapp.com/'

const EntriesApi = {
  addEntry: (entry) => {
    return fetch(`${endpoint}addEntry`, {
      body: JSON.stringify(entry),
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
    return fetch(`${endpoint}deleteEntry`, {
      body: JSON.stringify({ _id: entryId }),
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
  getAllEntries: () => {
    return fetch(`${endpoint}entries`, {
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
    return fetch(`${endpoint}updateEntry`, {
      body: JSON.stringify(entry),
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
