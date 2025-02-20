import React from 'react';
import Card from '@components/member-card';
import PropTypes from 'prop-types';
import styles from '@components/new-members/new-members.module.scss';
import { membersContext } from '@store/members/members-context';
import { searchMemberContext } from '@store/search-members/searchMembers-context';
import { searchMembers } from '@helper-functions/search-members';
import Link from 'next/link';
import { userContext } from '@store/user/user-context';

// returns card which shows details of new member
const renderNewUserCard = (newMember, isOptionKey) => {
  return (
    <div className={styles.containerForNewMember}>
      <Card
        developerInfo={newMember}
        isMember={false}
        isOptionKey={isOptionKey}
      />
    </div>
  );
};

const renderNewUser = (newMember, isOptionKey) => {
  const { isSuperUser } = userContext();
  if (isSuperUser && isOptionKey) {
    return (
      <Link
        prefetch={false}
        href={{
          pathname: '/[id]',
        }}
        as={`/${newMember.username}`}
        key={newMember.username}
      >
        {renderNewUserCard(newMember, isOptionKey)}
      </Link>
    );
  }
  return renderNewUserCard(newMember, isOptionKey);
};

const NewMemberList = ({ isOptionKey }) => {
  const {
    state: { newMembers },
  } = membersContext();
  const { searchTerm } = searchMemberContext();
  const filterMembers = searchMembers(newMembers, searchTerm);
  if (newMembers) {
    return (
      <div className={styles.container}>
        {filterMembers.map((newMember) => (
          <React.Fragment key={newMember.id}>
            {renderNewUser(newMember, isOptionKey)}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
};

export default NewMemberList;

NewMemberList.propTypes = {
  isOptionKey: PropTypes.bool,
};
NewMemberList.defaultProps = {
  isOptionKey: false,
};
