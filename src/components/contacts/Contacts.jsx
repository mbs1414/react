import { Fragment, useContext } from 'react';
import { CURRENTLINE, ORANGE, PINK } from '../../helpers/colors';
import Contact from './Contact';
import notFound from './../../assets/no-found.gif';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { ContactContext } from '../../context/contactContext';

const Contacts = ({removeContact}) => {
  const { filteredContacts, loading } = useContext(ContactContext);
  return (
    <Fragment>
      <section className="container mt-4">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link
                  className="btn"
                  to="/contacts/add"
                  style={{ backgroundColor: PINK }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-1"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        {/* loading */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="row">
            {/* Contact */}
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <Contact
                  contact={contact}
                  key={contact.id}
                  removeContact={removeContact}
                />
              ))
            ) : (
              <div
                className="text-center py-5 mx-2"
                style={{ backgroundColor: CURRENTLINE }}
              >
                <p className="h3" style={{ color: ORANGE }}>
                  مخاطب یافت نشد
                </p>
                <img src={notFound} alt="پیدا نشد" className="w-25" />
              </div>
            )}
          </div>
        )}
      </section>
    </Fragment>
  );
};
export default Contacts;
