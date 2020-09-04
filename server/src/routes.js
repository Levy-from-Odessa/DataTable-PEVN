const ContactsController = require('./controllers/ContactsController')

module.exports = (app) => {


  app.get('/contacts',
    ContactsController.index)


  app.post('/addContact',
    ContactsController.post)

  app.delete('/delContact/:contactId',
    ContactsController.delete)


  app.post('/updateContact/:contactId',
    ContactsController.update)


}
