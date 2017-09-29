import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTheater} from "../actions/index";

class SearchBar extends Component{
    constructor(props){
        super(props);

        this.state ={ term: ''};

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
}

    onInputChange(event){
        console.log(event.target.value);
        this.setState({ term: event.target.value })
}

onFormSubmit(event){
        event.preventDefault();
        this.props.fetchTheater(this.state.term);
        this.setState({term: ''})
}

    render(){
        return(
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                    placeholder="Enter a zip code to get movie theaters in your area"
                    className="form-control"
                    value={ this.state.term }
                    onChange={this.onInputChange} />
                <span className="input-group-btn">
                    <button type ="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        )
    }
}
// binding action create fetchTheater to dispatch,
// then mapping it to props gives access to this.props.fetchWeather inside the component
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchTheater}, dispatch);
}
// Whenever passing a function that maps dispatch to the props of the container, it must be 2nd argument
// null indicates there is no need for state
export default connect(null, mapDispatchToProps)(SearchBar);