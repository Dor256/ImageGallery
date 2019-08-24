import React from "react";
import { ImageResult } from "../../models/UnsplashResponse";
import Modal from "../Modal";
import ImageCard from "./ImageCard";
import "./ImageList.scss";

type Props = {
    images: ImageResult[]
}


class ImageList extends React.Component<Props> {
    state = { chosenImage: "" };

    enlargeImage = (url: string) => {
        document.querySelector(".modal")!.classList.add("show");
        document.querySelector("body")!.classList.add("no-scroll");
        this.setState({ chosenImage: url });
    }

    render() {
        return (
            <>
                {this.props.images.map((image: ImageResult) => {
                    return (
                        <ImageCard 
                            key={image.id}
                            thumbnailURL={image.urls.thumb}
                            imageURL={image.urls.regular}
                            enlargeImage={this.enlargeImage}
                        />
                    );
                })}
                <Modal image={this.state.chosenImage}/>
            </>
        );
    }
}

export default ImageList;