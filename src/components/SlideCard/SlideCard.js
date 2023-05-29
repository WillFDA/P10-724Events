import PropTypes from 'prop-types';
import { getMonth } from "../../helpers/Date";

export default function SlideCard({ event, index, idx }) {
    SlideCard.propTypes = {
        event: PropTypes.shape({
          title: PropTypes.string.isRequired,
          cover: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }).isRequired,
        index: PropTypes.number.isRequired,
        idx: PropTypes.number.isRequired,
    };

    return (
      <div
        key={`slider-${event.title}`}
        className={`SlideCard SlideCard--${idx === index ? "display" : "hide"}`}
      >
        <img src={event.cover} alt="forum" />
        <div className="SlideCard__descriptionContainer">
          <div className="SlideCard__description">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <div>{getMonth(new Date(event.date))}</div>
          </div>
        </div>
      </div>
    );     
}
