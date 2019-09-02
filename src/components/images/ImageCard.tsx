import React from "react";
import "./ImageCard.scss";

type Props = {
    thumbnailURL: string,
    imageURL: string,
    index: number,
    enlargeImage: (url: string, index: number) => void;
}

type State = {
    isLiked: boolean,
    isFlipped: boolean
}

class ImageCard extends React.Component<Props, State> {
    state = { isLiked: false, isFlipped: false };

    handleExpand = () => {
        this.props.enlargeImage(this.props.imageURL, this.props.index);
    }

    handleLike = () => {
        this.state.isLiked ? this.setState({ isLiked: false }) : this.setState({ isLiked: true });
    }

    handleRotation = () => {
        this.state.isFlipped ? this.setState({ isFlipped: false }) : this.setState({ isFlipped: true });
    }

    renderCardImage = () => {
        const flipImageClass = this.state.isFlipped ? "flipped" : "";
        return <img className={`card-img-top ${flipImageClass}`} src={this.props.thumbnailURL} alt=""/>;
    }

    renderLikeButton = () => {
        const likedImageClass = this.state.isLiked ? "liked" : "";
        return <button className={`like image-button ${likedImageClass}`} onClick={this.handleLike}><i className="fas fa-heart"></i></button>;
    }

    render() {
        return (
            <div className="card">
                {this.renderCardImage()}
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