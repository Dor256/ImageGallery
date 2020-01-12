import React from "react";
import unsplash from "../api/unsplash";
import { UnsplashResponse, ImageResult } from "../models/UnsplashResponse";
import { SearchBar } from "./SearchBar";
import { ImageList } from "./images/ImageList";
import { Spinner } from "./Spinner";
import { IMAGES_PER_PAGE } from "../constants";
import "./App.scss"

type State = {
    images: ImageResult[] | null
}

export class App extends React.Component<{}, State> {
    state: State = { images: [] };

    onSearchSubmit = async (term: string) => {
        this.setState({ images: null });
        const response = await unsplash.get<UnsplashResponse>("/search/photos", {
            params: {
                query: term,
                per_page: IMAGES_PER_PAGE
            }
        });
        this.setState({ images: response.data.results })
    }

    render() {
        const { images } = this.state;
        return (
            <div className="flex-container">
                <SearchBar onSubmit={this.onSearchSubmit}/>
                {images ? <ImageList images={images} /> : <Spinner />}
            </div>
        );
    } 
}