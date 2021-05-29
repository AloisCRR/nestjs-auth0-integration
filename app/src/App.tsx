import { Auth0Provider } from '@auth0/auth0-react';
import AuthButton from './components/AuthButton';
import CreateButton from './components/CreateButton';
import NavBar from './components/NavBar';
import Notes from './components/Notes';
import Profile from './components/Profile';
import { NotesProvider } from './context/NotesContext';

function App(): JSX.Element {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      redirectUri={window.location.origin}
      audience={`https://${process.env.REACT_APP_AUTH0_AUDIENCE as string}`}
      scope="openid profile email read:notes create:notes update:notes delete:notes"
    >
      <NotesProvider>
        <NavBar>
          <div className="center">
            <CreateButton></CreateButton>
            <AuthButton></AuthButton>
          </div>
        </NavBar>
        <main className="main-flex">
          <Notes></Notes>
          <Profile></Profile>
        </main>
      </NotesProvider>
    </Auth0Provider>
  );
}

export default App;
