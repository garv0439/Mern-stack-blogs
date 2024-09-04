import { useState } from "react";



import DataProvider from './context/DataProvider';



import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';


//componentssss
import Login from './components/account/login.jsx';
import Home from "./components/home/home.jsx";
import Header from './components/header/header.jsx';
import CreatePost from "./components/create/createPost.jsx";
import DetailView from "./components/details/DetailView.jsx";
import Update from "./components/create/update.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/login' />
};


function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);


  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 80 }}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/create' element={<CreatePost />} />
            </Route>


            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>


            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>


          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
