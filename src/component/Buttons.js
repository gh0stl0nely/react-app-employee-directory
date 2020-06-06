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
                                <SortButton />
                                <FilterButton />
                            </span>
                </div>
                <div>
                    <ClearOptionsButton />
                </div>
            </div>
        
        )
    }
}

function SortButton(){
    return (
        <div style={{margin: "0 auto", width: "50%", marginTop: "40px"}} class="input-field col s12">
            <select multiple>
                <option value="" disabled></option>
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="title">Title</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="department">Department</option>
            </select>
            <label style={{fontSize: "12px"}}>Sort by</label>
        </div>
    )
}

function FilterButton(){
    return (
        <div style={{margin: "0 auto", width: "50%",  marginTop: "40px"}} class="input-field col s12">
            <select multiple>
                <option value="" disabled></option>
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="title">Title</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="department">Department</option>
            </select>
            <label style={{fontSize: "12px"}}>Filter By</label>
      </div>
    )
}

function AddEmployeeButton(props){

    return (
        <div className="centeredEl">
            <button data-target="addModal" class="btn modal-trigger">Add Employee</button>
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
            <button style={{backgroundColor: "blue"}} className="waves-effect waves-light btn">Clear Options</button>
        </div>
    )
}

export {
    Buttons,
    ClearTableButton,
    ClearOptionsButton,
    AddEmployeeButton
}