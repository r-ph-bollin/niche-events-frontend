import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "../index.css";

import { Button } from "semantic-ui-react";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h3>
            Berlin
            <br />
            Niche
            <br />
            Events
          </h3>
        </Link>
        <div>
          <span>
            <Link to="/">
              <Button className="datefilterbutton">
                <p>Today</p>
              </Button>
            </Link>
            <Link to="/tomorrow">
              <Button className="datefilterbutton">
                <p>Tomorrow</p>
              </Button>
            </Link>
            {/*<br />*/}
            <br />
            <Link to="/dayAfterTomorrow">
              <Button className="datefilterbutton">
                <p>In 2 days</p>
              </Button>
            </Link>
            <Link to="/twoDaysAfterTomorrow">
              <Button className="datefilterbutton">
                <p>In 3 days</p>
              </Button>
            </Link>
          </span>
        </div>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              <Link className="alertbutton" to="/editor">
                Manage events
              </Link>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <br /> <br />
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
