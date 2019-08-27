import React from "react";
import { ImageResult } from "../../models/UnsplashResponse";
import Modal from "../Modal";
import ImageCard from "./ImageCard";
import "./ImageList.scss";

type Props = {
    images: ImageResult[]
}

type State = {
    chosenImage: string,
    index: number | null
}


class ImageList extends React.Component<Props, State> {
    state: State = { chosenImage: "", index: null };

    enlargeImage = (url: string, index: number) => {
        this.setState({ chosenImage: url, index: index});
        document.querySelector(".modal")!.classList.add("show");
        document.querySelector("body")!.classList.add("no-scroll");
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
                />
            </>
        );
    }
}

export default ImageList;