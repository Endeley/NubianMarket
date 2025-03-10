import { useGetProductsQuery } from '../slices/productApiSlice';
import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginations from '../components/Paginations';
import ProductCarousel from '../components/ProductCarousel';

const HomePage = () => {
    const { keyword, pageNumber = '1' } = useParams();
    const { data, error, isLoading } = useGetProductsQuery({ keyword, pageNumber: Number(pageNumber) });

    return (
        <>
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to='/' className='btn btn-light m-4'>
                    Go Back
                </Link>
            )}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {data?.products?.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                                <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                            </Col>
                        ))}
                    </Row>
                    <Paginations pages={data.pages} page={data.page} keyword={keyword || ''} />
                </>
            )}
        </>
    );
};

export default HomePage;
