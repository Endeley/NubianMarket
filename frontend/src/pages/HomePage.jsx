import { useGetProductsQuery } from '../slices/productApiSlice';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
    const { data: products = [], error, isLoading } = useGetProductsQuery();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                                <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default HomePage;
