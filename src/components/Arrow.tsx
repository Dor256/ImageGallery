import React, { MouseEvent } from "react";

type Props = {
    right?: boolean,
    left?: boolean,
    nextImage?: () => void,
    previousImage?: () => void
}

const Arrow = (props: Props) => {
    const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        if(props.nextImage && !props.previousImage) {
            props.nextImage();
        } else if(props.previousImage && !props.nextImage) {
            props.previousImage();
        }
    }

    const orientation = props.right ? "right" : "left";
    return <i className={`fas fa-angle-${orientation} arrow`} onClick={handleClick}></i>;
}

export default Arrow;