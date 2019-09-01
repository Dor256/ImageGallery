import React, { createRef } from "react";
import "./ImageCard.scss";

type Props = {
    thumbnailURL: string,
    imageURL: string,
    index: number,
    enlargeImage: (url: string, index: number) => void;
}

type State = {
    isLiked: boolean
}

class ImageCard extends React.Component<Props, State> {
    private imgRef = createRef<HTMLImageElement>();
    state = { isLiked: false };

    handleExpand = () => {
        this.props.enlargeImage(this.props.imageURL, this.props.index);
    }

    handleLike = () => {
        this.state.isLiked ? this.setState({ isLiked: false }) : this.setState({ isLiked: true });
    }

    handleRotation = () => {
        if(this.imgRef.current) {
            this.imgRef.current.classList.toggle("flipped");
        }
    }

    renderLikeButton = () => {
        const likedClassName = this.state.isLiked ? "liked" : "";
        return <button className={`like image-button ${likedClassName}`} onClick={this.handleLike}><i className="fas fa-heart"></i></button>;
    }

    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={this.props.thumbnailURL} ref={this.imgRef} alt=""/>
                <div className="overlay">
                    <button className="expand image-button" onClick={this.handleExpand}><i className="fas fa-search-plus"></i></button>
                    <button className="flip image-button" onClick={this.handleRotation}><i className="fas fa-sync-alt"></i></button>
                    {this.renderLikeButton()}
                </div>
            </div>
        );
    }
}

export default ImageCard;