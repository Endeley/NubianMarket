import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Message';

import { useGetUsersQuery, useDeleteUserMutation } from '../slices/usersApiSlice';

const UserListPage = () => {
    const navigate = useNavigate();
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are You Sure?!')) {
            try {
                await deleteUser(id);
                refetch();
                toast.success('User Deleted Successfully');
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    };
    return (
        <>
            <h4 className='text-center'>Users</h4>
            {loadingDelete && <Loader />}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped hover responsive className=' table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>

                                <td>{user.isAdmin ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}</td>

                                <td>
                                    {
                                        <>
                                            {' '}
                                            <Button className='btn-sm' variant='light' onClick={() => navigate(`/admin/user/${user._id}/edit`)}>
                                                <FaEdit />
                                            </Button>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <FaTrash style={{ color: 'white' }} />
                                            </Button>
                                        </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListPage;
