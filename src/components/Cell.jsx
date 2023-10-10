import { React } from "react";

function Cell ({count, value, handler}){
    return (
        <button className="cell" id={count} onClick={handler} data-testid="cell">
            {value}
        </button>
    )
}

export default Cell;