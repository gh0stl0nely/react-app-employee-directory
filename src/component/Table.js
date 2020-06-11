import React from 'react';
import {ClearTableButton, AddEmployeeButton, Buttons} from './Buttons';

class Table extends React.Component {
    
    renderFields = () => {
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
    }

    renderEmployee = (employeeList, sortByValue, isAscending, filterByField,chosenFilterChoice) => {
        const sortedData = sortData(employeeList, sortByValue, isAscending); // Sort By Data can be extended to multiple values
        const filteredData = filterData(sortedData,filterByField, chosenFilterChoice); // Filter option needs to change
        return filteredData;
    }

    render(){
        return (
            <div>
                <Buttons getChosenFilterChoice={this.props.getChosenFilterChoice} filterByValues={this.props.filterByValues} getFilterByField={this.props.getFilterByField} clearOptions={this.props.clearOptions} getSortBy={this.props.getSortBy} getSortOrder={this.props.getSortOrder} />
                <div>
                    <table className="highlight">
                        <thead>
                            {this.renderFields()}   
                        </thead>
                        <tbody>
                            {this.renderEmployee(this.props.getEmployee, this.props.sortByValue, this.props.isAscending, this.props.filterByField ,this.props.chosenFilterChoice)}
                        </tbody>
                    </table>
                    <AddEmployeeButton  addEmployee={this.props.addEmployee}/>
                    <ClearTableButton clearTable={this.props.clearTable}/>
                </div>
            </div>
          
        )
    }
}

// Helpers
function sortData(employeeList, sortByValue, isAscending){
    // console.log(employeeList.length >= 0, !sortByValue === null, isAscending);
    if(employeeList.length >= 0 && sortByValue != null){
        if(isAscending){
            // Asecending order 
            return (sortByValue === "Phone" || sortByValue === "ID") ? employeeList.sort((a,b) => a[sortByValue] - b[sortByValue]) : employeeList.sort((a, b) => a[sortByValue].localeCompare(b[sortByValue]));
        } else {
            return (sortByValue === "Phone" || sortByValue === "ID") ? employeeList.sort((a,b) => b[sortByValue] - a[sortByValue]) : employeeList.sort((a, b) => b[sortByValue].localeCompare(a[sortByValue]));
        }
    } else {
        // If no sort option then no need to do so
        return employeeList;
    }
}

function filterData(sortedData, filterByField,chosenFilterChoice){

    if(!chosenFilterChoice || !filterByField){
        return sortedData.map(employee => {
            return (
                <tr key={employee.ID}>
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
        console.log(employee[filterByField], chosenFilterChoice);
        if(employee[filterByField] == chosenFilterChoice){
           console.log("Matched");
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
        }
    })
}


export default Table;