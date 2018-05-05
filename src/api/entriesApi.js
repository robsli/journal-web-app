class EntriesApi {
  static endpoint = 'http://localhost:3001/';

  static addEntry(entry) {
    return fetch(`${this.endpoint}addEntry`, {
      body: JSON.stringify(entry),
      headers: { 'content-type': 'application/json' },
      method: 'POST'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static deleteEntry(entryId) {
    return fetch(`${this.endpoint}deleteEntry`, {
      body: JSON.stringify({ _id: entryId }),
      headers: { 'content-type': 'application/json' },
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static getAllEntries() {
    return fetch(`${this.endpoint}entries`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static updateEntry(entry) {
    return fetch(`${this.endpoint}updateEntry`, {
      body: JSON.stringify(entry),
      headers: { 'content-type': 'application/json' },
      method: 'PUT'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

export default EntriesApi;