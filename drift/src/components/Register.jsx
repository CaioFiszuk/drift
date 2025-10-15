import '../styles/form.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register({ handleRegistration }) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
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

    if (!data.username || !data.email || !data.password) {
      toast.error("Preencha todos os campos!", { autoClose: 3000 });
      return;
    }

    handleRegistration(data);
  }; 

    return (
      <div className="page">
      <form className="form" onSubmit={handleSubmit}>
         <legend className="form__title">Inscreva-se</legend>

         <input 
           type='text' 
           name='username'
           placeholder='Nome' 
           className='form__input'
           value={data.username}
           onChange={handleChange}
         />

         <input 
           type='email' 
           name='email'
           placeholder='E-mail' 
           className='form__input'
           value={data.email}
           onChange={handleChange}
         />

         <input 
           type='password' 
           name='password'
           placeholder='Senha' 
           className='form__input'
           value={data.password}
           onChange={handleChange}
         />

         <button className="form__button" type='submit'>Inscrever-se</button>

         <span className="form__link"><Link to='/signin' className='link'>Faça o login aqui</Link></span>
      </form>
        <ToastContainer />
      </div>
    )
  }
  
  export default Register;