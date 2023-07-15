const fs = require("fs").promises;
const contactsPath = "./db/contacts.json" ;

function listContacts() {
  return fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data.toString());
  });
}
  
function getContactById(contactId) {
  return listContacts().then((contacts) => {
    const foundContact = contacts.find((contact) => contact.id === contactId);
    return foundContact || "Contact not found";
  });
}
  
  function removeContact(contactId) {
    return listContacts().then((list) => {
      const filteredList = list.filter((contact) => contact.id !== contactId);
      return fs
        .writeFile(contactsPath, JSON.stringify(filteredList), (err) => {
          if (err) {
            console.err(err);
          }
        })
        .then(() => `Contact with id ${contactId} was successfully removed.`);
    });
  }
  
  function addContact(name, email, phone) {
    return listContacts().then((contacts) => {
      const newContact = {
        id: Date.now().toString(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)).then(
        () => newContact
      );
    });
  }
  

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };