import React, { useEffect, useState } from "react";
import { useEventsContext } from "../hooks/useEventsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
//import "react-datepicker/dist/react-datepicker-cssmodules.css";

////////////////////////
const EventForm = () => {
  const { dispatch } = useEventsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const event = { title, description, start_date, end_date, address };
    console.log(event);

    const response = await fetch(`${process.env.REACT_APP_HOST}/api/events`, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log(json);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setStart_date("");
      setEnd_date("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_EVENT", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Event</h3>
      <label>Event Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Event Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />
      <label>Start Date:</label>
      <input
        type="datetime-local"
        onChange={(e) => setStart_date(e.target.value)}
        value={start_date}
        className={emptyFields.includes("start_date") ? "error" : ""}
      />
      <label>End Date:</label>
      <input
        type="datetime-local"
        onChange={(e) => setEnd_date(e.target.value)}
        value={end_date}
        className={emptyFields.includes("end_date") ? "error" : ""}
      />
      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        className={emptyFields.includes("address") ? "error" : ""}
      />

      <button>Add Event</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EventForm;
