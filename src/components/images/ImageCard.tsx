import React from "react";

type Props = {
    thumbnailURL: string,
    imageURL: string,
    enlargeImage: (url: string) => void;
}

const ImageCard = (props: Props) => {
    const handleClick = () => {
        props.enlargeImage(props.imageURL);
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