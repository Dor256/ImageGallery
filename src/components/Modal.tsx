import React, { MouseEvent } from "react";
import ReactDOM from "react-dom";
import Arrow from "./Arrow";
import "./Modal.scss";

type Props = {
    image: string,
    imageIndex: number | null,
    resetImage: () => void,
    nextImage: () => void,
    previousImage: () => void
}

const Modal = (props: Props) => {
    const closeModal = (event: MouseEvent<HTMLDivElement>) => {
        event.currentTarget.classList.remove("show");
        document.querySelector("body")!.classList.remove("no-scroll");
        props.resetImage();
    }

    const handlePropagation = (event: MouseEvent<HTMLImageElement>) => {
        event.stopPropagation();
    }

    return ReactDOM.createPortal(
        <div className="modal" onClick={closeModal}>
            <img src={props.image} className="modal-image" alt="" onClick={handlePropagation}/>
            <Arrow right nextImage={props.nextImage}/>
            <Arrow left previousImage={props.previousImage}/>
        </div>,
        document.querySelector("#modal")!
    );
}

export default Modal;