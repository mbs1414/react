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
const App = () => {
  const naigate = useNavigate();
  const [forceRender, setForceRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getContact, setContact] = useState({
    fullName: '',
    photo: '',
    mobile: '',
    email: '',
    job: '',
    group: '',
  });
  const [getGroups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
        console.log(contactsData);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [forceRender]);

  const setContactInfo = (event) => {
    setContact({ ...getContact, [event.target.name]: event.target.value });
  };
  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);
      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
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
  const [query, setQuery] = useState({ text: '' });
  const [getFilteredContacts, setFilteredContacts] = useState([]);
  const contactSearch = (event) => {
    setQuery({ ...query, text: event.target.value });
    const allContacts = getContacts.filter(
      (c) =>
        typeof c.fullName === 'string' &&
        c.fullName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredContacts(allContacts);
  };
  return (
    <div className="App">
      <NavBar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contacts
              getContacts={getFilteredContacts}
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
              setContactInfo={setContactInfo}
              contact={getContact}
              groups={getGroups}
              createContactForm={createContactForm}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
      </Routes>
    </div>
  );
};
export default App;
