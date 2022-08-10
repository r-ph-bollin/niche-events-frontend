import "../index.css";
import { useState, useEffect } from "react";

const timeOptions = {
  hour: "numeric",
  minute: "numeric",
};

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const DailyEventView = ({ offset = 0 }) => {
  const [eventsOfTheDay, setEventsOfTheDay] = useState([]);
  useEffect(() => {
    var date = new Date();
    date.setDate(date.getDate() + offset);
    // console.log({ date });
    //console.log(date);
    fetch(`${process.env.REACT_APP_HOST}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        //console.log("data coming in here...", data);
        setEventsOfTheDay(
          data.filter((event) => {
            // add 1 whole day in milliseconds
            //  console.log(new Date(event.start_date).getDate(), date.getDate);
            return new Date(event.start_date).getDate() === date.getDate();
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {eventsOfTheDay.length > 0 ? (
        <div>
          {eventsOfTheDay.map((x, i) => {
            return (
              <div key={i} className="event-details">
                <h4>{x.title}</h4>
                <p>{x.description}</p>
                <p>
                  <h5>
                    {new Date(x.start_date).toLocaleTimeString(
                      "de-DE",
                      dateOptions
                    )}
                  </h5>
                </p>
                <p>
                  <strong>
                    Beginn der Show:{" "}
                    {new Date(x.start_date).toLocaleTimeString(
                      "de-DE",
                      timeOptions
                    )}
                  </strong>
                </p>
                <p>
                  <strong>
                    Ungefähres Ende:{" "}
                    {new Date(x.end_date).toLocaleTimeString(
                      "de-DE",
                      timeOptions
                    )}
                  </strong>
                </p>
                <p>
                  <strong>{x.address}</strong>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default DailyEventView;
