import React from 'react';
import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

function Home() {
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [deck, setDeck] = useState([
    { id: 1, name: 'Ganon', image: '/ganon.svg' },
    { id: 2, name: 'Ganon', image: '/ganon.svg' },
    { id: 3, name: 'Link', image: '/link.svg' },
    { id: 4, name: 'Link', image: 'link.svg' },
    { id: 5, name: 'Lovers', image: '/lovers.svg' },
    { id: 6, name: 'Lovers', image: '/lovers.svg' },
    { id: 7, name: 'Magician', image: '/magician.svg' },
    { id: 8, name: 'Magician', image: '/magician.svg' },
    { id: 9, name: 'Moon', image: '/moon.svg' },
    { id: 10, name: 'Moon', image: '/moon.svg' },
    { id: 11, name: 'Piaf', image: '/piaf.svg' },
    { id: 12, name: 'Piaf', image: '/piaf.svg' },
    { id: 13, name: 'Zelda', image: '/zelda.svg' },
    { id: 14, name: 'Zelda', image: '/zelda.svg' },
    { id: 15, name: 'Zora', image: '/zora.svg' },
    { id: 16, name: 'Zora', image: '/zora.svg' },
  ]);

  const [pairsFound, setPairsFound] = useState(0);
  const totalPairs = deck.length / 2;
  const [moves, setMoves] = useState(0); // État pour suivre le nombre de mouvements
  const [congratulationsDisplayed, setCongratulationsDisplayed] = useState(false);

  const shuffleDeck = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
  };

  useEffect(() => {
    shuffleDeck();
  }, []);

  const selectCard = (id) => {
    if (matched.includes(id)) {
      // If the card is already matched, do nothing
      return;
    }

    setSelected([...selected, id]);

    if (selected.length === 1) {
      const firstCard = deck.find(card => card.id === selected[0]);
      const secondCard = deck.find(card => card.id === id);

      if (firstCard.name === secondCard.name) {
        // If the cards match, update matched and reset selected
        setMatched([...matched, selected[0], id]);
        setSelected([]);
        setMoves(moves+1);
      } else {
        // If the cards don't match, reset selected after a delay
        setTimeout(() => {
          setSelected([]);
        }, 1000);
        setMoves(moves+1);
      }
    }
  };

  useEffect(() => {
    if (!congratulationsDisplayed && matched.length === deck.length) {
      // All pairs have been found, delay the congratulations message to give time for cards to flip
      setTimeout(() => {
        alert(`Congratulations! You've matched all the pairs with ${moves} moves!`);
        setCongratulationsDisplayed(true);
      }, 1000); // Adjust the delay time as needed
    }
  }, [matched, deck]);


  const restartGame = () => {
    // Réinitialiser les états
    setSelected([]);
    setMatched([]);
    setPairsFound(0);
    setMoves(0);
    setCongratulationsDisplayed(false);

    // Mélanger à nouveau le deck de cartes
    shuffleDeck();
  };

  const cardsToDisplay = deck.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={selected.includes(card.id) || matched.includes(card.id)}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Zelda Memory Game
        </h1>
        <div className={styles.headerDivider} />
        <button className={styles.button} onClick={restartGame}>New Game</button>
        <div className={styles.moves}>Moves: {moves}</div> {/* Afficher le nombre de mouvements */}
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;

