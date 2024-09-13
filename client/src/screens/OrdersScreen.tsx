/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderAction";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function OrdersScreen() {

    const ordersState = useSelector((state: any) => state.getUserOrdersReducer);
    const { loading, error, orders } = ordersState;

    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(getUserOrders())
    }, [])

    return (
        <div>
            <h2 style={{ fontSize: "35px" }}>My Orders</h2>
            <hr />

            <div className="row justify-content-center">

                {loading && <Loading />}
                {error && <Error error='Something went wrong' />}

                {orders && orders.map((order: any) => {
                    return <div key={order._id} className="col-md-8 m-2 p-1" style={{ backgroundColor: 'red', color: "white" }}>
                        <div className="flex-container">
                            <div style={{ textAlign: 'left' }} className="w-100 m-1">
                                <h2 style={{ fontSize: '25px' }}>Items</h2>
                                <hr />
                                {order.orderItems && order.orderItems.map((item: any) => {
                                    return <div key={item._id}>
                                        <p>{item.name} [{item.varient}] * {item.quantity} = {item.price}</p>
                                    </div>
                                })}
                            </div>

                            <div style={{ textAlign: 'left' }} className="w-100 m-1">
                                <h2 style={{ fontSize: '25px' }}>Address</h2>
                                <hr />
                                <p>Street: {order.shippingAddress.street}</p>
                                <p>City: {order.shippingAddress.city}</p>
                                <p>Country: {order.shippingAddress.country}</p>
                                <p>Pincode: {order.shippingAddress.pincode}</p>
                            </div>

                            <div style={{ textAlign: 'left' }} className="w-100 m-1">
                                <h2 style={{ fontSize: '25px' }}>Order Info</h2>
                                <hr />
                                <p>Order Amount: {order.orderAmount}</p>
                                <p>Date: {order.createdAt.substring(0, 10)}</p>
                                <p>Transaction Id: {order.transactionId}</p>
                                <p>Order Id: {order._id}</p>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}
