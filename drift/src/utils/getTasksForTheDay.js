import dayjs from 'dayjs';

export function getTasksForToday(tasks) {
  const today = dayjs();
  const dayOfWeek = today.day();
  const startOfYear = dayjs().startOf('year');
  const weekNumber = Math.floor(today.diff(startOfYear, 'day') / 7) + 1;

  return tasks.filter(task => {
    switch (task.frequency?.mode) {
      case "diaria":
        return true;

      case "diaria com exceção":
        return !task.exceptDays?.includes(dayOfWeek);

      case "semanal":
        return task.daysOfWeek?.includes(dayOfWeek);

      case "quinzenal":
        return weekNumber % 2 === 0 && task.daysOfWeek?.includes(dayOfWeek);

      case "data fixa":
        return dayjs(task.frequency?.dueDate).isSame(today, 'day');

      case "ideia":
        return false;

      default:
        return false;
    }
  });
}
