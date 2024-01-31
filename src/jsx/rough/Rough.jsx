import { TextField } from "@mui/material";
import React from "react";

export default class Rough extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value:0,
        }
        this.handleValue = this.handleValue.bind(this);
    }

    handleValue(e){
        this.setState({value:e.target.value})
    }

    render() {
        const{value} = this.state;
        return (
            <>
            <input 
                type='range'
                min='0'
                max='5000000'
                value={value}
                onChange={this.handleValue}            
            />
         

            <TextField 
            variant="outlined"
            
            value={value}
            onChange={this.handleValue}
            />
                                    {/* <Button variant="contained" className="signUpButton" color="error">Contained</Button> */}

            </>
        )
    }
}








// const handleGroupName = (e) => {
//     e.preventDefault();
  
//     const existingGroupIndex = groups.findIndex((group) => group.name === newName);
//     if (existingGroupIndex >= 0) {
//       updateUrl(groups[existingGroupIndex].name);
//     } else {
//       addNewElement(newName);
//     }
//   };
  