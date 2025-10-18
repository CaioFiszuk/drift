import '../styles/task-table.css';

function AllTasks({tasks}) {
    return(
        <div>
        {tasks && tasks.length > 0 ? (
        <table className='task-table'>
          <thead>
            <tr>
              <th className='task-table__cell'>Título</th>
              <th className='task-table__cell'>Tipo de tarefa</th>
              <th className='task-table__cell'>Frequência</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className='task-table__cell'>{task.title}</td>
                <td className='task-table__cell'>{task.type}</td>
                <td className='task-table__cell'>{task.repeat.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='task-table__message'>Ainda não existem tarefas registradas</p>
      )}
        </div>
    );
}

export default AllTasks;