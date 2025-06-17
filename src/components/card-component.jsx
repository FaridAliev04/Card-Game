import { useCallback, useEffect, useState } from "react";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const CardComponent = () => {
  const [cards, setCards] = useState([]);
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [time, setTime] = useState(0); 
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const initialCards = [
    { id: 1, name: "1", status: false },
    { id: 2, name: "1", status: false },
    { id: 3, name: "2", status: false },
    { id: 4, name: "2", status: false },
    { id: 5, name: "3", status: false },
    { id: 6, name: "3", status: false },
    { id: 7, name: "4", status: false },
    { id: 8, name: "4", status: false },
    { id: 9, name: "5", status: false },
    { id: 10, name: "5", status: false },
    { id: 11, name: "6", status: false },
    { id: 12, name: "6", status: false },
    { id: 13, name: "7", status: false },
    { id: 14, name: "7", status: false },
  ];

  useEffect(() => {
    const shuffled = shuffleArray(initialCards);
    setCards(shuffled);
  }, []);


  useEffect(() => {
    if (time >= 60) {
      setGameOver(true);
      return;
    }

    if (gameWon) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, gameWon]);

  const cardF = useCallback(
    (index) => {
      if (gameOver || gameWon) return;

      if (firstNumber === null) {
        setFirstNumber(index);
      } else if (secondNumber === null && index !== firstNumber) {
        setSecondNumber(index);
      }
    },
    [firstNumber, secondNumber, gameOver, gameWon]
  );

  useEffect(() => {
    if (firstNumber !== null && secondNumber !== null) {
      const firstCard = cards[firstNumber];
      const secondCard = cards[secondNumber];

      if (firstCard.name === secondCard.name) {
        const updatedCards = [...cards];
        updatedCards[firstNumber].status = true;
        updatedCards[secondNumber].status = true;
        setCards(updatedCards);
      }

      setTimeout(() => {
        setFirstNumber(null);
        setSecondNumber(null);
      }, 500);
    }
  }, [firstNumber, secondNumber, cards]);

  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every((card) => card.status);
    if (allMatched && !gameWon) {
      setGameWon(true);
    }
  }, [cards, gameWon]);

  const handleRestart = () => {
    const shuffled = shuffleArray(initialCards);
    setCards(shuffled);
    setFirstNumber(null);
    setSecondNumber(null);
    setTime(0); 
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="centered-container container mx-auto row">
      <div className="text-center">
        <h4>Time: {time} second</h4>
        {gameOver && !gameWon && <h2 style={{ color: "red" }}>Game over!</h2>}
        {gameWon && <h2 style={{ color: "green" }}>Winner: {time} second</h2>}
        <button onClick={handleRestart} className="btn btn-primary my-3">
          Restart
        </button>
      </div>
      {cards.map((card, index) => (
        <div
          key={card.id}
          onClick={() => cardF(index)}
          className="card col-4"
          style={{
            background:
              card.status || index === firstNumber || index === secondNumber
                ? "#fff"
                : "#4caf50",
            pointerEvents: gameOver || gameWon ? "none" : "auto",
          }}
        >
          {card.status || index === firstNumber || index === secondNumber ? (
            card.name
          ) : (
            <h1>?</h1>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
