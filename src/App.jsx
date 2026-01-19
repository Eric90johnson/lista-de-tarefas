import { useState } from 'react';
import { Plus, Trash, Check } from 'lucide-react';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

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

  // --- NOVA FUNÇÃO 1: Marcar como feita ---
  function handleToggleTask(id) {
    const newTasks = tasks.map(task => {
      // Se for a tarefa que clicamos...
      if (task.id === id) {
        // ...retorna ela com o "isCompleted" invertido
        return { ...task, isCompleted: !task.isCompleted }
      }
      // Se não for, retorna igual estava
      return task;
    });

    setTasks(newTasks);
  }

  // --- NOVA FUNÇÃO 2: Deletar ---
  function handleRemoveTask(id) {
    // Filtra a lista: Mantém todas que tiverem ID DIFERENTE do que clicamos
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
              
              {/* O texto ganha uma classe extra se estiver concluído */}
              <span className={task.isCompleted ? "text-completed" : ""}>
                {task.title}
              </span>

              <div className="actions">
                {/* Botão de Concluir */}
                <button 
                  className="check-btn" 
                  onClick={() => handleToggleTask(task.id)}
                >
                  <Check size={20} />
                </button>

                {/* Botão de Deletar */}
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