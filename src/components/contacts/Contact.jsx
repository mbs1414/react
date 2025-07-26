import { Link } from 'react-router-dom';
import { CURRENTLINE, CYAN, ORANGE, PURPLE, RED } from '../../helpers/colors';

const Contact = ({ contact, removeContact }) => {
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4 col-sm-4">
              <img
                className="img-fluid rounded"
                src={
                  contact.photo !== ''
                    ? contact.photo
                    : 'https://placehold.co/200x200'
                }
                alt={contact.fullName}
                style={{ border: `1px solid ${PURPLE}` }}
              />
            </div>
            <div className="col-md-7 col-sm-7">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوادگی :{' '}
                  <span className="fw-bold">{contact.fullName}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  شماره موبایل :{' '}
                  <span className="fw-bold">{contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  ایمیل : <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
              <Link
                to={`/contacts/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-eye"></i>
              </Link>
              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: CYAN }}
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn my-1"
                style={{ backgroundColor: RED }}
                data-bs-toggle="modal"
                data-bs-target={`#remove-${contact.id}`}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>

          <div
            className="modal fade"
            id={`remove-${contact.id}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby={`modalLabel-${contact.id}`}
          >
            <div className="modal-dialog">
              <div className="modal-content p-2">
                <div className="d-flex justify-content-center align-items-center">
                  <p className="fs-3 text-center">
                    از حذف {contact.fullName} اطمینان دارید؟
                  </p>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                  >
                    بله
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      removeContact(contact.id);
                    }}
                  >
                    خیر
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
