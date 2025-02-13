import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/custom.style.css';
import './assets/styles/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProductDetailsPage from './pages/ProductDetailsPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PrivateRoute from './components/PrivateRoute';
import PaymentPage from './pages/PaymentPage';

//
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomePage />} />
            <Route path='/product/:_id' element={<ProductDetailsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='' element={<PrivateRoute />}>
                <Route path='/shipping' element={<ShippingPage />} />
                <Route path='/payment' element={<PaymentPage />} />
            </Route>
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
