import { startSession } from "pg/lib/sasl";

export function getAppointmentsForDay(state, day) {
  const filteredNames = state.days.filter(xday => xday.name === day);
  if(filteredNames.length === 0) {
    return [];
  } else {
    return filteredNames[0].appointments.map(id => state.appointments[id]);
  }
}