/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom";

export default function AdminScreen() {

    const userState = useSelector((state: any) => state.loginUserReducer);
    const { currentUser } = userState;

    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = "/"
        }
    }, [])

    return (
        <div>
            <div className="row justify-content-center p-3">
                <div className="col-md-10">
                    <h2 style={{ fontSize: '35px' }}>Admin Panel</h2>

                    <ul className="adminFunctions">
                        <li><Link to="/admin/userslist">Users List</Link></li>
                        <li><Link to="/admin/pizzaslist">Pizzas List</Link></li>
                        <li><Link to="/admin/addnewpizza">Add New Pizza</Link></li>
                        <li><Link to="/admin/orderslist">Orders List</Link></li>
                    </ul>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}
