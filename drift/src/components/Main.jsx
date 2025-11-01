import { useEffect, useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import { TfiFaceSad } from 'react-icons/tfi';
import '../styles/main.css';
import { api } from '../utils/api';

function Main({getTasks, setTasks, tasks}) {
  const [activeMood, setActiveMood] = useState("good");
  const [tasksByMood, setTasksByMood] = useState([]);
  const statusColors = {
    feito: 'complete',
    em_progresso: 'warning',
    pendente: 'danger',
  };

  const handleGetTaskByMood = async () => {
    try {
      const response = await api.getTasksByMood();
      setTasksByMood(response);
    } catch(error) {
      console.log(error);
    }
  }

  const handleChangeStatus = async (task, status) => {
    try{
    const response = await api.updateStatus(task._id, status);
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? response : t
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar: ", error);
    }
  }

  useEffect(()=>{
     handleGetTaskByMood();
     getTasks();
  }, []);

  return (
    <main className="main">
      <section className="main__mood-box">
        <FaRegSmile
          className={`main__mood-box__icon ${
            activeMood === "good" ? "main__mood-box--active" : ""
          }`}
          onClick={() =>
            setActiveMood("good")
          }
        />
        <TfiFaceSad
          className={`main__mood-box__icon ${
            activeMood === "bad" ? "main__mood-box--active" : ""
          }`}
          onClick={() => setActiveMood("bad")}
        />
      </section>

      {
        activeMood === "good" ? (
          <table className='task-table'>
              <thead>
                <tr>
                  <th className='task-table__cell'>Título</th>
                  <th className='task-table__cell'>Status</th>
                  <th className='task-table__cell'></th>
                  <th className='task-table__cell'></th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className='task-table__cell'>{task.title}</td>
                    <td 
                      className={`task-table__cell ${statusColors[task.status] || ''}`}
                    >
                      {task.status}
                    </td>
                    <td className="task-table__cell">
                      <button 
                        className='task-table__button info'
                        onClick={()=>{
                          handleChangeStatus(task, 'em progresso');
                        }}
                      >
                        Começar
                      </button>
                    </td>
                    <td className="task-table__cell">
                      <button 
                        className='task-table__button success'
                        onClick={()=>{
                          handleChangeStatus(task, 'feito');
                        }}
                      >
                        Concluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        ) : (
          <table className='task-table'>
            <thead>
              <tr>
                <th className='task-table__cell'>Título</th>
                <th className='task-table__cell'>Status</th>
                <th className='task-table__cell'></th>
                <th className='task-table__cell'></th>
              </tr>
            </thead>
            <tbody>
              {tasksByMood.map((taskByMood) => (
                <tr key={taskByMood._id}>
                  <td className='task-table__cell'>{taskByMood.title}</td>
                  <td className='task-table__cell'>{taskByMood.status}</td>
                  <td className="task-table__cell">
                    <button 
                      className='task-table__button info'
                      onClick={()=>{
                        handleChangeStatus(taskByMood, 'em progresso');
                      }}
                    >
                      Começar
                    </button>
                  </td>
                  <td className="task-table__cell">
                    <button 
                     className='task-table__button success'
                      onClick={()=>{
                          handleChangeStatus(taskByMood, 'feito');
                      }}
                    >
                      Concluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </main>
  );
}

export default Main;
