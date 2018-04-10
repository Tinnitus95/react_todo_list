import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component{
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
        this.setState((prevState)=> ({
            options: prevState.options.filter((option) => optionToRemove !== option)


        }))
    }
    handlePick = () =>{
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
        this.setState((prevState)=>({
            options: prevState.options.concat(option)
        }));
    }
    componentDidMount(){
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
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
            console.log("saving data");
        }

    }
    componentWillUnmount(){
        console.log("Component Will Unmount");
    }
    render(){
        const subtitle = "Put your life in the hands of a computer";

        return (
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
