import React from "react";
import DayList from "./DayList";
import { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "components/helpers/selectors";

import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  let dailyAppointments = [];

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }))
  // };
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((response) => {

      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data}));

    });
  }, [])

  dailyAppointments = getAppointmentsForDay(state, state.day)

  // useEffect(() => {
  //   axios.get(`/api/appointments`).then(response => {
  //     setDays(response.data)
  //     })
  // }, [])

  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days} 
          value={state.day} 
          onChange={setDay} 
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      {dailyAppointments.map(appointment => (
          <Appointment
            key={appointment.id}
            {...appointment}
          />
        ))}
      </section>
    </main>
  );
}
