import { useAuth0 } from '@auth0/auth0-react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <>
      <button
        className="button navbar-action-text"
        onClick={(): void => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
      <FaSignOutAlt
        onClick={(): void => logout({ returnTo: window.location.origin })}
        className="navbar-action-icon circular-button"
      ></FaSignOutAlt>
    </>
  );
};

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button
        className="button navbar-action-text"
        onClick={(): Promise<void> => loginWithRedirect()}
      >
        Log In
      </button>
      <FaSignInAlt
        onClick={(): Promise<void> => loginWithRedirect()}
        className="navbar-action-icon circular-button"
      ></FaSignInAlt>
    </>
  );
};

const AuthButton: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <LogoutButton></LogoutButton>
  ) : (
    <LoginButton></LoginButton>
  );
};

export default AuthButton;
