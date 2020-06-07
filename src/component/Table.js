import React from 'react';
import {ClearTableButton, AddEmployeeButton} from './Buttons';

class Table extends React.Component {

    state = {
        id: 5,
        employees: [{
            id: 1,
            name: "John",
            title: "Software Engineer",
            phone: 70723285,
            email: "john@email.com",
            department: "Engineer"
        },{
            id: 2,
            name: "Lukas",
            title: "Backend Engineer",
            phone: 324242525,
            email: "lukas@email.com",
            department: "Development"
        },{
            id: 3,
            name: "Andrew",
            title: "Sales Person",
            phone: 21342414,
            email: "andrew@email.com",
            department: "Sales"
        },{
            id: 4,
            name: "Zebra",
            title: "CEO",
            phone: 2398103,
            email: "zebra@email.com",
            department: "Board of Director"
        }],
    }

    UNSAFE_componentWillMount(){
        // Read local storage and update state
        const previousState = JSON.parse(localStorage.getItem("state"));
        if(previousState){
            // Update state
            this.setState({
                id: this.state.id + previousState.id,
                employees: previousState.employees,
            });
        }
    }

    componentDidMount(){
        this.renderFields([]);
        this.renderEmployee([],[]);
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

        const newEmployeeList = this.state.employees;
        newEmployeeList.push(newEmployee);

        this.setState({
            id: this.state.id + 1,
            employees: newEmployeeList,
        });

        localStorage.setItem("state", JSON.stringify(this.state));
    }

    clearTable = (e) => {
        e.preventDefault();
        localStorage.removeItem("state");
        this.setState({
            id: 1,
            employees: []
        });
    }

    renderFields = (filterOption) => {

        if(filterOption.length === 0){
            return (
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Department</th>
                </tr>
            )
        } else {
            const fields = filterOption.map(option => <th key={option}>{option}</th>)
            return (
                <tr>
                    {fields}
                </tr>
            )
        }       
    }

    renderEmployee = (filterOption, sortOption) => {
        // Sort first
        const sortedData = sortData(this.state.employees,sortOption[0]); // Sort By Data can be extended to multiple values
        const filteredData = filterData(sortedData, filterOption);

        return filteredData;
    }

    render(){
        return (
            <div>
                <table className="highlight">
                    <thead>
                        {this.renderFields(this.props.filterOption)}
                    </thead>
                    <tbody>
                        {this.renderEmployee(this.props.filterOption, this.props.sortOption)}
                    </tbody>
                </table>
                <AddEmployeeButton  addEmployee={this.addEmployee}/>
                <ClearTableButton clearTable={this.clearTable}/>
            </div>
        )
    }
}

// Helpers
function sortData(data,property){
    if(data.length >= 0 && property){
        // Asecending order 
        return (property === "phone" || property === "id") ? data.sort((a,b) => a[property] - b[property]) : data.sort((a, b) => a[property].localeCompare(b[property]));
    } else {
        // If no sort option then no need to do so
        return data;
    }
}

function filterData(sortedData, filterOption){
    if(filterOption.length === 0){
        return sortedData.map(employee => {
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

    return sortedData.map((employee) => {
        const keys = Object.keys(employee);

        const children = [];
        for(let i = 0; i < keys.length; i++){
            if(filterOption.includes(keys[i])){
                console.log(employee[keys[i]]);
                const child = React.createElement("td", {}, employee[keys[i]])
                children.push(child);
            }
        }

        return React.createElement("tr", {}, children);

    })
}


export default Table;