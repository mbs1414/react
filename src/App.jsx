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
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(contact);
      if (status === 201) {
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setContact({});
        setLoading((prevLoading) => !prevLoading);
        naigate('/contacts');
      }
    } catch (error) {
      console.log(error.message);
      setLoading((prevLoading) => !prevLoading);
    }
  };
  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      setLoading(true);
      const updatedContacts = contacts.filter((c) => c.id !== contactId);
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);
      const { status } = await deleteContact(contactId);
      setLoading(false);
      if (status !== 200) {
        setContacts(allContacts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
      setLoading(false);
    }
  };
  let filterTimeOut;
  const contactSearch = (query) => {
    if(!query) return setFilteredContacts([...contacts])
    clearTimeout(filterTimeOut)
    filterTimeOut = setTimeout(() => {
      setFilteredContacts(
        contacts.filter((c) =>
          c.fullName.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 1000);
  };
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContact,
        contacts,
        filteredContacts,
        groups,
        onContactChange,
        createContact: createContactForm,
        contactSearch,
        setContacts,
        setFilteredContacts,
      }}
    >
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route
            path="/contacts"
            element={<Contacts removeContact={removeContact} />}
          />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};
export default App;
