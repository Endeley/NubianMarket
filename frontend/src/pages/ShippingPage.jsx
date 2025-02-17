import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { saveShippingAddress } from '../slices/cartSlice';
import { Form, Button } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const ShippingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { shippingAddress } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment'); // This will only work inside a Router
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='mt-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId='city' className='mt-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId='postalCode' className='mt-3'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter postal code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId='country' className='mt-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter country' value={country} onChange={(e) => setCountry(e.target.value)} required />
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingPage;
