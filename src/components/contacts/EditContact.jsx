import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getContact, updateContact } from '../../services/contactServices';
import { Spinner } from '../';
import { COMMENT, ORANGE, PURPLE } from '../../helpers/colors';
import note from '../../assets../../assets/man-taking-note.png';
import { ContactContext } from '../../context/contactContext';
import { contactSchema } from '../../validations/contactValidation';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
 
const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useImmer({
    fullName: '',
    photo: '',
    mobile: '',
    email: '',
    job: '',
    group: '',
  });
  const { loading, setLoading, groups, setContacts, setFilteredContacts } =
    useContext(ContactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setLoading(false);
        setContact(contactData);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);
      if (status === 200) {
        toast.info('مخاطب با موفقیت ویرایش شد', { icon: '✏️' });
        setLoading(false);
        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => String(c.id) === String(contactId)
          );
          draft[contactIndex] = { ...data };
        });
        setFilteredContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => String(c.id) === String(contactId)
          );
          draft[contactIndex] = { ...data };
        });
        navigate('/contacts');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: '#44475a', borderRadius: '1em' }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          type="text"
                          name="fullName"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="span"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="text"
                          name="photo"
                          className="form-control"
                          placeholder="آدرس تصویر"
                        />
                        <ErrorMessage
                          name="photo"
                          component="span"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="number"
                          name="mobile"
                          inputMode="numeric"
                          className="form-control"
                          placeholder="شماره موبایل"
                        />
                        <ErrorMessage
                          name="mobile"
                          component="span"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="آدرس ایمیل"
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="text"
                          name="job"
                          className="form-control"
                          placeholder="شغل"
                        />
                        <ErrorMessage
                          name="job"
                          component="span"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          as="select"
                          name="group"
                          className="form-control"
                        >
                          <option value="">انتخاب گروه</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="group"
                          component="span"
                          className="text-danger"
                        />
                      </div>
                      <div className="mx-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="ساخت مخاطب"
                        />
                        <Link
                          to={'/contacts'}
                          className="btn mx-2"
                          style={{ backgroundColor: COMMENT }}
                        >
                          انصراف
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={
                      contact.photo === ''
                        ? 'https://placehold.co/200x200'
                        : contact.photo
                    }
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img src={note} height="300px" style={{ opacity: '60%' }} />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
