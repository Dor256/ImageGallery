import React, { DragEvent, createRef } from "react";
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
    private cardRef = createRef<HTMLDivElement>();
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

    cardInbounds = (): boolean => {
        if(this.cardRef.current) {
            const cardTop = this.cardRef.current.getBoundingClientRect().top;
            const cardBottom = this.cardRef.current.getBoundingClientRect().bottom;
            return cardBottom > -300 && cardTop < window.innerHeight + 300;
        }
        return true;
    }

    renderCardImage = () => {
        const hideImageClass = this.cardInbounds() ? "" : "hide-image";
        const flipImageClass = this.state.isFlipped ? "flipped" : "";
        return (
            <>
                <img className={`card-img-top ${flipImageClass} ${hideImageClass}`} src={this.props.thumbnailURL} alt=""/>
                <div className={`overlay ${hideImageClass}`}>
                    <button className="expand image-button" onClick={this.handleExpand}><i className="fas fa-search-plus"></i></button>
                    <button className="flip image-button" onClick={this.handleRotation}><i className="fas fa-sync-alt"></i></button>
                    {this.renderLikeButton()}
                </div>
            </>
        );
    }

    renderLikeButton = () => {
        const likedImageClass = this.state.isLiked ? "liked" : "";
        return <button className={`like image-button ${likedImageClass}`} onClick={this.handleLike}><i className="fas fa-heart"></i></button>;
    }

    renderCard = () => {
        const dragImageClass = this.state.isDragging ? "dragging" : "";
        return (
            <div 
                className={`card ${dragImageClass}`} 
                ref={this.cardRef}
                draggable
                onDragStart={this.handleDragStart} 
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}  
                onDragEnd={this.handleDragEnd}
            >
                {this.renderCardImage()}
            </div>
        );
    }

    render() {
        return this.renderCard();
    }
}

export default ImageCard;