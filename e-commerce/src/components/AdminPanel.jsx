import React from "react";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <div className="admin-card">
        <h2>Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <input type="text" defaultValue="John Doe" />
              </td>
              <td>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="admin-card">
        <h2>Orders</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>
                <input type="text" defaultValue="Pending" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="admin-card">
        <h2>Products</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>201</td>
              <td>
                <input type="text" defaultValue="Laptop" />
              </td>
              <td>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
