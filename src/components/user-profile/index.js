import { useState, useEffect, useCallback } from 'react';
import { userContext } from '@store/user/user-context';
import classNames from '@components/user-profile/user-profile.module.scss';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    user,
    isSuperUser,
    isSuperUserMode,
    setIsSuperUserMode,
    setUserPrivileges,
  } = userContext();

  const memoizeUserPrivilege = useCallback(async () => {
    await setUserPrivileges();
    setIsLoading(false);
  }, [setUserPrivileges, setIsLoading]);

  useEffect(() => {
    memoizeUserPrivilege();
  }, [memoizeUserPrivilege]);

  const showSuperUserOptions = () => {
    return (
      <>
        <input
          type="checkbox"
          defaultChecked={isSuperUserMode}
          onChange={() => setIsSuperUserMode(!isSuperUserMode)}
        />
        <span> Show super user options</span>
      </>
    );
  };

  if (!isLoading && isSuperUser && user)
    return (
      <div className={classNames.superUserOptions}>
        <p>
          Hello {user.first_name} {user.last_name}
        </p>
        {showSuperUserOptions()}
      </div>
    );
  return <div />;
};

export default UserProfile;
