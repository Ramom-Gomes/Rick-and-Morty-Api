import { useEffect, useState } from 'react';
import {RickandMorty, Next} from './types/RickandMorty';

function App() {
  let [Pessoas, SetPessoas] = useState<RickandMorty[]>([]);
  let [Next,SetNext] = useState<Next>([]);

  const initialUrl = "https://rickandmortyapi.com/api/character";

  const Load = async(Url) => {
    let resposta = await fetch(Url);
    let json = await resposta.json();
    SetPessoas(json.results);
    SetNext(json.info)
    console.log(Next)
  }

  const LoadNext = () => {
    Load(Next.next)
  } 

  const LoadPrev = () => {
    Load(Next.prev)
  } 

  useEffect(() => {
    Load(initialUrl);
  }, [])

  return (
    <div>
      <button onClick={LoadPrev}>prev</button>
      <button onClick={LoadNext}>next</button>
      {Pessoas.map((item, index) => (
        <div key={index}>
          <div>
            <img src={item.image} />
            <div>{item.name}</div>
            <div>{item.species}</div>
            <div>{item.status}</div>
            <div>{item.location.name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
