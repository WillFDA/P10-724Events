import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";

import SlideCard from "../../components/SlideCard/SlideCard";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIndex((prevIndex) => prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0);
    }, 5000);
  
    // Fonction de nettoyage
    return () => {
      clearTimeout(timerId);
    };
  }, [index, byDateDesc]);


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <SlideCard
          key={event.title}
          event={event}
          index={index}
          idx={idx}
        />
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((radioEvent, radioIdx) => (
            <input
              key={`radio-${radioEvent.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Slider;
