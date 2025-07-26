import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBook, deleteBook } from '../../data/books';
const Book = () => {
  const { bookId } = useParams();
  const book = getBook(parseInt(bookId));
  const navigate = useNavigate();
  const location =useLocation()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        justifyContent: 'center',
        margin: '1rem',
        textAlign: 'center',
      }}
    >
      <h2>شناسه: {book.number}</h2>
      <h2>نام: {book.name}</h2>
      <h2>قیمت: {`${book.amount} تومان`}</h2>
      <h2>مدت زمان تحویل: {book.due}</h2>
      <div>
        <button
          type="button"
          className="btn btn-danger btn-lg"
          onClick={() => {
            deleteBook(parseInt(bookId));
            navigate('/books' + location.search);
          }}
        >
          حذف کتاب
        </button>
      </div>
    </div>
  );
};
export default Book;
