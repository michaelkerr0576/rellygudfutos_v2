import { Link } from 'react-router-dom';

function Header(): JSX.Element {
  return (
    <header>
      <div>rellygudfutos</div>
      <ul>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/gallery/123">Gallery Photo</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/admin/login">Login</Link>
        </li>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
