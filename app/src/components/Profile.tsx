import { useAuth0 } from '@auth0/auth0-react';
import { useNotes } from '../context/NotesContext';

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  const { myNotes, allNotes } = useNotes();

  const userRoles = user?.[
    `https://${process.env.REACT_APP_AUTH0_AUDIENCE}/roles`
  ] as string[];

  return isAuthenticated && user ? (
    <div className="profile">
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <hr className="separator" />

      {userRoles.includes('admin') && (
        <>
          <button className="button" onClick={allNotes}>
            All users notes
          </button>
          <button className="button" onClick={myNotes}>
            My notes
          </button>
        </>
      )}
    </div>
  ) : null;
};

export default Profile;
