import React from "react";
import { ImageResult } from "../../models/UnsplashResponse";
import Modal from "../Modal";
import ImageCard from "./ImageCard";

type Props = {
    images: ImageResult[]
}

type State = {
    chosenImage: string,
    index: number | null,
    showModal: boolean
}


class ImageList extends React.Component<Props, State> {
    private documentBody = document.body;
    state: State = { chosenImage: "", index: null, showModal: false };

    enlargeImage = (url: string, index: number) => {
        if(this.documentBody) {
            this.setState({ chosenImage: url, index: index, showModal: true });
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
        if(this.state.index !== null && this.state.index < this.props.images.length - 1) {
            const nextImageURL = this.props.images[this.state.index + 1].urls.regular;
            this.setState({ chosenImage: nextImageURL, index: this.state.index + 1 });
        }
    }

    previousImage = () => {
        if(this.state.index !== null && this.state.index! > 0) {
            const previousImageURL = this.props.images[this.state.index - 1].urls.regular;
            this.setState({ chosenImage: previousImageURL, index: this.state.index - 1 });
        }
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
                        />
                    );
                })}
                <Modal 
                    image={this.state.chosenImage} 
                    imageIndex={this.state.index} 
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