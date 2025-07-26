// مسیر: components/react router/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <h1 className="display-4 text-danger mb-3">404</h1>
      <p className="lead mb-4">صفحه‌ای با این آدرس پیدا نشد!</p>
      <Link to="/" className="btn btn-primary">
        بازگشت به خانه
      </Link>
    </div>
  );
};

export default NotFound;
