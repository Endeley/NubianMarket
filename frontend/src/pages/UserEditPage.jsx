import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateUserMutation, useGetUserDetailsQuery } from '../slices/usersApiSlice';
// ===================================>

// Return
const UserEditPage = () => {
    // ========================Variables

    const { id: userId } = useParams();
    //
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    //
    // <=================> END OF VARIABLE <====================>
    //
    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    //
    const navigate = useNavigate();

    //
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success('User Updated Successfully');
            refetch();
            navigate('/admin/userlist');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };
    // ==================Returns=============
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light'>
                Go Back
            </Link>
            <FormContainer>
                <h1 className='text-center'>Edit User</h1>
                {loadingUpdate && <Loader />}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin' className='my-2'>
                            <Form.Check type='checkbox' label='is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='my-2 '>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};
export default UserEditPage;
