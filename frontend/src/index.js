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

//
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomePage />} />
            <Route path='/product/:_id' element={<ProductDetailsPage />} />
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
