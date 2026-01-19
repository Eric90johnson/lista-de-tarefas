import { useState, useEffect } from 'react'; // 1. Importamos useEffect
import { Plus, Trash, Check } from 'lucide-react';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState('');

  // 2. Estado Inteligente: Começa lendo do LocalStorage
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('minhas-tarefas');
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    return [];
  });

  // 3. O Vigia: Salva automaticamente sempre que a lista muda
  useEffect(() => {
    localStorage.setItem('minhas-tarefas', JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    if (newTask === '') return;

    const newTaskItem = {
      id: Date.now(),
      title: newTask,
      isCompleted: false
    };

    setTasks([...tasks, newTaskItem]);
    setNewTask('');
  }

  function handleToggleTask(id) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted }
      }
      return task;
    });
    setTasks(newTasks);
  }

  function handleRemoveTask(id) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <div className="container">
      <h1>Minha Lista</h1>

      <div className="input-group">
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa"
          value={newTask} 
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button className="add-btn" onClick={handleAddTask}>
          <Plus size={24} />
        </button>
      </div>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="empty-state">
            Você ainda não tem tarefas cadastradas.
          </p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <span className={task.isCompleted ? "text-completed" : ""}>
                {task.title}
              </span>

              <div className="actions">
                <button 
                  className="check-btn" 
                  onClick={() => handleToggleTask(task.id)}
                >
                  <Check size={20} />
                </button>

                <button 
                  className="delete-btn" 
                  onClick={() => handleRemoveTask(task.id)}
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App