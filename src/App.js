import React from "react";
import { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  //proprierties:
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    })
  }, []);

  //functions:
  async function handleAddRepository() {
    const repository = await api.post("repositories", {
      "title" : `Novo projeto - ${Date.now()}`,
      "url" : "https://github.com/EduardoAmncio/desafio-conceitos-nodejs.git",
      "techs" : ["NodeJs", "Flutter"]
   })
    
    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    const index = repositories.findIndex(repo => (
      repo.id === id
    ));

    if (index >=0) {
      repositories.splice(index, 1);
      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}> 
            {repository.title} 
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
