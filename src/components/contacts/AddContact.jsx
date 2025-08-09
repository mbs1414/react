import { Link } from 'react-router-dom';
import { Spinner } from '../';
import note from '../../assets../../assets/man-taking-note.png';
import { COMMENT, GREEN, PURPLE } from '../../helpers/colors';
import { useContext } from 'react';
import { ContactContext } from '../../context/contactContext';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import { contactSchema } from '../../validations/contactValidation';

const AddContact = () => {
  const { loading, groups, createContact } = useContext(ContactContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={note}
              height="400px"
              style={{
                position: 'absolute',
                zIndex: '-1',
                top: '130px',
                left: '100px',
                opacity: '50%',
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  {/* {errors?.map((error,index)=>(
                    <p key={index} className="text-danger">{error.message}</p>
                  ))} */}
                  <Formik
                    initialValues={{
                      fullName: '',
                      photo: '',
                      mobile: '',
                      email: '',
                      job: '',
                      group: '',
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      createContact(values);
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
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
