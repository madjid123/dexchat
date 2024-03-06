// React
import { Route, Navigate, Routes } from 'react-router-dom';
import {} from 'react-router';
import { Fragment, useEffect, useState } from 'react';

//Redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from './app/hooks';
// Components
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import UserSpace from './pages/Userspace/UserSpace';
// Styling
// import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './tailwind.css';
import { AuthSelector, CheckisAuth } from '~/features/user/authSlice';
import { Home } from '~/pages/Home/Home';
import PrivateRoute from '~/components/PrivateRoute/PrivateRoute';
import { Layout } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;
const App = () => {
  const dispatch = useAppDispatch();
  const AuthState = useSelector(AuthSelector);
  const { isAuth,  } = AuthState;
  useEffect(() => {
    dispatch(CheckisAuth());
  }, [isAuth, dispatch]);
  const isMounted = useState(false);
  useEffect(()=>{
    const data = dispatch(CheckisAuth())
    data.then((res)=>{
    isMounted[1](true)})
  },[])
  if(!isMounted[0]) return <div className='flex flex-col items-center justify-center w-full h-full text-2xl font-bold text-white bg-center bg-no-repeat bg-cover from-neutral-900 to-slate-800 bg-gradient-to-br text-primary-foreground ' 
  > ...Waiting for backend server to start </div>
  return (
    // <ThemeProvider theme={darkTheme}>
    <Fragment>
      <Routes>
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserSpace />{' '}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/register"
          element={!isAuth ? <Register /> : <Navigate to="/" />}
        ></Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </Fragment>

    // </ThemeProvider>
  );
};

export default App;
