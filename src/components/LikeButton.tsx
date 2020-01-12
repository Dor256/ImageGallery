import React from 'react';

export type LikeButtonProps = {
    active: boolean,
    onClick(): void
}

export const LikeButton = (props: LikeButtonProps) => {
    const likedImageClass = props.active ? "liked" : "";
    return <button className={`like image-button ${likedImageClass}`} onClick={props.onClick}><i className="fas fa-heart"></i></button>;
}