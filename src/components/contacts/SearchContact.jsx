import { useContext } from 'react';
import { PURPLE } from '../../helpers/colors';
import { ContactContext } from '../../context/contactContext';

const SearchContact = () => {
  const { contactSearch } = useContext(ContactContext);

  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: PURPLE }}
      >
        <i className="fa fa-search" />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
        dir="rtl"
        onChange={event => contactSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchContact;
