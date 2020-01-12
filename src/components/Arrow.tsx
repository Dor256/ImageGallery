import React, { MouseEvent } from "react";
import "./Arrow.scss";

type Props = {
    right?: boolean,
    left?: boolean,
    nextImage?: () => void,
    previousImage?: () => void
}

export const Arrow = (props: Props) => {
    const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        if(props.nextImage && !props.previousImage) {
            props.nextImage();
        } else if(props.previousImage && !props.nextImage) {
            props.previousImage();
        }
    }

    const orientation = props.right ? "right" : "left";
    return (
        <div className={`arrow arrow-${orientation}`} onClick={handleClick}>
            <i className={`fas fa-angle-${orientation}`}></i>
        </div>
    );
}