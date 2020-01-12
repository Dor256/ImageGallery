import React, { MouseEvent } from "react";
import ReactDOM from "react-dom";
import { Arrow } from "./Arrow";
import "./Modal.scss";

type Props = {
    image: string | null,
    imageIndex: number | null,
    resetImage: () => void,
    nextImage: () => void,
    previousImage: () => void,
    closeModal: () => void,
}

const handlePropagation = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
}

export const Modal = (props: Props) => {
    const maybeRenderImage = () => {
        if(props.image) {
            return <img src={props.image} className="modal-image" alt="" onClick={handlePropagation}/>;
        }
        return null;
    }

    return ReactDOM.createPortal(
        <div className="modal" onClick={props.closeModal}>
            {maybeRenderImage()}
            <Arrow right nextImage={props.nextImage}/>
            <Arrow left previousImage={props.previousImage}/>
            <i className="fas fa-times close-button" onClick={props.closeModal}></i>
        </div>,
        document.querySelector("#modal")!
    );
}