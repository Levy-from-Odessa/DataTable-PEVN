import Api from './Api'

export default {
    contacts () {
      return Api().get('contacts')
    },
    addContact (creditals) {
      return Api().post('addContact', creditals)
    },
    delContact ({itemId}) {
      return Api().delete(`delContact/${itemId}`)
    },
    updateContact ({id , payload}) {
      return Api().post(`updateContact/${id}`, payload)
    },
    
}