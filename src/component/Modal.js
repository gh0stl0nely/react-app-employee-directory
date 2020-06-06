import React from 'react';
import M from 'materialize-css';

class Modal extends React.Component{

    state = {
        name: "",
        title: "",
        phone: "",
        email: "",
        department: ""
    }

    handleChange = (e) => {
        const key = e.target.name;

        this.setState({
            [key]: e.target.value
        })
    }

    componentDidMount(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {});
          });
    }

    resetState = () => {
        this.setState({
            name: "",
            title: "",
            phone: "",
            email: "",
            department: ""
        })
    }

    render(){
        return(
            <div id="addModal" class="modal">
                    <div class="modal-content">
                        <h4>Add new employee to directory</h4>
                        <form onSubmit={(e) => {this.props.addEmployee(e); this.resetState()}}>
                            <input placeholder="Name" onChange={this.handleChange} name="name" type="text" value={this.state.name}/>
                            <input placeholder="Title" onChange={this.handleChange} name="title" type="text" value={this.state.title}/>
                            <input placeholder="Phone" onChange={this.handleChange} name="phone" type="text" value={this.state.phone}/>
                            <input placeholder="Email" onChange={this.handleChange} name="email" type="text" value={this.state.email}/>
                            <input placeholder="Department" onChange={this.handleChange} name="department" type="text" value={this.state.department}/>
                            <button class="modal-close waves-effect waves-green btn">Add</button>
                        </form> 
                    </div>
            </div>
        )
    }
}

export default Modal;