import React from "react";

function toMinutes(time) {
  const str = time.split(":");
  const h = parseInt(str[0], 10);
  const m = parseInt(str[1], 10);
  return h * 60 + m;
}

function ListResult(props) {
  const habits = props.habits;

  habits.sort((a, b) => {
    a = toMinutes(a.totalTime);
    b = toMinutes(b.totalTime);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  const list = habits.map(item => {
    const key = habits.indexOf(item);
    return <li key={key}>{item.name + " " + item.totalTime}</li>;
  });
  return list;
}

export default ListResult;
