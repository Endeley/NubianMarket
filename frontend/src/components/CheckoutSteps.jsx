/*import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center md-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login' className='text-decoration-underline'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Sign In</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
*/
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const navigate = useNavigate();

    return (
        <Nav className='justify-content-center md-4'>
            <Nav.Item>
                {step1 ? (
                    <Nav.Link onClick={() => navigate('/login')} style={{ textDecoration: 'underline', textDecorationColor: 'orange', textDecorationThickness: '2px' }}>
                        Sign In
                    </Nav.Link>
                ) : (
                    <Nav.Link disabled>Sign In</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <Nav.Link onClick={() => navigate('/shipping')} style={{ textDecoration: 'underline', textDecorationColor: 'orange', textDecorationThickness: '2px' }}>
                        Shipping
                    </Nav.Link>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <Nav.Link onClick={() => navigate('/payment')} style={{ textDecoration: 'underline', textDecorationColor: 'orange', textDecorationThickness: '2px' }}>
                        Payment
                    </Nav.Link>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <Nav.Link onClick={() => navigate('/placeorder')} style={{ textDecoration: 'underline', textDecorationColor: 'orange', textDecorationThickness: '2px' }}>
                        Place Order
                    </Nav.Link>
                ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
