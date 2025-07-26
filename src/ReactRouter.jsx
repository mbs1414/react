import { Route, Routes } from 'react-router-dom';
import About from './components/react router/About';
import Books from './components/react router/Books';
import Book from './components/react router/Book';
import Home from './components/react router/Home';
import NavBar from './components/react router/Navbar';
import NotFound from './components/react router/NotFound';

const ReactRouter = () => {
  return (
    <div className="App container text-white">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />}>
          <Route
            index
            element={
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  margin: '2rem',
                }}
              >
                کتاب مورد نظر خود را انتخاب کنید.
              </div>
            }
          />
          <Route path=":bookId" element={<Book />} />
        </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default ReactRouter;
