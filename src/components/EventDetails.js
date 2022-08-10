import { useEventsContext } from "../hooks/useEventsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const EventDetails = ({ event }) => {
  const { dispatch } = useEventsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/events/` + event._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_EVENT", payload: json });
    }
  };

  const eventDate = new Date(event.start_date);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const eventStartTime = new Date(event.start_date);
  const eventEndTime = new Date(event.end_date);
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <div className="event-details">
      <h4>{event.title}</h4>
      <p>{event.description}</p>
      <h5>
        {" "}
        <strong>Event Datum: {"\n"}</strong>
        {eventDate.toLocaleDateString("de-DE", dateOptions)}
      </h5>
      <p>
        <strong>
          Beginn der Show:{" "}
          {eventStartTime.toLocaleTimeString("de-DE", timeOptions)}
        </strong>
      </p>
      <p>
        <strong>
          Ungefähres Ende:{" "}
          {eventEndTime.toLocaleTimeString("de-DE", timeOptions)}
        </strong>
      </p>
      <h5>Adresse: </h5>
      <p>
        <strong>{event.address}</strong>
      </p>
      <p>
        {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default EventDetails;
