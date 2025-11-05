import { useEffect, useState } from 'react';
import '../styles/task-table.css';
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import Popup from './Popup';
import TaskForm from './TaskForm';
import { api } from '../utils/api';

function AllTasks({tasks, setTasks, getTasks}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
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

  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setUpdateModal(true);
  }

  const closeUpdateModal = () => {
    setUpdateModal(false);
  }

  const handleUpdateTask = async (newValue) => {
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
  }

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
                   onClick={() => openUpdateModal(task)}
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

      <Popup isOpen={updateModal} onClose={closeUpdateModal}>
          <TaskForm 
            handleSubmitForm={handleUpdateTask} 
            formName={"Editar Tarefa"} 
            buttonName={"Editar"}
            initialData={selectedTask}
          />
      </Popup> 
    </div>
    );
}

export default AllTasks;