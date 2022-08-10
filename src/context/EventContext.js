import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const EventsContext = createContext();

export const eventsReducer = (state, action) => {
  console.log({ state, action });
  switch (action.type) {
    case "SET_EVENTS":
      // if (state.event.user_id === state.user._id) {
      if (true) {
        return {
          events: action.payload,
        };
      } else {
        alert("you need to be the event creator to do that.");
        return state;
      }
    case "CREATE_EVENT":
      // if (state.event.user_id === state.user._id) {
      if (true) {
        return {
          events: [action.payload, ...state.events],
        };
      } else {
        alert("you need to be the event creator to do that.");
        return state;
      }
    case "DELETE_EVENT":
      // if (state.event.user_id === state.user._id) {
      if (true) {
        return {
          events: state.events.filter((w) => w._id !== action.payload._id),
        };
      } else {
        alert("you need to be the event creator to do that.");
        return state;
      }
    default:
      return state;
  }
};

export const EventsContextProvider = ({ children }) => {
  console.log("test");
  const [state, dispatch] = useReducer(eventsReducer, {
    events: null,
  });
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      console.log({ user });

      const options = {};
      if (user?.token)
        options.headers = { Authorization: `Bearer ${user.token}` };

      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/events`,
        options
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EVENTS", payload: json });
        console.log("STUFF IS OKAY", response, json);
      } else {
        console.log("STUFF IS NOT OKAY", response, json);
      }
    };

    fetchEvents();
  }, [dispatch, user]);

  return (
    <EventsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
};
