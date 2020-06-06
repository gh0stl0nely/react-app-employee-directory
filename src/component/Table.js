import React from 'react';
import {ClearTableButton, AddEmployeeButton} from './Buttons';

class Table extends React.Component {

    state = {
        id: 1,
        stateEmployees: [],
        sort: [],
    }

    componentWillMount(){
        // Read local storage and update state
        const previousState = JSON.parse(localStorage.getItem("state"));
        if(previousState){
            // Update state
            this.setState({
                id: this.state.id + previousState.id,
                stateEmployees: previousState.stateEmployees,
                // sort: previousState.sort
            });
        }
    }

    addEmployee = (e) => {
        e.preventDefault();
        const newEmployee = {
            id: this.state.id,
            name: e.target.name.value,
            title: e.target.title.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            department: e.target.department.value
        }

        const newEmployeeList = this.state.stateEmployees;
        newEmployeeList.push(newEmployee);

        this.setState({
            id: this.state.id + 1,
            stateEmployees: newEmployeeList,
        });

        localStorage.setItem("state", JSON.stringify(this.state));
    }

    filterTable = (e) => {

    }

    sortTable = (e) => {

    }

    clearTable = (e) => {
        e.preventDefault();
        localStorage.removeItem("state");
        this.setState({
            id: 1,
            stateEmployees: []
        });
    }

    renderEmployee = () => {
        return this.state.stateEmployees.map((employee) => {
            return (
                <tr>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.title}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                </tr>
            )
        })
    }

    renderFields = () => {
        return (
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Department</th>
            </tr>
        )
    }

    render(){
        return (
            <div>
                <table className="highlight">
                    <thead>
                        {this.renderFields()}
                    </thead>
                    <tbody>
                        {this.renderEmployee()}
                    </tbody>
                </table>
                <AddEmployeeButton  addEmployee={this.addEmployee}/>
                <ClearTableButton clearTable={this.clearTable}/>
            </div>
        )
    }
}

export default Table;