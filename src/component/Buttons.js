import React from 'react';
import Modal from './Modal';
import "./style.css";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
// import Select from 'react-select';

class Buttons extends React.Component{

    componentDidMount(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems,{});
        });
    }

    render(){
        return (
            <div>
                <div style={{textAlign: "center"}}>
                            <span>
                                <SortButton getSortBy={this.props.getSortBy}/>
                                <RadioButton getSortOrder={this.props.getSortOrder} />
                                <FilterButton getChosenFilterChoice={this.props.getChosenFilterChoice} filterByValues={this.props.filterByValues} getFilterByField={this.props.getFilterByField} />
                            </span>
                </div>
                <div>
                    <ClearOptionsButton clearOptions={this.props.clearOptions}/>
                    <p style={{textAlign: "center"}}><strong>Note:</strong> The first four elements are there for testing. Clearing the table without adding new employees will bring back the 4 default values.</p>
                </div>
            </div>
        
        )
    }
}

class SortButton extends React.Component{
    
    state = {
        allSortByFields: ["ID","Name","Title", "Phone", "Email","Department"],
    }

    renderSortByValues = () => {
        const currentState = JSON.parse(localStorage.getItem("state"));
        if(!currentState){
            return this.state.allSortByFields.map(value => {
                return <option value={value} key={value}>{value}</option>
            })
        }
        
        if(!currentState.sortByValue){
            return this.state.allSortByFields.map(value => {
                return <option value={value} key={value}>{value}</option>
            })
        } else {
            return this.state.allSortByFields.map(value => {
                if(currentState.sortByValue === value){
                    return <option value={value} key={value} selected>{value}</option>
                }
                return <option value={value} key={value}>{value}</option>
            })
        }
    }

    render(){
        return (
            <div style={{margin: "0 auto", width: "50%", marginTop: "40px"}} className="input-field col s12">
                <select onChange={this.props.getSortBy}>
                    <option value="" disabled></option>
                    {this.renderSortByValues()}
                </select>
                <label style={{fontSize: "12px"}}>Sort by</label>
            
            </div>
        )
    }
}

class FilterButton extends React.Component{

    state = {
        allFilterFields: ["ID","Name","Title", "Phone", "Email","Department"],
    }

    renderFilterFields = () => {
        const currentState = JSON.parse(localStorage.getItem("state"));
        // Error check to make sure if user tempers with local storage
        if(!currentState){
            return this.state.allFilterFields.map(value => {
                return <option value={value} key={value}>{value}</option>
            })
        }
        
        if(!currentState.filterByField){
            return this.state.allFilterFields.map(value => {
                return <option value={value} key={value}>{value}</option>
            })
        } else {
            return this.state.allFilterFields.map(value => {
                if(currentState.filterByField === value){
                    return <option value={value} key={value} selected>{value}</option>
                }
                return <option value={value} key={value}>{value}</option>
            })
        }
    }

    renderOptions = () => {

        const currentState = JSON.parse(localStorage.getItem("state"));
        // Always default to
        if(!currentState){
            return <option disabled></option>
        }

        if(currentState.filterByValues.length === 0){
            return (
                <option value="null" key="null" disabled></option>
            )
        } else {
            return currentState.filterByValues.map((value,index) => {
                return (
                    <option value={value} key={index}>{value}</option>
                )
            })
        }
    }

    render(){
        return (
            <div style={{margin: "0 auto", width: "50%",  marginTop: "40px"}} className="input-field col s12">
                <select onChange={this.props.getFilterByField}>
                    <option value="" disabled selected></option>
                    {this.renderFilterFields()}
                </select>
                <label style={{fontSize: "12px"}}>Filter By</label>
                <select onChange={this.props.getChosenFilterChoice}>
                    <option disabled selected></option>
                    {this.renderOptions()}
                </select>
            </div>
        )
    }
}

function RadioButton(props){
    return (
        <form onChange={props.getSortOrder}>
            <p>
                <label>
                    <input name="group1" type="radio" value="ascending"/>
                    <span style={{color: "black"}}>Ascending Order</span>
                </label>
            </p>
            <p>
                <label>
                    <input name="group1" type="radio" value="decending" />
                    <span style={{color: "black"}}>Descending Order</span>
                </label>
            </p>
        </form>
    )
}

function AddEmployeeButton(props){

    return (
        <div className="centeredEl">
            <button data-target="addModal" className="btn modal-trigger">Add Employee</button>
            <Modal addEmployee={props.addEmployee}/>
        </div>
    )
}

function ClearTableButton(props){
    return (
        <div style={{marginTop: "30px" ,textAlign: "center"}} >
            <button style={{backgroundColor: "grey"}} onClick={props.clearTable} className="waves-effect waves-light btn-large">Clear Table</button>
        </div>
    )
}

function ClearOptionsButton(props){
    return (
        <div className="centeredEl">
            <button style={{backgroundColor: "blue"}} onClick={props.clearOptions} className="waves-effect waves-light btn">Clear Options</button>
        </div>
    )
}

export {
    Buttons,
    ClearTableButton,
    ClearOptionsButton,
    AddEmployeeButton
}