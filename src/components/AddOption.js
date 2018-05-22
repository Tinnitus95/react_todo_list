import React from 'react';

export default class AddOption extends React.Component {
    state = {
        error: undefined
    };
    handleAddOption = (e) => {
        e.preventDefault();
        // remove all whitespaces at the start and end of the options
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);


        this.setState(() => ({ error }));
        if (!error) {
            e.target.elements.option.value = " ";
        }
    }
    render(){
        return (
            <div>
                {/* print out an error message when trying to add an existing option */}
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}
