import React from "react";
import "./App.css";
import Intro from "./component/Intro";
import Table from "./component/Table";

class App extends React.Component {
  state = {
    id: 4,
    employees: [
      {
        ID: 1,
        Name: "John",
        Title: "Software Engineer",
        Phone: 70723285,
        Email: "john@email.com",
        Department: "Engineering"
      },
      {
        ID: 2,
        Name: "Lukas",
        Title: "Software Engineer",
        Phone: 324242525,
        Email: "lukas@email.com",
        Department: "Engineering"
      },
      {
        ID: 3,
        Name: "Andrew",
        Title: "Salesman",
        Phone: 21342414,
        Email: "andrew@email.com",
        Department: "Sales"
      },
      {
        ID: 4,
        Name: "Zebra",
        Title: "Salesman",
        Phone: 2398103,
        Email: "zebra@email.com",
        Department: "Sales"
      }
    ],
    sortByValue: "ID",
    isAscending: true,
    filterByField: null, // This represent which particular field (or column) user wants to 
    filterByValues: [], // From filterByField, this list contains all the values that the filterByField
    chosenFilterChoice: null
  };

  UNSAFE_componentWillMount() {
    // Read local storage and update state
    const previousState = JSON.parse(localStorage.getItem("state"));
    if (previousState) {
      // Update state
      this.setState({
        id: previousState.id,
        employees: previousState.employees,
        sortByValue: previousState.sortByValue,
        isAscending: previousState.isAscending,
        filterByField: previousState.filterByField, // This represent which particular field (or column) user wants to 
        filterByValues: previousState.filterByValues, // From filterByField, this list contains all the values that the filterByField
        chosenFilterChoice: previousState.chosenFilterChoice
      });

    }
  }

  addEmployee = e => {
    e.preventDefault();
    const id = this.state.id + 1;
    const name = e.target.name.value.trim();
    const title = e.target.title.value.trim();
    const phone = e.target.phone.value.trim();
    const email = e.target.email.value.trim();
    const department = e.target.department.value.trim();

    if (
      name === "" ||
      title === "" ||
      phone === "" ||
      email === "" ||
      department === ""
    ) {
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
    };

    const newEmployeeList = this.state.employees;
    newEmployeeList.push(newEmployee);

    this.setState(
      {
        id: this.state.id + 1,
        employees: newEmployeeList
      },
      function() {
        localStorage.setItem("state", JSON.stringify(this.state));
        window.location.reload();
      }
    );
  };

  clearTable = e => {
    e.preventDefault();
    localStorage.removeItem("state");
    this.setState({
      id: 0,
      employees: []
    });
  };

  getSortBy = e => {
    const sortByValue = e.target.value;
    this.setState({
      sortByValue: sortByValue
    }, function(){
      localStorage.setItem("state", JSON.stringify(this.state));
    })
  };

  getSortOrder = e => {
    const isAscending = e.target.value;
    if(isAscending === "ascending"){
      this.setState({
        isAscending: true
      })
    } else {
      this.setState({
        isAscending: false
      })
    }
  }

  clearOptions = e => {
    this.setState({
      sortByValue: "ID",
      isAscending: true,
      filterByField: null, // This represent which particular field (or column) user wants to 
      filterByValues: [], // From filterByField, this list contains all the values that the filterByField
      chosenFilterChoice: null
    }, function(){
      localStorage.setItem("state", JSON.stringify(this.state));
      window.location.reload();
    });
  }

  getFilterByField = (e) => {
    const filterByField = e.target.value;
    const containDuplicateOptions = this.state.employees.map(employee => {
      return employee[filterByField];
    })
    // Now we just need to delete all duplicate :)
    const filterValueList = [...new Set(containDuplicateOptions)];

    this.setState({
      filterByField: filterByField,
      filterByValues: filterValueList,
      chosenFilterChoice: null
    }, function(){
      localStorage.setItem("state", JSON.stringify(this.state));
      window.location.reload();
    })

  }

  getChosenFilterChoice = (e) => {
    const chosenFilterChoice = e.target.value;
    this.setState({
      chosenFilterChoice: chosenFilterChoice 
    }, function(){
      localStorage.setItem("state", JSON.stringify(this.state));
    })

  }

  render() {
    return (
      <div>
        <Intro />
        <Table filterByField={this.state.filterByField} 
        chosenFilterChoice={this.state.chosenFilterChoice} 
        getChosenFilterChoice={this.getChosenFilterChoice} 
        filterByValues={this.state.filterByValues} 
        getFilterByField={this.getFilterByField} 
        isAscending={this.state.isAscending} 
        clearOptions={this.clearOptions} 
        getSortOrder={this.getSortOrder} 
        sortByValue={this.state.sortByValue} 
        getSortBy={this.getSortBy} 
        getEmployee={this.state.employees} 
        clearTable={this.clearTable} 
        addEmployee={this.addEmployee}/>
      </div>
    );
  }
}

export default App;
