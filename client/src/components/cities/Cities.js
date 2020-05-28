import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Avatar,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import { getCities } from '../../redux/actions/cities';
import CitiesFilter from '../filter/CitiesFilter';
import Spinner from '../layout/Spinner';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

class Cities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterValue: ''
        }
    }
    
    componentDidMount() {
        this.props.getCities()
    }
     
    filterCities = (e) => {
        let filterValue = e.target.value.toLowerCase()
        this.setState({
            filterValue
        })
    }
    
    renderListOfCities() {
        const { cities, loading } = this.props;
        const { filterValue } = this.state
        return loading ? (
            <Spinner />
        ) : (
            <Fragment>
                    <ul className='cities_list'>{cities
                        .filter(city => city.city.toLowerCase().search(filterValue) > -1 || city.country.toLowerCase().search(filterValue) > -1)
                        .map((city, index) =>
                        <List className='cities_list_ul'
                            style={{backgroundImage:`url(${city.image})`}}
                            key={index}
                        >
                            <ListItem className='cities_list_item' key={index}>
                                <ListItemText className='city_name'><div className='city_name'>{city.city}</div><div className='country_name'>{city.country}</div></ListItemText>
                                <Link to={`/city/${city.city}`}>
                                    <Avatar className='avatar_list_next'><PlayCircleFilledIcon className='avatar_list_next' /></Avatar>
                                </Link>
                            </ListItem>
                        </List>)
                        }
                    </ul>
            </Fragment>
        )
    }
    
    render() {
        return(
            <Fragment>
                <section className='container_lists'>
                    <CitiesFilter 
                        handleChange={this.filterCities}
                    />
                    <div className='list_cities_header'>
                        <h5 className='info'>Click on the desired city to see itineraries</h5>
                        <Link to='/add_city' className='add_city_link'>
                            <h3 className='add_city_button'>Add City</h3><AddCircleIcon className='add_city_link'/>
                        </Link> 
                    </div>
                    <div className='list_content'>
                        {this.renderListOfCities()}
                    </div>
                </section>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        cities: state.cities.cities,
        loading: state.cities.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCities: (city) => dispatch(getCities(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities);