import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Button,
    List
} from '@material-ui/core';
import { getOneCity } from '../../redux/actions/cities';
import { getItineraries } from '../../redux/actions/itinerary';
import Spinner from '../layout/Spinner';
import BackgroundMaps from '../images/background_maps.jpg';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MapIcon from '@material-ui/icons/Map';

class Itineraries extends Component {

    componentDidMount() {
        const city = this.props.match.params.city;
        this.props.getOneCity(city);
        this.props.getItineraries(city);
    }

    renderListOfItineraries() {
        const { itineraries, loading, match } = this.props;
        
        return loading ? (
            <Spinner />
        ) : (
            <Fragment>
                <section className='container_lists'>
                    <div className='city_itineraries'
                        style={{
                            backgroundImage:`url(${BackgroundMaps})`
                        }}
                    >
                        {match.params.city}
                    </div>
                    <ul className = 'itineraries_content'>
                        {itineraries.map((itinerary, index) => 
                        <List
                            className='itineraries_list_ul'
                            key={index} 
                        >
                            <div className='parent_itinerary_item' style={{backgroundImage:`url(${itinerary.image})`}} >  
                                <div className='child_itinerary_item'>
                                    <h5 className='itinerary_title'>{itinerary.title}</h5>
                                    <div className='info_itinerary'>
                                        <h5 className='itinerary_price'>Price:&nbsp;{itinerary.price}</h5> 
                                        <h5 className='itinerary_duration'>Duration:&nbsp;{itinerary.duration}</h5>
                                    </div>
                                    <div className='hashtags_itinerary'>
                                        <h5 className='itinerary_hashtags'>{itinerary.hashtags}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='itinerary_boxes'>
                                <Button
                                    className='go_to_itineraries'
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                ><Link to={`/city/${match.params.city}/${itinerary._id}`} className='link_go_to_itineraries'> 
                                        <MapIcon />
                                        <h5 className='link_go_to_itineraries'>Go To Itinerary</h5>
                                        </Link>
                                </Button>
                            </div>
                        </List>
                    )}</ul>
                    <div className='add_itinerary'>
                        <Link to={`/add_itinerary/${match.params.city}`} className='add_itinerary_link'>
                            <h3 className='add_city_button'>Add Itinerary</h3><AddCircleIcon className='add_city_link'/>
                        </Link> 
                    </div>
                    <Button
                        className='form_submits'
                        type="submit"
                        variant="contained"
                        fullWidth
                    ><Link to='/cities'>CITIES</Link></Button>
                </section>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                {this.renderListOfItineraries()}
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        itineraries: state.itinerary.itineraries,
        city: state.cities.city,
        loading: state.itinerary.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOneCity: (city) => dispatch(getOneCity(city)),
        getItineraries: (city) => dispatch(getItineraries(city)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);
