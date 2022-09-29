import Link from 'next/link';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  return (
    <NavStyles>
      {user && (
        <>
          <Link href="/families">Families</Link>
          <Link href="/zones">Zones</Link>
          <Link href="/groups">Groups</Link>
          <Link href="/students">Students</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
