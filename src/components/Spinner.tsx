import React from "react";
import "./Spinner.scss";

export const Spinner = () => {
    return (
        <div className="spinner">
            <div className="spinner-border" role="status"></div>
        </div>
    );
}