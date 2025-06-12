import  { useCallback, useEffect, useState } from "react";

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

  useEffect(() => {
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
      { id: 12, name: "6", status: false },     { id: 13, name: "7", status: false },
    { id: 14, name: "7", status: false },
    ];

    const shuffled = shuffleArray(initialCards);
    setCards(shuffled);
  }, []);

  const cardF = useCallback(
    (index) => {
      if (firstNumber === null) {
        setFirstNumber(index);
      } else if (secondNumber === null && index !== firstNumber) {
        setSecondNumber(index);
      }
    },
    [firstNumber, secondNumber]
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
const handleRestart = () => {
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
  const shuffled = shuffleArray(initialCards);
  setCards(shuffled);
  setFirstNumber(null);
  setSecondNumber(null);
};
  return (
    <div className="centered-container container mx-auto row">
        <div className="text-center">
  <button onClick={handleRestart} className="btn btn-primary my-3">
    Resart
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

          }}
        >
          {card.status || index === firstNumber || index === secondNumber
            ? card.name
            : <h1>?</h1>}
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
