import React from 'react';

const Action = (props) => (
        <div>
            <button
                className="big-button"
                onClick={props.handlePick}
                //disable the button if there is no items in the list
                disabled={!props.hasOptions}>
                What should I do?
            </button>
        </div>
    );

export default Action;
