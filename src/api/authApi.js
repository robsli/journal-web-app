const endpoint = process.env.NODE_ENV === 'production' ? 'https://my-journal-app.herokuapp.com/' : 'http://localhost:3001/'

const AuthApi = {
  login: (credentials) => {
    return fetch(`${endpoint}login`, {
        body: JSON.stringify(credentials),
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          return response
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  logout: () => {
    return fetch(`${endpoint}logout`, {
      credentials: 'include',
      method: 'POST'
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Successfully logged out.')
      }
      return response
    })
    .catch((error) => {
      console.error(error)
    })
  }
}

export default AuthApi
