import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import App from "./App";
import SearchBar from "./SearchBar";
import { ImageResult } from "../models/UnsplashResponse";

configure({ adapter: new Adapter() });

type SearchBartState = {
    term: string
};

type AppState = {
    images: ImageResult[] | null
};

describe("App image list", () => {
    it("Should be either null or not empty", () => {
        const app = shallow<App, {}, AppState>(<App/>);
        app.instance().onSearchSubmit("dog");
        expect(app.state().images).not.toBe([]);
    });
});


describe("Search bar controlled input", () => {
    it("Should have given value", () => {
        const wrapper = shallow<App, {}, AppState>(<App/>);
        const instance = wrapper.instance();
        const searchBar = shallow<{}, SearchBartState>(<SearchBar onSubmit={instance.onSearchSubmit}/>);
        const event = { target: { value: "random" } };
        searchBar.find("input").simulate("change", event);
        expect(searchBar.state().term).toEqual("random");
    });
});
