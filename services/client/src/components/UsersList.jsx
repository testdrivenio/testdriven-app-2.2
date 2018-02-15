import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const UsersList = (props) => {
  return (
    <div>
      <h1>All Users</h1>
      <hr/><br/>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Active</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {
            props.users && props.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{String(user.active)}</td>
                  <td>{String(user.admin)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool.isRequired,
      admin: PropTypes.bool.isRequired,
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      scores: PropTypes.array.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default UsersList;
