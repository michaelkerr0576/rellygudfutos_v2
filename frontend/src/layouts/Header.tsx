import { Link } from 'react-router-dom';

function Header(): JSX.Element {
  return (
    <header>
      <div>rellygudfutos</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
