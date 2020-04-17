import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repositories, setRepositories ] = useState([]);

  useEffect(() => { 
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: 'Teste 1'
    };

    api.post('/repositories', repository).then((response) => { 
      setRepositories([...repositories, response.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((response) => { 
      const _repositories = repositories.filter(r => r.id !== id);
      setRepositories(_repositories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
