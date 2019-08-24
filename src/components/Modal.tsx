import React, { MouseEvent } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

type Props = {
    image: string
}

const Modal = (props: Props) => {
    const closeModal = (event: MouseEvent<HTMLDivElement>) => {
        event.currentTarget.classList.remove("show");
        document.querySelector("body")!.classList.remove("no-scroll");
    }

    const handlePropagation = (event: MouseEvent<HTMLImageElement>) => {
        event.stopPropagation();
    }

    return ReactDOM.createPortal(
        <div className="modal" onClick={closeModal}>
            <img src={props.image} className="modal-image" alt="" onClick={handlePropagation}/>
        </div>,
        document.querySelector("#modal")!
    );
}

export default Modal;