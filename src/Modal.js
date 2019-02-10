import React from "react";
import ListResult from "./ListResult";
import "./modal.css";

function Modal(props) {
  const handleClose = props.handleClose;
  let show = props.show;
  const habits = props.data;

  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        <ul>
          <ListResult habits={habits} />
        </ul>
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
}

export default Modal;
