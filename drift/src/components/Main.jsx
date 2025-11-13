import { useEffect, useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import { TfiFaceSad } from 'react-icons/tfi';
import '../styles/main.css';
import { api } from '../utils/api';
import Swal from 'sweetalert2';

function Main({getTasks, setTasks, tasks, tasksByMood, getTasksByMood}) {
  const [activeMood, setActiveMood] = useState("good");
  const statusColors = {
    feito: 'complete',
    em_progresso: 'warning',
    pendente: 'danger',
  };

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

  const getFixedTasks = async () => {
    try {
       const fixedTasks = await api.getFixedTasks();
       return fixedTasks;
    } catch(error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const fixedTasks = await getFixedTasks();
      if (!fixedTasks.length) return;

      const randomTask = fixedTasks[Math.floor(Math.random() * fixedTasks.length)];
      const dueDate = new Date(randomTask.frequency.dueDate);
      const today = new Date();
      const remainingDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

      if (remainingDays < 0) return;

      Swal.fire({
        title: 'Lembrete!',
        text: `${randomTask.title} daqui há ${remainingDays} dias`,
        confirmButtonText: 'OK',
      });
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
     getTasksByMood();
     getTasks();
  }, [tasks]);

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
                          handleChangeStatus(task, 'em_progresso');
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
                  <td className={`task-table__cell ${statusColors[taskByMood.status] || ''}`}>{taskByMood.status}</td>
                  <td className="task-table__cell">
                    <button 
                      className='task-table__button info'
                      onClick={()=>{
                        handleChangeStatus(taskByMood, 'em_progresso');
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
