import React from 'react';
import {ClearTableButton, AddEmployeeButton} from './Buttons';

class Table extends React.Component {

    state = {
        id: 4,
        employees: [{
            ID: 1,
            Name: "John",
            Title: "Software Engineer",
            Phone: 70723285,
            Email: "john@email.com",
            Department: "Engineer"
        },{
            ID: 2,
            Name: "Lukas",
            Title: "Backend Engineer",
            Phone: 324242525,
            Email: "lukas@email.com",
            Department: "Development"
        },{
            ID: 3,
            Name: "Andrew",
            Title: "Sales Person",
            Phone: 21342414,
            Email: "andrew@email.com",
            Department: "Sales"
        },{
            ID: 4,
            Name: "Zebra",
            Title: "CEO",
            Phone: 2398103,
            Email: "zebra@email.com",
            Department: "Board of Director"
        }],
    }

    UNSAFE_componentWillMount(){
        // Read local storage and update state
        const previousState = JSON.parse(localStorage.getItem("state"));
        if(previousState){
            // Update state
            this.setState({
                id: previousState.id,
                employees: previousState.employees,
            });
        }
    }

    componentDidMount(){
        this.renderFields([]);
        this.renderEmployee([],[], true);
    }


    addEmployee = (e) => {
        e.preventDefault();
        const id = this.state.id + 1;
        const name = e.target.name.value.trim();
        const title = e.target.title.value.trim();
        const phone = e.target.phone.value.trim();
        const email = e.target.email.value.trim();
        const department = e.target.department.value.trim();

        if(name === "" || title === "" || phone === "" || email === "" || department === ""){
            alert("Please don't leave any fields empty.");
            return;
        }

        const newEmployee = {
            ID: id,
            Name: name,
            Title: title,
            Phone: phone,
            Email: email,
            Department: department
        }

        const newEmployeeList = this.state.employees;
        newEmployeeList.push(newEmployee);

        this.setState({
            id: this.state.id + 1,
            employees: newEmployeeList,
        },function(){
            localStorage.setItem("state", JSON.stringify(this.state));
        });

        
    }

    clearTable = (e) => {
        e.preventDefault();
        localStorage.removeItem("state");
        this.setState({
            id: 0,
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

    renderEmployee = (filterOption, sortOption, sortChoice) => {
        // Sort first
        const sortedData = sortData(this.state.employees,sortOption[0], sortChoice); // Sort By Data can be extended to multiple values
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
                        {this.renderEmployee(this.props.filterOption, this.props.sortOption, this.props.sortChoice)}
                    </tbody>
                </table>
                <AddEmployeeButton  addEmployee={this.addEmployee}/>
                <ClearTableButton clearTable={this.clearTable}/>
            </div>
        )
    }
}

// Helpers
function sortData(data,property, isAscending){
    console.log(isAscending);
    if(data.length >= 0 && property){
        if(isAscending){
            // Asecending order 
            return (property === "Phone" || property === "ID") ? data.sort((a,b) => a[property] - b[property]) : data.sort((a, b) => a[property].localeCompare(b[property]));
        } else {
            return (property === "Phone" || property === "ID") ? data.sort((a,b) => b[property] - a[property]) : data.sort((a, b) => b[property].localeCompare(a[property]));
        }
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
                    <td>{employee.ID}</td>
                    <td>{employee.Name}</td>
                    <td>{employee.Title}</td>
                    <td>{employee.Phone}</td>
                    <td>{employee.Email}</td>
                    <td>{employee.Department}</td>
                </tr>
            )
        })
    } 

    return sortedData.map((employee) => {
        const keys = Object.keys(employee);

        const children = [];
        for(let i = 0; i < keys.length; i++){
            if(filterOption.includes(keys[i])){
                const child = React.createElement("td", {}, employee[keys[i]])
                children.push(child);
            }
        }

        return React.createElement("tr", {}, children);

    })
}


export default Table;