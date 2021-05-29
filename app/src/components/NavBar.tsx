const NavBar: React.FC = ({ children }) => (
  <div className="navbar">
    <span className="page-name">Auth0 x React</span>
    {children}
  </div>
);

export default NavBar;
