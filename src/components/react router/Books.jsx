import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { getBooks } from '../../data/books';
const Books = () => {
  const books = getBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ borderLeft: 'solid 1px white', padding: '1rem' }}>
        <input
          type="text"
          placeholder="جست و جوی کتاب"
          className="mb-2"
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter: filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {books
          .filter((book) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = book.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((book) => (
            <NavLink
              style={{
                display: 'block',
                fontSize: '1.5rem',
                textAlign: 'center',
              }}
              to={`/books/${book.number}${location.search}`}
              key={book.number}
              className={({ isActive }) =>
                isActive ? 'nav-link active fw-bolder fs-3' : 'nav-link'
              }
            >
              {book.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
};
export default Books;
