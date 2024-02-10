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
    if (selected.length === 2) {
      // If two cards are already selected, do nothing
      return;
    }

setSelected([...selected, id]);
if (selected.length === 1) {
  // If it's the second card, check for a match
  if (deck.find(card => card.id === selected[0]).name === deck.find(card => card.id === id).name) {
    setMatched([...matched, selected[0], id]);
  }
  // Clear selected after a short delay
  setTimeout(() => {
    setSelected([]);
  }, 1000);
}
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

