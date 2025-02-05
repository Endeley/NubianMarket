import { Spinner } from 'react-bootstrap';
import React from 'react';

const Loader = () => {
    return <Spinner animation='border' role='output' style={{ width: 100, height: 100, margin: 'auto', display: 'block' }}></Spinner>;
};

export default Loader;
