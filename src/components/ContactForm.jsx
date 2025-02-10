import { useEffect, useReducer, useState } from 'react'
import MessageAlert from './MessageAlert'
import './contactForm.css'
import { initialState, reducer } from './reducer';

export default function ContactForm() {
    const [showMessage, setShowMessage] = useState(false);
    const [isSubmitted,setIsSubmitted] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
            if (Object.keys(state).every(key => state[key] !== "" && state[key] !== null && state["acceptrules"] !== false)) {
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            }
    }, [isSubmitted]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "onSubmit", payload: e });
        setIsSubmitted(!isSubmitted);
        console.log(state);
    }
    const handleOnBlur = (e) => {
        dispatch({ type: "onBlur", payload: e });
    }
    const handleOnChange = (e) => {
        dispatch({ type: "onChange", payload: e });
    }

    return (
        <>
            {showMessage && <MessageAlert />}
            <div className='container d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
                <form onSubmit={handleOnSubmit} className='d-flex row bg-body p-2 p-md-4 rounded-4 overflow-auto'>
                    <h1 className='mb-3'>Contact Us</h1>
                    <div className='col-12 row m-0 mb-3'>
                        <div className='form-group col-md-6 col-12 p-0 pe-md-2 pe-lg-4'>
                            <label className='form-label' htmlFor="firstname">First name *</label>
                            <input onBlur={handleOnBlur} className='form-control' type="text" name="firstname" id="firstname" />
                            {state.firstname === "" && <span style={{ color: "red", fontSize: 13 }}>This Field is required</span>}
                        </div>
                        <div className='form-group col-md-6 col-12 p-0 ps-md-2 ps-lg-4'>
                            <label className='form-label' htmlFor="lastname">Last name *</label>
                            <input onBlur={handleOnBlur} className='form-control' type="text" name="lastname" id="lastname" />
                            {state.lastname === "" && <span style={{ color: "red", fontSize: 13 }}>This Field is required</span>}
                        </div>
                    </div>
                    <div className='form-group col-12 mb-3'>
                        <label className='form-label' htmlFor="emailaddress">Email Adress *</label>
                        <input onBlur={handleOnBlur} className='form-control' type="email" name="emailaddress" id="emailaddress" />
                        {state.emailaddress === "" && <span style={{ color: "red", fontSize: 13 }}>Please enter a vaild email address</span>}
                    </div>
                    <div className='col-12 row m-0 mb-3'>
                        <label className='ps-0' htmlFor="generalenq">Query Type *</label>
                        <div className='form-check col-md-6 col-12 p-0 pe-md-2 pe-lg-4'>
                            <div className='form-control text-nowrap overflow-auto'>
                                <input onChange={handleOnChange} type="radio" className='me-2' name="querytype" value="generalenq" id="generalenq" />
                                <label className='form-label' htmlFor="generalenq">General Enquiry</label>
                            </div>
                        </div>
                        <div className='form-check col-md-6 col-12 p-0 ps-md-2 ps-lg-4'>
                            <div className='form-control text-nowrap overflow-auto'>
                                <input onChange={handleOnChange} type="radio" className='me-2' name="querytype" value="supportreq" id="supportreq" />
                                <label className='form-label' htmlFor="supportreq">Support Request</label>
                            </div>
                        </div>
                        {state.querytype === "" && <span style={{ color: "red", fontSize: 13,padding:0 }}>Please select a query type</span>}
                    </div>
                    <div className='form-group col-12 mb-4'>
                        <label className='form-label' htmlFor="messagearea">Message *</label>
                        <textarea onBlur={handleOnBlur} className='form-control' id="messagearea" name="messagearea" rows="5"></textarea>
                        {state.messagearea === "" && <span style={{ color: "red", fontSize: 13 }}>This Field is required</span>}
                    </div>
                    <div className='form-group col-12 mb-4'>
                        <div className='d-flex flex-nowrap'>
                            <input onChange={handleOnChange} className='form-checked-input me-3' type="checkbox" name="acceptrules" id="acceptrules" />
                            <label className='form-checked-label' htmlFor="acceptrules">I consent to being contacted by the team *</label>
                        </div>
                        {state.acceptrules === false && <span style={{ color: "red", fontSize: 13 }}>To submit this form, please consent to being contacted</span>}
                    </div>
                    <button className='btn btn-success col-12 rounded-3' type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}
