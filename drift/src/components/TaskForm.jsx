import { useState } from "react";
import Validator from './Validator';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskForm({handleCreateTask}) {
  const [title, setTitle] = useState("");
  const [repeatMode, setRepeatMode] = useState("diaria");
  const [isMandatory, setIsMandatory] = useState(true);
  const [moodTag, setMoodTag] = useState("good");
  const [exceptDays, setExceptDays] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [fixedDate, setFixedDate] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const repeatData = {
      mode: repeatMode,
      exceptDays: repeatMode === "diaria com exceção" ? exceptDays : [],
      dayOfWeek: ["semanal", "quinzenal"].includes(repeatMode)
        ? dayOfWeek
        : null,
      dueDate: ["data fixa", "data fixa adiavel"].includes(repeatMode)
        ? fixedDate
        : null,
    };

    await handleCreateTask({title, frequency: repeatData, isMandatory, moodTag});
    
    toast.success("Tarefa criada com sucesso", { autoClose: 3000 });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
     <legend className='form__title'>Criar Tarefa</legend>

      <input 
        type="text" 
        placeholder='Título'
        className='form__input'
        name='title'
        value={title} 
        onChange={(e) => {
            setTitle(e.target.value);
            setErrorMessage(e.target.validationMessage);
            setIsValid(e.target.checkValidity());
        }}
        required
        minLength={5}
        maxLength={50}
        pattern="^[^\d]*$"
      />
      {!isValid && <Validator message={errorMessage} />}


      <label className="form__label">Repetição</label>
      <select
        className="form__input"
        value={repeatMode}
        onChange={(e) => setRepeatMode(e.target.value)}
      >
        <option value="diaria">Diária</option>
        <option value="diaria com exceção">Diária (exceto...)</option>
        <option value="semanal">Semanal</option>
        <option value="quinzenal">Quinzenal</option>
        <option value="data fixa">Fixa</option>
        <option value="data fixa adiavel">Fixa Adiável</option>
      </select>

        <label className="form__label">Tarefa obrigatória?</label>
            <select
              className="form__input"
              name="isMandatory"
              value={isMandatory}
              onChange={(e)=>setIsMandatory(e.target.value)}
            >
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
            </select>

        <label className="form__label">Humor</label>
            <select
              className="form__input"
              name="moodTag"
              value={moodTag}
              onChange={(e)=>setMoodTag(e.target.value)}
            >
              <option value="good">Motivado</option>
              <option value="bad">Desmotivado</option>
            </select>  

      {repeatMode === "diaria com exceção" && (
        <div>
          <label className="form__label">Dias a ignorar:</label>
          {[0, 1, 2, 3, 4, 5, 6].map((d) => (
            <label key={d}>
              <input
                type="checkbox"
                className="form__checkbox"
                value={d}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setExceptDays((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  );
                }}
              />
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][d]}
            </label>
          ))}
        </div>
      )}

      {["semanal", "quinzenal"].includes(repeatMode) && (
        <div>
          <label className="form__label">Dia da semana:</label>
          <select className="form__input" onChange={(e) => setDayOfWeek(Number(e.target.value))}>
            <option value="">Selecione</option>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
              (day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {["data fixa", "data fixa adiavel"].includes(repeatMode) && (
        <div>
          <label className="form__label">Data:</label>
          <input
            className="form__input"
            type="date"
            value={fixedDate}
            onChange={(e) => {
                setFixedDate(e.target.value);
                setErrorMessage(e.target.validationMessage);
                setIsValid(e.target.checkValidity());
            }}
            required
          />
          {!isValid && <Validator message={errorMessage} />}
        </div>
      )}

      <button type="submit" className="form__button">Criar</button>

    </form>
  );
}

export default TaskForm;