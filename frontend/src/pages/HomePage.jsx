import { useGetProductsQuery } from '../slices/productApiSlice';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

const HomePage = () => {
    const { data: products = [], error, isLoading } = useGetProductsQuery();

    return (
        <>
            {isLoading ? (
                <h3>Loading...</h3>
            ) : error ? (
                <div>{error?.data?.message || error.error}</div>
            ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {products.map((product) => (
                            <Col key={product.name} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default HomePage;
