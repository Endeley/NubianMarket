import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
// import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const goToCart = () => {
        navigate('/cart');
    };
    const goToLogIn = () => {
        navigate('/login');
    };
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <Navbar.Brand onClick={() => navigate('/')}>Nubian Market</Navbar.Brand>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link onClick={goToCart}>
                                <FaShoppingCart />
                                Cart
                            </Nav.Link>

                            <Nav.Link onClick={goToLogIn}>
                                <FaUser />
                                Sign In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
