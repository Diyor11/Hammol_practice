import {BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom'

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Header from './components/Header';
import Product from './pages/Product';

function App() {

  return (
    <>
      <Router>
        <Header />
        <div className='container mt-12 mx-auto py-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='*' element={<Navigate to='/' replace={false} />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
