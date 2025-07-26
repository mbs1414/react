import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  AddContact,
  Contacts,
  EditContact,
  NavBar,
  ViewContact,
} from './components/index';
import { useState, useEffect } from 'react';
import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from './services/contactServices';
import { ContactContext } from './context/contactContext';
const App = () => {
  const naigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [groups, setGroups] = useState([]);
  const [contactQuery, setContactQuery] = useState({ text: '' });
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };
  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(contact);
      if (status === 201) {
        setContact({});
        naigate('/contacts');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  const contactSearch = (event) => {
    setContactQuery({ ...contactQuery, text: event.target.value });
    const allContacts = contacts.filter((c) =>
      c.fullName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredContacts(allContacts);
  };
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContact,
        contactQuery,
        contacts,
        filteredContacts,
        groups,
        onContactChange,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route
            path="/contacts"
            element={
              <Contacts
                getContacts={filteredContacts}
                loading={loading}
                removeContact={removeContact}
              />
            }
          />
          <Route
            path="/contacts/add"
            element={
              <AddContact
                loading={loading}
                setContactInfo={onContactChange}
                contact={contact}
                groups={groups}
                createContactForm={createContactForm}
              />
            }
          />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};
export default App;
