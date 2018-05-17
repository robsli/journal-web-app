const mockData = [
  { _id: 1, name: 'Entry 1', createdDate: new Date('2018-01-01'), notes: 'Entry 1 notes' },
  { _id: 2, name: 'Entry 2', createdDate: new Date('2018-02-02'), notes: 'Entry 2 notes' }
]

const EntriesApi = {
  addEntry: jest.fn((entry) => {
    return new Promise((resolve, reject) => {
      resolve('addEntry')
    })
  }),
  deleteEntry: jest.fn((entryId) => {
    return new Promise((resolve, reject) => {
      const result = mockData.filter(entry => {
        return entry._id !== entryId
      })
      resolve(result)
    })
  }),
  getEntries: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(mockData)
    })
  }),
  updateEntry: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve('updateEntry')
    })
  })
}

export default EntriesApi
