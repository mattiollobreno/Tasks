
import { useState, useEffect } from 'react';
import Tasks from './Tasks.jsx';

function addOneDayToDate(date) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export default function SelectedProject({ project, onDeleteSelectedProject, onAddTask, onDeleteTask, tasks }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (project && project.dueDate) {
      const newDate = addOneDayToDate(project.dueDate);
      const formatted = formatDate(newDate);
      setFormattedDate(formatted);
    }
  }, [project]);



  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button onClick={onDeleteSelectedProject} className="text-stone-600 hover:text-stone-950">
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
      </header>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}