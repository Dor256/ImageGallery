import React from "react";
import "./ImageCard.scss";

type Props = {
    thumbnailURL: string,
    imageURL: string,
    index: number,
    enlargeImage: (url: string, index: number) => void;
}

const ImageCard = (props: Props) => {
    const handleClick = () => {
        props.enlargeImage(props.imageURL, props.index);
    }

    return (
        <div className="card">
            <img className="card-img-top" src={props.thumbnailURL} alt=""/>
            <div className="layout" onClick={handleClick}>
                <button className="expand"><i className="fas fa-search-plus"></i></button>
            </div>
        </div>
    );
}

export default ImageCard;