import axios from "axios";
const { useState, useEffect } = require("react");

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  const updateSpots = function () {
    axios.get("/api/days/").then((response) => {
      setState((prev) => ({ ...prev, days: response.data }));
    });
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() =>
        setState({
          ...state,
          appointments,
        })
      )
      .then(() => updateSpots());
  };

  const cancelInterview = function (id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const nullAppointment = {
          ...state.appointments[id],
          interview: null,
        };
        const appointments = {
          ...state.appointments,
          [id]: nullAppointment,
        };
      })
      .then(() => updateSpots());
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
