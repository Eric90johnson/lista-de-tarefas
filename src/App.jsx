import { useState } from 'react'; // 1. Importamos o "cerebro"
import { Plus, Trash, Check } from 'lucide-react'; // importando icones extras
import './App.css';

function App() {

  // Estado para guardar o que o usário está digitando AGORA
  const [newTask, setNewTask] = useState ('');

  // Estado para guardar a LISTA de tarefas ( começa vazia [])
  const [tasks, setTasks] = useState([]);

  function handleAddTask() {
    // 1. Validação: Se não digitou nada, não faz nada
    if (newTask === '') return;

    // 2. Criar o objeto da nova tarefa
    const newTaskItem = {
      id: Date.now(), // Gera um ID unico baseado no horário atual
      title: newTask,
      isCompleted: false // Começa como "não feita"
    };

    // 3. Atualizar a lista (imutabilidade)
    // "Copie tudo que já tem em tasks (...tasks) e adicione o novo item no final
    setTasks([...tasks, newTaskItem]);

    //4. Limpar o campo do texto para a propria tarefa
    setNewTask('');
  }

  return (
    <div className='container'>
      <h1>Minha Lista</h1>

      {/* Inputs para adicionar nova tarefa */}
      <div className='input-group'>
        <input 
            type="text"  
            placeholder='Adicione uma nova tarefa'
            // O valor do input é amarrado ao estado
            value={newTask}
            // Toda vex que digita, atualiza o estado
            onChange={(event) => setNewTask (event.target.value)} 
          />
        {/* Quando clica, chama a função de adicionar */}
        <button className='add-btn' onClick={handleAddTask}>
          <Plus size={24} />    
        </button>
      </div>

      {/* Onde a lista vai aparecer depois */}
      <div className='tasks-list'>
        {/* Lógica Visual:
            Se a lista estiver vazia (length === 0), mostra a mensgem.
            Se tiver itens, motra a lista.
        
        */}

        {tasks.length === 0 ? (
          <p className='empty-state'>
          Você ainda não tem tarefas cadastradas.        

          </p>      

        ) : (

          // Se tiver tarefas, mapeamos cada uma para criar um item na tela
          tasks.map((task) => (
            <div key={task.id} className='task-item'>
              <span>{task.title}</span>
            </div>
          ))          
        )}    

      </div>
    </div>
  )
}

export default App