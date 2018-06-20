import React from "react";

function OpenDebtOrder(props) {
    const { debtOrder } = this.props;

    return (
        <div>
            <h2>This is the JSON representing the open debt order:</h2>
            <textarea value={JSON.stringify(debtOrder, undefined, 4)} />
        </div>
    );
}

export { OpenDebtOrder };
