import { useSearchParams } from 'react-router-dom';

function Hello() {
  const [searchParams, setSearchParams] = useSearchParams();
//   const location = useLocation()
  //   const name = 'Mohammad';
  //   const users = [
  //     {
  //       firstName: 'Mohammad',
  //       lastName: 'Babakhani',
  //     },
  //   ];
  //   const isAdmin = true;
  //   const colors = ['Apple', 'Banana', 'Cherry'];
  const books = [
    {
      id: 1,
      title: 'صد سال تنهایی',
      author: 'گابریل گارسیا مارکز',
      isbn: '978-964-305-375-6',
      publishedYear: 1967,
      pages: 417,
      genre: 'رمان',
      language: 'اسپانیایی',
      available: true,
    },
    {
      id: 2,
      title: 'بیگانه',
      author: 'آلبر کامو',
      isbn: '978-600-119-045-2',
      publishedYear: 1942,
      pages: 185,
      genre: 'فلسفی',
      language: 'فرانسوی',
      available: false,
    },
    {
      id: 3,
      title: 'قلعه حیوانات',
      author: 'جرج اورول',
      isbn: '978-964-351-335-9',
      publishedYear: 1945,
      pages: 112,
      genre: 'سیاسی، تمثیلی',
      language: 'انگلیسی',
      available: true,
    },
    {
      id: 4,
      title: 'جنایت و مکافات',
      author: 'فیودور داستایوسکی',
      isbn: '978-964-362-453-6',
      publishedYear: 1866,
      pages: 671,
      genre: 'ادبیات کلاسیک',
      language: 'روسی',
      available: true,
    },
    {
      id: 5,
      title: 'شازده کوچولو',
      author: 'آنتوان دو سنت‌اگزوپری',
      isbn: '978-964-363-428-3',
      publishedYear: 1943,
      pages: 96,
      genre: 'ادبیات کودک و نوجوان',
      language: 'فرانسوی',
      available: true,
    },
  ];

  return (
    <div style={{ color: 'white' }}>
      {/* <h1>Hello World</h1>
      <h2>{name}</h2>
      <h3>{users[0].firstName}</h3>
      <h3>{users[0].lastName}</h3>
      <h4>{isAdmin ? 'Admin' : 'He is not admin'}</h4>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul> */}
      <input
        type="text"
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
      <div>
        {books
          .filter((book) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = book.title.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((book) => (
            <h1 key={book.id}>{book.title}</h1>
          ))}
      </div>
    </div>
  );
}
export default Hello;
