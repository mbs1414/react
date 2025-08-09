import { createContext } from 'react';
export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contacts: [],
  filteredContacts: [],
  contactQuery: {},
  groups: [],
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
  setContacts: () => {},
  setFilteredContacts: () => {},
});
