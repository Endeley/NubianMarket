import products from '../products';
import { useParams, Link } from 'react-router-dom';

import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductDetailsPage = () => {
    const { _id: productId } = useParams();
    const product = products.find((p) => p._id === productId);
    console.log(product);
    return (
        <>
            <Link className='btn btn-light my-3  ' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description : </strong>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-blobk' type='button' disabled={product.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};
export default ProductDetailsPage;
