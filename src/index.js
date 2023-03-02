import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Item from './Item';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "item/:id",
    element: <Item />,
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>    
  <RouterProvider router={router} />  
  </React.StrictMode>
);


