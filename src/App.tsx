import { useEffect, useState } from 'react';
import {RickandMorty, Next} from './types/RickandMorty';
import styles from './App.module.css';

function App() {
  let [Pessoas, SetPessoas] = useState<RickandMorty[]>([]);
  let [Next,SetNext] = useState<Next>([]);

  const initialUrl = "https://rickandmortyapi.com/api/character";

  const Load = async(Url) => {
    let resposta = await fetch(Url);
    let json = await resposta.json();
    SetPessoas(json.results);
    SetNext(json.info)
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
    <div className={styles.main}>
      <h1 className={styles.titulo}>RICK AND MORTY</h1>
      <div className={styles.botao}>
        <button className={styles.botao2} onClick={LoadPrev}>Voltar</button>
        <button className={styles.botao2} onClick={LoadNext}>Próximo</button>
      </div>
      <div className={styles.personagem}>
        {Pessoas.map((item, index) => (
          <div className={styles.personagem2} key={index}>
            <div className={styles.imagem}>
              <img src={item.image} height={250}/>
            </div>
            <div>
              <div className={styles.nome} >{item.name}</div>
              <div className={styles.status} >Status: {item.status}</div>
              <div className={styles.especie} >Especie: {item.species}</div>
              <div>
                <p className={styles.LocalInfo}>Ultimo locas visto:</p>
                <div className={styles.Local} >{item.location.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.botao3}>
        <button className={styles.botao2} onClick={LoadPrev}>Voltar</button>
        <button className={styles.botao2} onClick={LoadNext}>Próximo</button>
      </div>
    </div>
  )
}

export default App
