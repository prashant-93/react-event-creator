import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './EventRegister.css';

const EventRegister = (props) => {
    const [eventList, setEventList] = useState(localStorage.getItem('event_list') ? JSON.parse(localStorage.getItem('event_list')) : [])
    const [eventDetails, setEventDetails] = useState({
        event_name: null,
        desc: null,
        venue: null,
        price: '0',
        discount_type: 'free',
        discount_percent: null,
        final_amnt: null
    });
    const [showAddForm, setAddForm] = useState(false);
    const [filterListBy, setFilterListBy] = useState('all');
    const [eventFormErrorMessages, setEventFormErrorMessages] = useState({
        event_name: null,
        desc: null,
        venue: null,
        price: null,
        discount_percent: null,
        final_amnt: null,
        form_not_valid: false
    });
    const filterList = [{
        'label': 'All',
        'value': 'all'
    }, {
        'label': 'Free',
        'value': 'free'
    }, {
        'label': 'Discount',
        'value': 'discount'
    }, {
        'label': 'No Discount',
        'value': 'no_discount'
    }]

    useEffect(() => {
        let newList = localStorage.getItem('event_list') ? JSON.parse(localStorage.getItem('event_list')) : [];
        if (filterListBy !== 'all') {
            newList = newList.filter((event) => event.discount_type === filterListBy);
        }
        setEventList([...newList]);
    }, [filterListBy])

    useEffect(() => {
        if (eventDetails.price && eventDetails.discount_percent) {
            setEventDetails({
                ...eventDetails,
                final_amnt: (eventDetails.price - (eventDetails.price * eventDetails.discount_percent) / 100)
            })
        }
    }, [eventDetails.discount_percent])

    const resetEventForm = () => {
        setEventDetails({
            event_name: null,
            desc: null,
            venue: null,
            price: '0',
            discount_type: 'free',
            discount_percent: null,
            final_amnt: null
        });
        setEventFormErrorMessages({
            event_name: null,
            desc: null,
            venue: null,
            price: null,
            discount_percent: null,
            final_amnt: null,
            form_not_valid: false
        })
        setAddForm(false);
    }
    const checkForFormErrors = () => {
        let no_error = true;
        Object.keys(eventDetails).forEach((key, index) => {
            if (!eventDetails[key] && index < 3) {
                no_error = false;
            } else if (key !== 'discount_type') {
                if (eventDetails.discount_type === 'discount') {
                    if (!eventDetails[key]) {
                        no_error = false
                    }
                }
            }
            if (key === 'price' && eventDetails[key] < 0) {
                no_error = false;
            }
        })
        return no_error;
    }

    const submitEventForm = () => {
        if (checkForFormErrors()) {
            eventList.push(eventDetails);
            setEventList([...eventList]);
            localStorage.setItem('event_list', JSON.stringify(eventList));
            resetEventForm();
        } else {
            setEventFormErrorMessages({ ...eventFormErrorMessages, form_not_valid: true });
        }
    }

    return (
        <>
            <div className={'main-header'}>
                <div className={'filterHeader'}>
                    <div className={'header'}>{filterListBy} Event List</div>
                    <div className={'eventType'}>
                        <label htmlFor="filterBy" />
                        <select name="filterBy" id="filterBy"
                            onChange={(event) => {
                                setFilterListBy(event.target.value);
                            }}>
                            {
                                filterList.map((option) => {
                                    return <option value={option.value}>
                                        {option.label}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className={'addEventBtn'}
                    onClick={() => {
                        setAddForm(!showAddForm);
                    }}>Add Event
                </div>
            </div>
            {
                eventList && eventList.length ?
                    <div className={'allEvents'}>
                        {
                            eventList.map((event) => {
                                return <>
                                    <div className={'eventTile'}>
                                        <span className={"tileHead"}> Event Name : </span> {event.event_name}
                                        <div>
                                            <span className={"tileHead"}>Event Description : </span> {event.desc}
                                        </div>
                                        <div>
                                            <span className={"tileHead"}>Event Venue : </span> {event.venue}
                                        </div>
                                        <div>
                                            <span className={"tileHead"}>Event Price : </span> {event.price}
                                        </div>
                                        <div>
                                            <span
                                                className={"tileHead"}>Event Discount Type : </span> {event.discount_type}
                                        </div>
                                    </div>
                                </>
                            })
                        }
                    </div> : <div className={'noEvent'}>No Events Added, Kindly add an event</div>
            }
            {
                showAddForm ? <>
                    <div className={'loginParent'}>
                        <div className={'header'}>Register an Event with us</div>
                        <div>
                            <input type={'text'}
                                placeholder={'Event Name'}
                                onChange={(event => setEventDetails({
                                    ...eventDetails,
                                    event_name: event.target.value
                                }))}
                            />
                            <input type={'text'}
                                placeholder={'Event Description'}
                                onBlur={(event => setEventDetails({ ...eventDetails, desc: event.target.value }))}
                            />
                            <input type={'text'}
                                placeholder={'Event Venue'}
                                onBlur={(event => setEventDetails({ ...eventDetails, venue: event.target.value }))}
                            />
                            <input type={'number'}
                                placeholder={'Event Price'}
                                disabled={(eventDetails.discount_type === 'free')}
                                value={eventDetails.price ? eventDetails.price : ''}
                                onBlur={(event => {
                                    setEventDetails({
                                        ...eventDetails,
                                        price: Number(event.target.value)
                                    })
                                    if (event.target.value < 0) {
                                        setEventFormErrorMessages({
                                            ...eventFormErrorMessages,
                                            price: 'Price cannot be less than 0'
                                        });
                                    } else {
                                        setEventFormErrorMessages({
                                            ...eventFormErrorMessages,
                                            price: null
                                        })
                                    }
                                })}
                            />
                            {
                                eventFormErrorMessages.price ?
                                    <div className={'error-message'}>{eventFormErrorMessages.price}</div> : null
                            }
                            <div className={'eventType'}>
                                <label htmlFor="cars">Choose Discount Type:</label>
                                <select name="cars" id="cars"
                                    onChange={(event) => {
                                        if (event.target.value !== 'free') {
                                            setEventDetails({
                                                ...eventDetails, price: null,
                                                discount_type: event.target.value
                                            })
                                        } else {
                                            setEventDetails({
                                                ...eventDetails, price: "0",
                                                discount_type: event.target.value
                                            })
                                        }
                                    }}>
                                    <option value="free">Free</option>
                                    <option value="discount">Discount</option>
                                    <option value="no_discount">No Discount</option>
                                </select>
                            </div>
                            {
                                eventDetails.discount_type === 'discount' ?
                                    <>
                                        <input type={'number'}
                                            placeholder={'Discount (in percentage %)'}
                                            onBlur={(event => setEventDetails({
                                                ...eventDetails,
                                                discount_percent: Number(event.target.value)
                                            }))}
                                        />
                                        <input type={'number'}
                                            placeholder={'Event Final Payable Amount'}
                                            disabled={true}
                                            value={
                                                eventDetails.price && eventDetails.discount_percent ?
                                                    eventDetails.final_amnt : 0
                                            }
                                        />
                                    </> : null
                            }
                            {
                                eventFormErrorMessages.form_not_valid ?
                                    <div className={'error-message'}>
                                        Form Not Valid
                                    </div> : null
                            }
                            <div>
                                <button
                                    disabled={eventFormErrorMessages.form_not_valid}
                                    onClick={() => submitEventForm()}>Submit</button>
                                <button
                                    onClick={() => {
                                        resetEventForm()
                                    }}>Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </> : null
            }
        </>
    )
};

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: (action) => dispatch(action)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventRegister);
