import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component{
    //set the initial state
    state = {
        options: [],
        selectedOption: undefined
    }
    handleClearSelectedOption = () => {
        this.setState(()=> ({selectedOption: undefined}))
    }

    handleDeleteOptions = () =>{
        this.setState(()=> ({ options: [] }));
    }
    handleDeleteOption = (optionToRemove) => {
        //filter out the selected option and delete it from the array
        this.setState((prevState)=> ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    }

    handlePick = () =>{
        //randomly pick one of the options in the array
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];

        this.setState(()=>({selectedOption: option}));
    }
    handleAddOption = (option) =>{
        if (!option) {
            return "Please enter an option";
        }else if(this.state.options.indexOf(option) > -1){
            return "This option already exists";
        }
        //Add the new option to the end of the options array
        this.setState((prevState)=>({
            options: prevState.options.concat(option)
        }));
    }
    componentDidMount(){
        //check the localStorage if there is anything saved and then set the state
        try {
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({options}));
            }
        } catch (e) {
            //Do nothing at all
        }
    }
    componentDidUpdate(prevProps, prevState){
        // Pass the update to local storage for creating and deleting
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
            console.log("saving data");
        }
    }
    render(){
        const subtitle = "With Responsivity and Randomization!";

        return (
            //Pass props to children
            <div>
                <Header  subtitle={subtitle}/>
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options = {this.state.options}
                            handleDeleteOption = {this.handleDeleteOption}
                            handleDeleteOptions={this.handleDeleteOptions}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>

                </div>
                <OptionModal
                    selectedOption = {this.state.selectedOption}
                    handleClearSelectedOption = {this.handleClearSelectedOption}
                />
            </div>
        );
    }
}

export default IndecisionApp;
