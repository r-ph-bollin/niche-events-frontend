import EventDetails from "./EventDetails";
import EventForm from "./EventForm";
import { useEventsContext } from "../hooks/useEventsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
// import { DateLocalizer } from "react-big-calendar";

export default function Editor() {
  const [events, setEvents] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/api/events/editor`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // below will automatcially refresh the editor page and load the new event list after it has been successfully delted from the database
  function handleEventDeletionFromForm(_id) {
    setEvents(events.filter((item) => item._id !== _id));
  }

  // below will automatcially refresh the editor page and load the new event list after it has been successfully submitted to the database
  function handleEventAdditionFromForm(event) {
    setEvents((p) => [event, ...p]);
  }

  return (
    <>
      {/* event form allows the entry of a new event and post it to db */}
      <EventForm handleEventAdditionFromForm={handleEventAdditionFromForm} />
      <br></br>
      <h3>Your Events:</h3>
      {/* below here it renders all events added by a particular logged in user */}
      <div className="events">
        {events.map((event) => (
          <EventDetails
            key={event._id}
            event={event}
            handleEventDeletionFromForm={handleEventDeletionFromForm}
          />
        ))}
      </div>
    </>
  );
}
