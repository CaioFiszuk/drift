import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Main from  './Main';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import * as token from '../utils/token';
import { toast } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const navigate = useNavigate();

    const handleRegistration = ({
    username,
    email,
    password
  }) => {
    auth.register(username, email, password)
    .then(()=>{
      navigate("/signin");
    })
    .catch(console.error)
  }

  const handleLogin = ({ email, password }) => {
    auth
    .authorize(email, password)
    .then((data) => {
      if (data.token) {
        token.setToken(data.token);
        localStorage.setItem("isLoggedIn", "true");

        auth.getUserInfo(data.token)
          .then(() => {
            setIsLoggedIn(true);
            navigate("/");
          });
      }
    })
    .catch((error) => {
      toast.error(error.message.slice(6));
    });
  }

  const signOut = () => {
    token.removeToken();
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header handleSignOut={signOut}/>
              <Main />
            </ProtectedRoute>
          }
        />

        <Route path='/signin' element={
          <>
            <Login handleLogin={handleLogin}/>
          </>
        }/>

        <Route path='/signup' element={
          <>
            <Register handleRegistration={handleRegistration}/>
          </>
        }/>

          <Route
            path="*"
            element={
              isLoggedIn ? (
              <Navigate to="/" replace />
              ) : (
              <Navigate to="/signin" replace />
              )
            }
          />
      </Routes>
    </div>
  )
}

export default App;