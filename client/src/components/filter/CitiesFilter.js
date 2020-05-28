import React, { Component } from 'react';
import 'typeface-roboto';
import {
    AppBar,
    Toolbar,
    InputBase
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class CitiesFilter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cityFilter: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            cityFilter: e.target.value
        })
        this.onchange(e.target.value)
    }

    render() {
        return (
            <div>
                <AppBar className='filter_city' position='static' style={{ border: '1px solid', background: 'transparent', boxShadow: '5px 10px 15px 5px #3F51B5'}}>
                    <Toolbar className='filter_city_bar'>
                        <h3 className='filter_city_title'>Cities</h3>
                        <div className='filter_city_search_box'>
                            <SearchIcon className='filter_city_icon_search' type='submit' />
                            <InputBase className='filter_city_input'
                                type = 'text'
                                name = 'city'
                                placeholder='search city...'
                                onChange = {this.props.handleChange}  
                            />         
                        </div>   
                    </Toolbar>                    
                </AppBar>
            </div>
        )
    }
}

export default CitiesFilter;