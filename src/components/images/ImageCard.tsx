import React, { DragEvent } from "react";
import "./ImageCard.scss";

type Props = {
    thumbnailURL: string,
    imageURL: string,
    index: number,
    enlargeImage: (url: string, index: number) => void,
    swapImages: (originalIdx: number, newIdx: number) => void
}

type State = {
    isLiked: boolean,
    isFlipped: boolean,
    isDragging: boolean
}

class ImageCard extends React.Component<Props, State> {
    state = { 
        isLiked: false, 
        isFlipped: false, 
        isDragging: false
     };

    handleExpand = () => {
        this.props.enlargeImage(this.props.imageURL, this.props.index);
    }

    handleLike = () => {
        this.state.isLiked ? this.setState({ isLiked: false }) : this.setState({ isLiked: true });
    }

    handleRotation = () => {
        this.state.isFlipped ? this.setState({ isFlipped: false }) : this.setState({ isFlipped: true });
    }

    handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("number", this.props.index.toString());
        event.dataTransfer.effectAllowed = "copyMove";
        this.setState({ isDragging: true });
    }

    handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    }


    handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.setState({ isDragging: false });
        const newIdx = parseInt(event.dataTransfer.getData("number"));
        this.props.swapImages(this.props.index, newIdx);
    }

    handleDragEnd = () => {
        this.setState({ isDragging: false });
    }

    renderCard = () => {
        const dragImageClass = this.state.isDragging ? "dragging" : "";
        return (
            <div 
                className={`card ${dragImageClass}`} 
                draggable
                onDragStart={this.handleDragStart} 
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}  
                onDragEnd={this.handleDragEnd}
            >
                {this.renderCardImage()}
                <div className="overlay">
                    <button className="expand image-button" onClick={this.handleExpand}><i className="fas fa-search-plus"></i></button>
                    <button className="flip image-button" onClick={this.handleRotation}><i className="fas fa-sync-alt"></i></button>
                    {this.renderLikeButton()}
                </div>
            </div>
        );
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
        return this.renderCard();
    }
}

export default ImageCard;