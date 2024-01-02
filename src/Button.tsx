import React from "react";

type ButtonPropsType = {
    title:string
    onClickHandler: () => void
    classes?: string
}

const Button = (props:ButtonPropsType) => {
    return(
        <button
            className={props.classes}
            onClick={props.onClickHandler}>{props.title}</button>
    )
}

export default Button

