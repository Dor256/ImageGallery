import React from "react";
import { ImageResult } from "../../models/UnsplashResponse";
import Modal from "../Modal";
import ImageCard from "./ImageCard";

type Props = {
    images: ImageResult[]
}

type State = {
    chosenImage: string,
    chosenIndex: number | null,
    showModal: boolean,
    imageArray: ImageResult[]
}


class ImageList extends React.Component<Props, State> {
    private documentBody = document.body;
    state: State = { 
        chosenImage: "", 
        chosenIndex: null, 
        showModal: false,
        imageArray: this.props.images 
    };

    

    enlargeImage = (url: string, index: number) => {
        if(this.documentBody) {
            this.setState({ chosenImage: url, chosenIndex: index, showModal: true });
            this.documentBody.classList.add("no-scroll");
        }
    }

    closeImage = () => {
        if(this.documentBody) {
            this.setState({ showModal: false });
            this.documentBody.classList.remove("no-scroll");
        }
    }

    resetImage = () => {
        this.setState({ chosenImage: "" });
    }

    nextImage = () => {
        if(this.state.chosenIndex !== null && this.state.chosenIndex < this.props.images.length - 1) {
            const nextImageURL = this.props.images[this.state.chosenIndex + 1].urls.regular;
            this.setState({ chosenImage: nextImageURL, chosenIndex: this.state.chosenIndex + 1 });
        }
    }

    previousImage = () => {
        if(this.state.chosenIndex !== null && this.state.chosenIndex! > 0) {
            const previousImageURL = this.props.images[this.state.chosenIndex - 1].urls.regular;
            this.setState({ chosenImage: previousImageURL, chosenIndex: this.state.chosenIndex - 1 });
        }
    }

    swapImages = (originalIdx: number, newIdx: number) => {
        const temp = this.props.images[originalIdx];
        this.props.images[originalIdx] = this.props.images[newIdx];
        this.props.images[newIdx] = temp;
        this.setState({ imageArray: this.props.images });
    }

    render() {
        return (
            <>
                {this.props.images.map((image: ImageResult, index: number) => {
                    return (
                        <ImageCard 
                            key={image.id}
                            index={index}
                            thumbnailURL={image.urls.thumb}
                            imageURL={image.urls.regular}
                            enlargeImage={this.enlargeImage}
                            swapImages={this.swapImages}
                        />
                    );
                })}
                <Modal 
                    image={this.state.chosenImage} 
                    imageIndex={this.state.chosenIndex} 
                    resetImage={this.resetImage}
                    nextImage={this.nextImage}
                    previousImage={this.previousImage}
                    closeModal={this.closeImage}
                    show={this.state.showModal}
                />
            </>
        );
    }
}

export default ImageList;