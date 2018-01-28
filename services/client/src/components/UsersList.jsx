import React from 'react';
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
            <th>Email</th>
            <th>Username</th>
            <th>Active</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {
            props.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
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

export default UsersList;
