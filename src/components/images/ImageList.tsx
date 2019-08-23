import React from "react";
import { ImageResult } from "../../models/UnsplashResponse";
import "./ImageList.scss";

type Props = {
    images: ImageResult[]
}

const ImageList = (props: Props) => {
    return (
        <>
            {props.images.map((image: ImageResult) => {
                return (
                    <div key={image.id} className="card">
                        <img className="card-img-top" src={image.urls.thumb} alt=""/>
                    </div>
                );
            })}
        </>
    );
}

export default ImageList;