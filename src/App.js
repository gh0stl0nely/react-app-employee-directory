import React from 'react';
import {Buttons} from './component/Buttons.js';
import Table from './component/Table.js';
import Intro from './component/Intro.js';

class App extends React.Component {

  state = {
    sortBy : [],
    filterBy: []
  }

  getFilterOptions = (e) => {
    const options = e.target.options;
    const newFilterOptions = [];

    for(let i = 0; i < options.length;i++){
      if(options[i].selected){
        newFilterOptions.push(options[i].value);
      }
    }

    this.setState({
      filterBy: newFilterOptions
    });

  }

  getSortOptions = (e) => {
    const options = e.target.options;
    const newSortByOptions = [];

    for(let i = 0; i < options.length;i++){
      if(options[i].selected){
        newSortByOptions.push(options[i].value);
      }
    }

    this.setState({
      sortBy: newSortByOptions
    });
  }

  clearOptions = () => {
    window.location.reload();
  }

  render(){
    return (
      <div>
        <Intro />
        <Buttons clearOptions={this.clearOptions} getFilterData={this.getFilterOptions} getSortData={this.getSortOptions}/>
        <Table sortOption={this.state.sortBy} filterOption={this.state.filterBy}/>
      </div>
    );
  }
}

export default App;
