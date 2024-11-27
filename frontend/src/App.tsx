// import { useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blogs from './pages/Blogs';
import AddBlog from './pages/AddBlog';
import Blog from './pages/Blog';
import EditBlog from './pages/EditBlog';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Signin />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/addBlog' element={<AddBlog />} />
          <Route path='/edit/:id' element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
