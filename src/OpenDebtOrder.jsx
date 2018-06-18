import React from "react";

function OpenDebtOrder(props) {
    return (
        <div>
            <h2>This is the JSON representing the open debt order:</h2>
            <textarea value={JSON.stringify(props.debtOrder, undefined, 4)} />
        </div>
    );
}

export { OpenDebtOrder };
