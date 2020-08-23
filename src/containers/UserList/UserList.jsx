import React, { useEffect, useState } from "react";
import "./style.scss";
import { getUsers } from "../../services/AdminService";
import { Link } from "react-router-dom";


function UserList() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => {
      setUsers(res.data)
    }).catch(err => {
      throw new Error(err.message);
    })
  }, []);


  return (
    <main>
      <div className="container">
        <h2 className="user-list__header">Список пользователей</h2>
        <ul className="user-list">
          {
            users.map((user, i) => {
              return (
                <Link key={i} to={"/admin/users/" + user}>
                  <li className="user-list__user">{user}</li>
                </Link>
              )
            })
          }
        </ul>
      </div>
    </main>
  )
}

export default UserList;