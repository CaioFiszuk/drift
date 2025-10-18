import { useState } from 'react';
import Logo from '../assets/images/drift-logo.png';
import '../styles/form.css';
import { api } from '../utils/api';
import Popup from './Popup';
import Validator from './Validator';

function Header({handleSignOut, setTasks}) {

  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
    title: "",
    type: "single",
    frequency: "casual",
    daysOfWeek: [1],
    moodTag: "good",
    isMandatory: true,
  });

  const openCreateTaskModal = () => {
    setCreateTaskModalOpen(true);
  }

  const closeCreateTaskModal = () => {
    setCreateTaskModalOpen(false);
  }

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));

    setErrorMessage(event.target.validationMessage);
    setIsValid(event.target.checkValidity());
  };

    const handleCreateTask = async (data) => {
    try {
      const newTask = await api.createTask(data);
      setTasks(prevTasks => [...prevTasks, newTask]);
      closeCreateTaskModal();
    } catch(error) {
      console.error(error);
    }
  }

  const handleSubmit = (event) => {
  event.preventDefault();
  if (isValid) {
      handleCreateTask(formData);
  }
  };

  return (
    <header className='header'>
       
        <img src={Logo} alt="Logo"  className='header__image'/>

        <button className='header__button' onClick={openCreateTaskModal}>Criar tarefa</button>

        <button className='header__button' onClick={handleSignOut}>Sign Out</button>


        <Popup isOpen={createTaskModalOpen} onClose={closeCreateTaskModal}>
           <form onSubmit={handleSubmit} className='form'>
             <legend className='form__title'>Criar Tarefa</legend>

             <input 
              type="text" 
              placeholder='Título'
              className='form__input'
              name='title'
              onChange={handleChange}
              required
              minLength={5}
              maxLength={20}
              pattern="^[^\d]*$"
             />
              {!isValid && <Validator message={errorMessage} />}

             <select
               defaultValue="single"
               className='form__input'
               name='type'
             >
               <option value="single">Tarefa única</option>
               <option value="project">Projeto</option> 
             </select>

            <select
               defaultValue="casual"
               className='form__input'
               name='frequency'
             >
               <option value="daily">Tarefa diária</option>
               <option value="weekly">Tarefa semanal</option> 
               <option value="casual">Tarefa casual</option>
             </select>

             <input 
              type="number"
              placeholder='Dias da semana'
              className='form__input'
              name='daysOfWeek'
              onChange={(e) => {
                const value = Number(e.target.value);
                setFormData((prev) => ({ ...prev, daysOfWeek: [value] }));
              }}
              required
              min={1}
              max={7}
             /> 
              {!isValid && <Validator message={errorMessage} />}

              <label className='form__label'>Tarefa obrigatória?</label>
             <select
               defaultValue={true}
               className='form__input'
               name='isMandatory'
             >
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
             </select>

             <select
              defaultValue="good"
              className='form__input'
              name='moodTag'
             >
              <option value="good">Motivado</option>
              <option value="bad">Desmotivado</option>
             </select>

            <button 
              type="submit" 
              className='form__button'
            >
              Criar
            </button>
           </form>
        </Popup>
    </header>
  )
}

export default Header;
