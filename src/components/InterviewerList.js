import React from "react";
import InterviewerListItem from "components/InterviewerListItem"

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {console.log("interviewer", props.interviewers)}
        {console.log("props", props)}
        {props.interviewers.map(interviewer => (
          <InterviewerListItem
            id={interviewer.id}
            name = {interviewer.name}
            avatar = {interviewer.avatar}
            selected = {interviewer.id === props.value}
            setInterviewer = {() => props.onChange(interviewer.id)}
          />
        ))}
      </ul>
    </section>
  );
}