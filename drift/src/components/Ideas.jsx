import { useEffect } from "react";

function Ideas({getIdeas, ideas}) {

    useEffect(()=>{
       getIdeas();
    }, []);

    return(
    <section>
        {ideas && ideas.length > 0 ? (
        <table className='task-table'>
          <thead>
            <tr>
              <th className='task-table__cell'>Título</th>
            </tr>
          </thead>
          <tbody>
            {ideas.map((idea) => (
              <tr key={idea._id}>
                <td className='task-table__cell'>{idea.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='task-table__message'>Ainda não existem idéias registradas</p>
      )}
      
    </section>
    );
}

export default Ideas;