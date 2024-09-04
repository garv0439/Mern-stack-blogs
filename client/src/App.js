import { useState } from "react";



import DataProvider from './context/DataProvider';



import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';


//componentssss
import Login from './components/account/login.jsx';
import Home from "./components/home/home.jsx";
import Header from './components/header/header.jsx';


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
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


          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
