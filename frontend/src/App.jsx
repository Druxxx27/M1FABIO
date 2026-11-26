import {useState, useEffect} from 'react'

import './App.css'

const API = "http://localhost:8000/api/series/";
const API_RESUMO = "http://localhost:8000/api/resumo/";


function App() {

  const [resumo, setResumo] = useState({ quantidade: 0, media: 0 });
  const [series, setSeries] = useState([]);
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [plataf, setPlataforma] = useState("");
  const [aval, setAvaliacao] = useState("");
  const [busca, setBusca] = useState("");
  
  function PuxarSerie() {
    fetch(API)
      .then((res) => res.json())
      .then((dados) => setSeries(dados));
  
  }
  function PuxarResumo() {
  fetch(API_RESUMO)
    .then((res) => res.json())
    .then((dados) => setResumo(dados));
}

  useEffect(() => {
    PuxarSerie();
    PuxarResumo();
  }, []);

const seriesfiltradas = series.filter((serie) =>
  serie.titulo.toLowerCase().includes(busca.toLowerCase())
);
  function cadastrar(evento){
    evento.preventDefault();
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, ano, plataf, aval })
    })
    .then((res) => res.json())
    .then((dados) => {
      setSeries([...series, dados]);
      setNome("");
      setAno("");
      setPlataforma("");
      setAvaliacao("");
      PuxarSerie();
      PuxarResumo();
    });

  }
  return (
    <div className="App">
      <h1>MINHAS SERIES FAVORITAS</h1>
      <div className="formulario">
        <form onSubmit={cadastrar}>
          <input placeholder="Nome" value={nome} onChange={(evento) => setNome(evento.target.value)} required />
          <input placeholder="Ano" type="date"value={ano} min="1900-01-01" max="2026-12-31" onChange={(evento) => setAno(evento.target.value)} required />
          <input placeholder="Plataforma" value={plataf} onChange={(evento) => setPlataforma(evento.target.value)} required />
          <input placeholder="Avaliação" type="number" value={aval} min="0" max="10" onChange={(evento) => setAvaliacao(evento.target.value)} required />
          <button type="submit">SALVAR</button>
        </form>
      </div>
      <h2>SERIES FAVORITAS:</h2>

      <div className="Busca">
        <input placeholder='Search' value={busca} onChange={(evento) => setBusca(evento.target.value)} />
      </div>

      <ul>
        {seriesfiltradas.map((serie) => (
          <li key={serie.id}>
            {serie.titulo} - {serie.ano} - {serie.plataforma} - {serie.avaliacao}
          </li>
        ))}
      </ul>


      <h2>RESUMO:</h2>
      <p>Quantidade de séries: {resumo.quantidade}</p>
      <p>Média das notas: {resumo.media}</p>

    </div>
    

  )
}

export default App