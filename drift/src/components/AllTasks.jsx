import { useState } from 'react';
import '../styles/task-table.css';
import { FaTrash } from "react-icons/fa";
import Popup from './Popup';
import { api } from '../utils/api';

function AllTasks({tasks, setTasks}) {
  const [deleteModal, setDeleteModal] = useState(false);
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

    return(
        <div>
        {tasks && tasks.length > 0 ? (
        <table className='task-table'>
          <thead>
            <tr>
              <th className='task-table__cell'>Título</th>
              <th className='task-table__cell'>Tipo de tarefa</th>
              <th className='task-table__cell'>Frequência</th>
              <th className='task-table_cell'></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className='task-table__cell'>{task.title}</td>
                <td className='task-table__cell'>{task.type}</td>
                <td className='task-table__cell'>{task.repeat.frequency}</td>
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
            <button className='form__button form__button-success' onClick={handleDeleteTask}>Sim</button>
            <button className='form__button form__button-danger' onClick={closeDeleteModal}>Não</button>
          </div>
      </Popup>
        </div>
    );
}

export default AllTasks;