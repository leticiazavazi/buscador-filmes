import { useState } from "react";
import "./index.css";

const API_KEY = "9ef53148"; 

function App() {
  const [busca, setBusca] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function buscarFilmes() {
    if (!busca.trim()) return;

    setCarregando(true);
    setErro("");
    setFilmes([]);

    try {
      const resposta = await fetch(
        `https://www.omdbapi.com/?s=${busca}&apikey=${API_KEY}`
      );
      const dados = await resposta.json();

      if (dados.Response === "True") {
        setFilmes(dados.Search);
      } else {
        setErro("Nenhum filme encontrado. Tente outro nome.");
      }
    } catch (e) {
      setErro("Erro ao buscar filmes. Tente novamente.");
    }

    setCarregando(false);
  }

  function handleTecla(e) {
    if (e.key === "Enter") buscarFilmes();
  }

  return (
    <div className="container">
      <h1>🎬 Buscador de Filmes</h1>

      <div className="busca">
        <input
          type="text"
          placeholder="Digite o nome de um filme..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={handleTecla}
        />
        <button onClick={buscarFilmes}>Buscar</button>
      </div>

      {carregando && <p className="carregando">Buscando filmes...</p>}
      {erro && <p className="erro">{erro}</p>}

      <div className="filmes">
        {filmes.map((filme) => (
          <div key={filme.imdbID} className="card">
            <img
              src={
                filme.Poster !== "N/A"
                  ? filme.Poster
                  : "https://via.placeholder.com/180x260?text=Sem+imagem"
              }
              alt={filme.Title}
            />
            <div className="card-info">
              <h3>{filme.Title}</h3>
              <p>{filme.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;