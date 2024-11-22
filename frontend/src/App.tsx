// import { useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';

export const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blog' element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
