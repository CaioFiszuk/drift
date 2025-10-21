import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Main from  './Main';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import AllTasks from './AllTasks';
import Manifest from './Manifest';
import * as auth from '../utils/auth';
import * as token from '../utils/token';
import { api } from '../utils/api';
import { toast } from "react-toastify";
import { currentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleGetTasks = async () => {
      try{
        const data = await api.getTasks();
        setTasks(data);
      }catch(error){
        console.log(error);
      }
  }

  useEffect(()=>{
    const jwt = token.getToken();
    if (jwt) {
      auth.getUserInfo(jwt)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data.data._id);
          localStorage.setItem("isLoggedIn", "true");
        })
        .catch(() => {
          setIsLoggedIn(false);
          token.removeToken();
          localStorage.removeItem("isLoggedIn");
        });
    }

     handleGetTasks();
  }, []);

  return (
    <div>
      <currentUserContext.Provider value={currentUser}>
      <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header handleSignOut={signOut} setTasks={setTasks}/>
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

        <Route path='/alltasks' element={
           <ProtectedRoute isLoggedIn={isLoggedIn}>
             <Header handleSignOut={signOut} setTasks={setTasks}/>
             <AllTasks tasks={tasks} setTasks={setTasks}/>
           </ProtectedRoute>
        }/>

        <Route path='/manifest' element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header handleSignOut={signOut} setTasks={setTasks}/>
            <Manifest />
          </ProtectedRoute>
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
      </currentUserContext.Provider>
    </div>
  )
}

export default App;