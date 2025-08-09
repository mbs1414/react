import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  AddContact,
  Contacts,
  EditContact,
  NavBar,
  ViewContact,
} from './components/index';
import { useEffect } from 'react';
import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from './services/contactServices';
import { ContactContext } from './context/contactContext';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const naigate = useNavigate();
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);

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

  const createContactForm = async (values) => {
    try {
      setLoading((prevLoading) => !prevLoading);
      // await contactSchema.validate(contact, { abortEarly: false });
      const { status, data } = await createContact(values);
      if (status === 201) {
        toast.success('مخاطب با موفقیت ساخته شد', { icon: '🚀' });
        setFilteredContacts((draft) => {
          draft.push(data);
        });
        setContacts((draft) => {
          draft.push(data);
        });
        setLoading((draft) => !draft);
        naigate('/contacts');
      }
    } catch (error) {
      console.log(error.message);
      setLoading((prevLoading) => !prevLoading);
    }
  };
  const removeContact = async (contactId) => {
    const contactsBackup = [...contacts];
    try {
      setLoading(true);
      setContacts((draft) => draft.filter((c) => c.id !== contactId));
      setFilteredContacts((draft) => draft.filter((c) => c.id !== contactId));
      const { status } = await deleteContact(contactId);
      setLoading(false);
      toast.error('مخاطب با موفقیت حذف شد',{icon: '🗑️'})
      if (status !== 200) {
        setContacts(contactsBackup);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup);
      setLoading(false);
    }
  };
  const contactSearch = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts]);
    setFilteredContacts(
      contacts.filter((c) =>
        c.fullName.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, 1000);
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contacts,
        filteredContacts,
        groups,
        createContact: createContactForm,
        contactSearch,
        setContacts,
        setFilteredContacts,
        // errors
      }}
    >
      <div className="App">
        <ToastContainer
          rtl={true}
          position="top-right"
          theme="colored"
          style={{ fontFamily: 'Vazir, Tahoma, Ubuntu', fontWeight: 'normal' }}
        />
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
