import React, { FormEvent, ChangeEvent } from "react";
import "./SearchBar.scss";

type State = {
    term: string
}

type Props = {
    onSubmit: (term: string) => void;
}

class SearchBar extends React.Component<Props, State> {
    state = { term: "" };

    onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ term: event.target.value });
    }

    onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    }
    
    render() {
        return (
            <form action="" onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="text" 
                        onChange={this.onInputChange}
                        placeholder="Search for Images"
                    />
                </div>
            </form>
        );
    }
}

export default SearchBar;