import React from "react";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Status from "components/Appointment/Status"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING";
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((response) => {
        transition(SHOW, true)})
  }

  function destroy(event) {
    transition(DELETE, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back} onSave={save}/>)}  
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onCancel={back} onConfirm={() => {destroy(props.id)}} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save}/>}
    </article> 
  );
}
