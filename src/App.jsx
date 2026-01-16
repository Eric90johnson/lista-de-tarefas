import { Plus } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className='container'>
      <h1>Minha Lista</h1>

      {/* Inputs para adicionar nova tarefa */}
      <div className='input-group'>
        <input type="text"  placeholder='Adicione uma nova tarefa'/>
        <button className='add-btn'>
          <Plus size={24} />    
        </button>
      </div>

      {/* Onde a lista vai aparecer depois */}
      <div className='tasks-list'>
        <p className='empty-states'>
          Você ainda não tem tarefas cadastradas.
          <br />
          Crie tarefas e orgazine seus itens a fazer.

        </p>

      </div>

    </div>
  )
}

export default App