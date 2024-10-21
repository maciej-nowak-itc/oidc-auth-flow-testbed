import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
      <>
       <div id="layoutContainer">
        <div id="sidebar">
          <h2>Athentication Flow</h2>
          <nav>
            <ul>
              <li>
                <Link to={`/auth-code-grant`}>Auth Code Grant Flow</Link>
              </li>
              <li>
                <Link to={`/client-credentials-grant`}>Client Credentials Grant</Link>
              </li>
              <li>
                <Link to={`/device-flow`}>Device Flow</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="workpane">
            <Outlet />
        </div>
        </div>
      </>
    );
  }