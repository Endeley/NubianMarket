import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice'; // ✅ Correct import
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [logoutUser] = useLogoutMutation(); // API call for logout

    const goToCart = () => {
        navigate('/cart');
    };

    const goToLogIn = () => {
        navigate('/login');
    };
    const goToProductList = () => {
        navigate('/admin/productlist');
    };
    const goToUserList = () => {
        navigate('/admin/userlist');
    };
    const goToAdminOrderList = () => {
        navigate('/admin/orderlist');
    };

    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap(); // If API logout exists
            dispatch(logout()); // Clears Redux state
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <Navbar.Brand onClick={() => navigate('/')} className='logo'>
                        Nubian Market
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link onClick={goToCart}>
                                <FaShoppingCart />
                                Cart
                                {cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                        {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                                    </Badge>
                                )}
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link onClick={goToLogIn}>
                                    <FaUser />
                                    Sign In
                                </Nav.Link>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <NavDropdown.Item as='div' onClick={goToProductList}>
                                        Products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as='div' onClick={goToUserList}>
                                        Users
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as='div' onClick={goToAdminOrderList}>
                                        Orders
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
