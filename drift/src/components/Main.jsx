import { useEffect, useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import { TfiFaceSad } from 'react-icons/tfi';
import '../styles/main.css';
import { api } from '../utils/api';

function Main({getTasks, tasks}) {
  const [activeMood, setActiveMood] = useState("good");
  const [tasksByMood, setTasksByMood] = useState([]);

  const handleGetTaskByMood = async () => {
    try {
      const response = await api.getTasksByMood();
      setTasksByMood(response);
    } catch(error) {
      console.log(error);
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
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className='task-table__cell'>{task.title}</td>
                    <td className='task-table__cell'>{task.status}</td>
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
              </tr>
            </thead>
            <tbody>
              {tasksByMood.map((taskByMood) => (
                <tr key={taskByMood._id}>
                  <td className='task-table__cell'>{taskByMood.title}</td>
                  <td className='task-table__cell'>{taskByMood.status}</td>
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
