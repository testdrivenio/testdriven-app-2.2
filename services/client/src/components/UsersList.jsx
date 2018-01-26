import React from 'react';

const UsersList = (props) => {
  return (
    <div>
      {
        props.users.map((user) => {
          return (
            <h4
              key={user.id}
              className="card card-body bg-light"
            >{user.username}
            </h4>
          )
        })
      }
    </div>
  )
};

export default UsersList;
