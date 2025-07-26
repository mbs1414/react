import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <h1>کتاب خانه من</h1>
      <nav
        style={{
          borderBottom: 'solid 1px white',
          paddingBottom: '1rem',
          display: 'flex',
          justifyContent: 'start',
          gap: '0.5rem',
        }}
      >
        <Link to="/" style={{ fontSize: '1.5rem' }}>
          خانه
        </Link>
        <Link to="/books" style={{ fontSize: '1.5rem' }}>
          کتاب ها
        </Link>
        <Link to="/about" style={{ fontSize: '1.5rem' }}>
          درباره ما
        </Link>
      </nav>
    </>
  );
};
export default NavBar;
