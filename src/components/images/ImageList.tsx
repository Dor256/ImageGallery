import React from "react";
import { ImageResult } from "../../models/UnsplashResponse";
import Modal from "../Modal";
import ImageCard from "./ImageCard";

type Props = {
    images: ImageResult[]
}

type State = {
    chosenImage: string | null,
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

    componentDidMount = () => {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = (event: Event) => {
        event.preventDefault();
        this.setState(this.state);
    }

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
        this.setState({ chosenImage: null });
    }

    nextImage = () => {
        if(this.state.chosenIndex !== null && this.state.chosenIndex < this.state.imageArray.length - 1) {
            this.resetImage();
            const nextImageURL = this.state.imageArray[this.state.chosenIndex + 1].urls.regular;
            this.setState({ chosenImage: nextImageURL, chosenIndex: this.state.chosenIndex + 1 });
        }
    }

    previousImage = () => {
        if(this.state.chosenIndex !== null && this.state.chosenIndex! > 0) {
            this.resetImage();
            const previousImageURL = this.state.imageArray[this.state.chosenIndex - 1].urls.regular;
            this.setState({ chosenImage: previousImageURL, chosenIndex: this.state.chosenIndex - 1 });
        }
    }

    swapImages = (originalIdx: number, newIdx: number) => {
        const swappedImageArray = [...this.state.imageArray];
        const temp = swappedImageArray[originalIdx];
        swappedImageArray[originalIdx] = swappedImageArray[newIdx];
        swappedImageArray[newIdx] = temp;
        this.setState({ imageArray: swappedImageArray });
    }

    deleteImage = (indexToRemove: number) => {
        this.setState({ imageArray: this.state.imageArray.filter((image: ImageResult, index: number) => index !== indexToRemove)});
    }

    maybeRenderModal = () => {
        if(this.state.showModal) {
            return (
                <Modal 
                    image={this.state.chosenImage} 
                    imageIndex={this.state.chosenIndex} 
                    resetImage={this.resetImage}
                    nextImage={this.nextImage}
                    previousImage={this.previousImage}
                    closeModal={this.closeImage}
                />
            );
        } 
    }

    render() {
        return (
            <>
                {this.state.imageArray.map((image: ImageResult, index: number) => {
                    return (
                        <ImageCard 
                            key={image.id}
                            index={index}
                            thumbnailURL={image.urls.thumb}
                            imageURL={image.urls.regular}
                            enlargeImage={this.enlargeImage}
                            swapImages={this.swapImages}
                            deleteImage={this.deleteImage}
                        />
                    );
                })}
                {this.maybeRenderModal()}
            </>
        );
    }
}

export default ImageList;