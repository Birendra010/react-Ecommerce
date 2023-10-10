import React from "react";
// import { Counter } from './features/counter/Counter';
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";

import ProductDetailPage from "./pages/productDetailsPage";
import Protected from "./features/auth/components/Protected";

const router = createBrowserRouter([
  
  { path: "/login", element: <LoginPage /> },
  
  { path: "/signup", element: <SignupPage /> },
  
  {
    path: "/",
    element: (<Protected>  <Home /></Protected>),
  },
  {
    path: "/cart",
    element: (<Protected><CartPage /></Protected> ),
  },

  {
    path: "/checkout",
    element: ( <Protected> <Checkout /> </Protected>),
  },
  {
    path: "/product-details/:id",
    element: (<Protected><ProductDetailPage /></Protected>),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
