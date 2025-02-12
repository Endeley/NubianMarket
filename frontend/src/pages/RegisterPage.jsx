import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    // ✅ Extract userInfo correctly
    const { userInfo } = useSelector((state) => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                console.log('register Response:', res);
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                toast.success('Registration successful');
            } catch (error) {
                console.error('register Error:', error);
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='mt-3 '>
                    <Form.Label>confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
                    Register
                </Button>
                {isLoading && <Loader />}
            </Form>

            <Row className='py-3'>
                <Col>
                    Already Have an account?{''} <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterPage;
