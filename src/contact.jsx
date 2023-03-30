import React, { useState, useEffect } from 'react';
import axios from 'axios';



function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [editingContactId, setEditingContactId] = useState(null);
  const [editingContactName, setEditingContactName] = useState('');
  const [editingContactEmail, setEditingContactEmail] = useState('');
  const [editingContactPhone, setEditingContactPhone] = useState('');

  //API fetch data
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  //add contact detail
  const handleNewContactSubmit = event => {
    event.preventDefault();
    const newContact = {
      name: newContactName,
      email: newContactEmail,
      phone: newContactPhone
    };
    axios.post('https://jsonplaceholder.typicode.com/users', newContact)
      .then(response => {
        setContacts([...contacts, response.data]);
        setNewContactName('');
        setNewContactEmail('');
        setNewContactPhone('');
        alert("Your data has been added successfully.");
      })
      .catch(error => {
        console.log(error);
      });
  };

  //edit contact detail
  const handleEditContactSubmit = event => {
    event.preventDefault();
    const editedContact = {
      name: editingContactName,
      email: editingContactEmail,
      phone: editingContactPhone
    };
    axios.put(`https://jsonplaceholder.typicode.com/users/${editingContactId}`, editedContact)
      .then(response => {
        const updatedContacts = contacts.map(contact => {
          if (contact.id === response.data.id) {
            return response.data;
          } else {
            return contact;
          }
        });
        setContacts(updatedContacts);
        setEditingContactId(null);
        setEditingContactName('');
        setEditingContactEmail('');
        setEditingContactPhone('');
        alert("Your data has been edit successfully");
      })
      .catch(error => {
        console.log(error);
      });
  };



  //Delete contact detail
  const handleDeleteContact = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        const updatedContacts = contacts.filter(contact => contact.id !== id);
        setContacts(updatedContacts);
        alert("Your data has been deleted");
      })
      .catch(error => {
        console.log(error);
      });
  };


  
  return (
    <div>
      
      <h1>Contact List</h1> <a className='editbutton' href='#contact'>Add Contact +</a>
      <ul>
        {contacts.map(contact => (
          <div className='flexbox'>
          <li key={contact.id}>
            {editingContactId === contact.id ? (
              <form onSubmit={handleEditContactSubmit}>
                
                <label>
                  Name:
                  <input type="text" value={editingContactName} onChange={event => setEditingContactName(event.target.value)} />
                </label>
                <label>
                  Email:
                  <input type="email" value={editingContactEmail} onChange={event => setEditingContactEmail(event.target.value)} />
                </label>
                <label>
                  Phone:
                  <input type="tel" value={editingContactPhone} onChange={event => setEditingContactPhone(event.target.value)} />
                </label>
                <br></br>
                <button className='editbutton' type="submit">Save</button>
                <button className='deletebutton' type="button" onClick={() => setEditingContactId(null)}>Cancel</button>
                
              </form>
            ) : (
              <>
            <div>{contact.name}</div>
            <div>{contact.email}</div>
            <div>{contact.phone}</div>
            <button className='editbutton' type="button" onClick={() => setEditingContactId(contact.id)}>Edit</button>
            <button className='deletebutton' type="button" onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </>
        )}
      </li>
      </div>
    ))}
  </ul>
  
  <div className='addbox' id='contact' style={{marginBottom:"100px"}}>
  <h1>Add Contact</h1>
  <form onSubmit={handleNewContactSubmit}>
    <label>
      Name:
      <input type="text" value={newContactName} onChange={event => setNewContactName(event.target.value)} />
    </label>
    <label>
      Email:
      <input type="email" value={newContactEmail} onChange={event => setNewContactEmail(event.target.value)} />
    </label>
    <label>
      Phone:
      <input type="tel" value={newContactPhone} onChange={event => setNewContactPhone(event.target.value)} />
    </label>
    <button className='editbutton' type="submit">Add</button>
    
  </form>
</div>
<div class="footer">
  <p>Copyright © 2023 Rakesh. All rights reserved.</p>
</div>
</div>
);
}

export default ContactList;

