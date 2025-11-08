import { useState } from 'react';
import Logo from '../assets/images/drift-logo.png';
import '../styles/form.css';
import { api } from '../utils/api';
import Popup from './Popup';
import TaskForm from './TaskForm';
import { NavLink } from 'react-router-dom';

function Header({handleSignOut, setTasks}) {

  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  const openCreateTaskModal = () => {
    setCreateTaskModalOpen(true);
  }

  const closeCreateTaskModal = () => {
    setCreateTaskModalOpen(false);
  }

    const handleCreateTask = async (data) => {
    try {
      const newTask = await api.createTask(data);
      setTasks(prevTasks => [...prevTasks, newTask]);
      closeCreateTaskModal();
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <header className='header'>
       
       <NavLink to='/'><img src={Logo} alt="Logo"  className='header__image'/></NavLink>

        <nav className='header__navigation'>
          <NavLink to='/alltasks' className='header__navigation-link'>Todas tarefas</NavLink>
          <NavLink to='/manifest' className='header__navigation-link'>Manifesto Drift</NavLink>
        </nav>

        <div className='header__buttons'>
          <button className='header__button' onClick={openCreateTaskModal}>Criar tarefa</button>
          <button className='header__button' onClick={handleSignOut}>Sair</button>
        </div>


        <Popup isOpen={createTaskModalOpen} onClose={closeCreateTaskModal}>
           <TaskForm handleSubmitForm={handleCreateTask} formName={"Criar Tarefa"} buttonName={"Criar"}/>
        </Popup>
    </header>
  )
}

export default Header;
