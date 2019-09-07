import React from "react";
import unsplash from "../api/unsplash";
import { UnsplashResponse, ImageResult } from "../models/UnsplashResponse";
import SearchBar from "./SearchBar";
import ImageList from "./images/ImageList";
import "./App.scss"

type State = {
    images: ImageResult[]
}

class App extends React.Component<{}, State> {
    state = { images: [] };

    onSearchSubmit = async (term: string) => {
        const response = await unsplash.get<UnsplashResponse>("/search/photos", {
            params: {
                query: term,
                per_page: "300"
            }
        });
        this.setState({ images: response.data.results })
    }

    render() {
        return (
            <div className="flex-container">
                <SearchBar onSubmit={this.onSearchSubmit}/>
                <ImageList images={this.state.images}/>
            </div>
        );
    } 
}

export default App;