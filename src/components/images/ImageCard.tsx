import React from "react";
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
    state = { isLiked: false };

    handleExpand = () => {
        this.props.enlargeImage(this.props.imageURL, this.props.index);
    }

    handleLike = () => {
        this.state.isLiked ? this.setState({ isLiked: false }) : this.setState({ isLiked: true });
    }

    renderLikeButton = () => {
        const likedClassName = this.state.isLiked ? "liked" : "";
        return <button className={`like image-button ${likedClassName}`} onClick={this.handleLike}><i className="fas fa-heart"></i></button>;
    }

    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={this.props.thumbnailURL} alt=""/>
                <div className="overlay">
                    <button className="expand image-button" onClick={this.handleExpand}><i className="fas fa-search-plus"></i></button>
                    {this.renderLikeButton()}
                </div>
            </div>
        );
    }
}

export default ImageCard;