const {Contact} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let Contacts = await Contact.findAll()
      res.send(Contacts)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the Contacts'
      })
    }
  },
  async post (req, res) {
    try {
      const contact = await Contact.create(req.body)
      console.log(req.body)
      res.send(contact)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the Contact'
      })
    }
  },
  async update (req, res) {
    try {
      console.log(req.body);
      await Contact.update(req.body, {
        where: {
          id: req.params.contactId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the Contact'
      })
    }
  },
  async delete (req, res) {
    try {
      const id = req.params.contactId
      console.log(id);
      const contact = await Contact.findById(id)
      contact.destroy()
      
      
      res.send(contact)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the Contact'
      })
    }
  }
}