import '../styles/auth-form.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({handleLogin}) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Preencha todos os campos!", { autoClose: 3000 });
      return;
    }

    handleLogin(data);
  };

    return (
      <div className="page">
        <form className="auth-form" onSubmit={handleSubmit}>
            <legend className="auth-form__title">Entrar</legend>

            <input 
              type='email' 
              name='email'
              placeholder='E-mail' 
              className='auth-form__input'
              value={data.email}
              onChange={handleChange}
            />

            <input 
              type='password' 
              name='password'
              placeholder='Senha' 
              className='auth-form__input'
              value={data.password}
              onChange={handleChange}
            />

            <button type="submit" className='auth-form__button'>Entrar</button>

            <span className='auth-form__link'><Link className='link' to='/signup'>Inscreva-se aqui!</Link></span>
         </form>
         <ToastContainer />
      </div>
    )
  }
  
  export default Login;