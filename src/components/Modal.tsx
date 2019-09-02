import React, { MouseEvent } from "react";
import ReactDOM from "react-dom";
import Arrow from "./Arrow";
import "./Modal.scss";

type Props = {
    image: string,
    imageIndex: number | null,
    resetImage: () => void,
    nextImage: () => void,
    previousImage: () => void,
    closeModal: () => void,
    show: boolean
}

const Modal = (props: Props) => {
    const handlePropagation = (event: MouseEvent<HTMLImageElement>) => {
        event.stopPropagation();
    }

    const renderModal = () => {
        const showModalClass = props.show ? "show" : "";
        return (
            <div className={`modal ${showModalClass}`} onClick={props.closeModal}>
                <img src={props.image} className="modal-image" alt="" onClick={handlePropagation}/>
                <Arrow right nextImage={props.nextImage}/>
                <Arrow left previousImage={props.previousImage}/>
                <i className="fas fa-times close-button" onClick={props.closeModal}></i>
            </div>
        );
    }

    return ReactDOM.createPortal(
        renderModal(),
        document.querySelector("#modal")!
    );
}

export default Modal;