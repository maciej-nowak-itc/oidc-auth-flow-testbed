import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./pages/RoutingErrorPage";
import DeviceCodeFlow from './pages/DeviceCodeFlow';
import AuthCodeGrantFlow from './pages/AuthCodeGrantFlow';
import ClientCredentialsGrantFlow from './pages/ClientCredentialsGrantFlow';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth-code-grant",
        element: <AuthCodeGrantFlow />,
      },
      {
        path: "/client-credentials-grant",
        element: <ClientCredentialsGrantFlow />,
      },
      {
        path: "/device-flow",
        element: <DeviceCodeFlow />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
