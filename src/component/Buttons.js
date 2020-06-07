import React from 'react';
import Modal from './Modal';
import "./style.css";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

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
                                <SortButton getSortData={this.props.getSortData}/>
                                <FilterButton getFilterData={this.props.getFilterData} />
                                <RadioButton getSortChoice={this.props.getSortChoice} />
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

function SortButton(props){
    return (
        <div style={{margin: "0 auto", width: "50%", marginTop: "40px"}} className="input-field col s12">
            <select onChange={props.getSortData}>
                <option value="" disabled selected></option>
                <option value="ID">ID</option>
                <option value="Name">Name</option>
                <option value="Title">Title</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
                <option value="Department">Department</option>
            </select>
            <label style={{fontSize: "12px"}}>Sort by</label>
            
        </div>
    )
}

function FilterButton(props){
    return (
        <div style={{margin: "0 auto", width: "50%",  marginTop: "40px"}} className="input-field col s12">
            <select multiple onChange={props.getFilterData}>
                <option value="" disabled></option>
                <option value="ID">ID</option>
                <option value="Name">Name</option>
                <option value="Title">Title</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
                <option value="Department">Department</option>
            </select>
            <label style={{fontSize: "12px"}}>Filter By</label>
      </div>
    )
}

function RadioButton(props){
    return (
        <form onChange={props.getSortChoice}>
            <p>
                <label>
                    <input name="group1" type="radio" value="ascending" defaultChecked/>
                    <span style={{color: "black"}}>Ascending Order</span>
                </label>
            </p>
            <p>
                <label>
                    <input name="group1" type="radio" value="decending" />
                    <span style={{color: "black"}}>Decending Order</span>
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