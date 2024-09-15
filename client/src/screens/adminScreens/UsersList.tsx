/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../actions/userAction";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

export default function UsersList() {
  const dispatch = useDispatch<any>();

  const getUsersState = useSelector((state: any) => state.getAllUsersReducer);
  const { loading, error, users } = getUsersState

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div>
      <h2>Users List</h2>

      {loading && <Loading />}
      {error && <Error error='Something went wrong' />}

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users && users.map((user: any) => {
            return (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <i
                    className="fa fa-trash m-1"
                    onClick={() => { dispatch(deleteUser(user._id)) }}
                  ></i>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
