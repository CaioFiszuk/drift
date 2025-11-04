import { useEffect, useState } from 'react';
import '../styles/task-table.css';
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import Popup from './Popup';
import { api } from '../utils/api';

function AllTasks({tasks, setTasks, getTasks}) {
  const [deleteModal, setDeleteModal] = useState(false);
  //const [updateModal, setUpdateModal] = useState(false);
   /* const [updateFormData, setUpdateFormData] = useState({
    title: '',
    type: '',
    frequency: '',
    moodTag: '',
    isMandatory: ''
  });*/
  const [selectedTask, setSelectedTask] = useState(null);

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

   const handleDeleteTask = async () => {
     if(!selectedTask) return;

     try {
       await api.deleteTask(selectedTask._id);
       setTasks(tasks.filter((v)=>v._id != selectedTask._id));
       closeDeleteModal();
       setSelectedTask(null);
     } catch(error) {
      console.error(error);
    }
  }

  /*const openUpdateModal = (task) => {
    setSelectedTask(task);
    setUpdateFormData({
      title: task.title,
      type: task.type,
      frequency: task.repeat.frequency,
      daysOfWeek: task.repeat.daysOfWeek,
      moodTag: task.moodTag,
      isMandatory: task.isMandatory
    });
    setUpdateModal(true);
  }

 /* const closeUpdateModal = () => {
    setUpdateModal(false);
  }

    const handleChange = (event) => {
    const { name, value, type } = event.target;

    setUpdateFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };


  /*const handleUpdateTask = async (newValue) => {
    if(!selectedTask) return;

    try{

    const response = await api.updateTask(selectedTask._id, newValue)
      setTasks((prev) =>
        prev.map((task) =>
          task._id === selectedTask._id ? response : task
        )
      );
      closeUpdateModal();
    } catch (error) {
      console.error("Erro ao atualizar: ", error);
    }
  }*/

  /*const handleSubmit = (event) => {
      event.preventDefault();
      handleUpdateTask(updateFormData);
  };*/

  useEffect(()=>{
    getTasks();
  }, []);

    return(
        <div>
        {tasks && tasks.length > 0 ? (
        <table className='task-table'>
          <thead>
            <tr>
              <th className='task-table__cell'>Título</th>
              <th className='task-table__cell'>Frequência</th>
              <th className='task-table__cell'></th>
              <th className='task-table__cell'></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className='task-table__cell'>{task.title}</td>
                <td className='task-table__cell'>{task.frequency.mode}</td>
                <td className='task-table__cell'>
                  <FaPencilAlt 
                   className='task-table__cell__icon'
                   //onClick={() => openUpdateModal(task)}
                  />
                </td>
                <td className='task-table__cell'>
                  <FaTrash 
                    className='task-table__cell__icon'
                    onClick={() => openDeleteModal(task)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='task-table__message'>Ainda não existem tarefas registradas</p>
      )}

      <Popup isOpen={deleteModal} onClose={closeDeleteModal}>
        <h3 className='form__title'>Tem certeza?</h3>
          <div className='form__button-box'>
            <button className='form__button' onClick={handleDeleteTask}>Sim</button>
            <button className='form__button' onClick={closeDeleteModal}>Não</button>
          </div>
      </Popup>  
    </div>
    );
}

export default AllTasks;


/**
 *        
 * 
 * 
 * 
 *    <Popup isOpen={updateModal} onClose={closeUpdateModal}>
           <form onSubmit={handleSubmit} className='form'>
             <legend className='form__title'>Editar Tarefa</legend>

             <input 
              type="text" 
              placeholder='Título'
              className='form__input'
              name='title'
              value={updateFormData.title}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={20}
              pattern="^[^\d]*$"
             />

             <select
               className='form__input'
               name='type'
               value={updateFormData.type}
               onChange={handleChange}
             >
               <option value="tarefa unica">Tarefa única</option>
               <option value="projeto">Projeto</option> 
             </select>

            <select
               className='form__input'
               name='frequency'
               value={updateFormData.frequency}
               onChange={handleChange}
             >
               
             </select>

             <input 
              type="number"
              placeholder='Dias da semana'
              className='form__input'
              name='daysOfWeek'
              value={updateFormData.daysOfWeek}
              onChange={handleChange}
              required
              min={1}
              max={7}
             /> 

              <label className='form__label'>Tarefa obrigatória?</label>
             <select
               className='form__input'
               name='isMandatory'
               value={updateFormData.isMandatory}
               onChange={handleChange}
             >
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
             </select>

             <select
              className='form__input'
              name='moodTag'
              value={updateFormData.moodTag}
              onChange={handleChange}
             >
              <option value="good">Motivado</option>
              <option value="bad">Desmotivado</option>
             </select>

            <button 
              type="submit" 
              className='form__button'
            >
              Editar
            </button>
           </form>
      </Popup>
 */