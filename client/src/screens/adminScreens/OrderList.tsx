/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../../actions/orderAction";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

export default function OrderList() {
  const dispatch = useDispatch<any>();

  const getOrdersState = useSelector((state: any) => state.getAllOrdersReducer);
  const { loading, error, orders } = getOrdersState

  useEffect(() => {
    dispatch(getAllOrders())
  }, []);

  return (
    <div>
      <h2>Orders List</h2>

      {loading && <Loading />}
      {error && <Error error='Something went wrong' />}

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Order Id</th>
              <th>Email</th>
              <th>User Id</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders && Array.isArray(orders) && orders.map((order: any) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.userId}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isDelivered ?
                      <p><strong>Delivered</strong> </p>
                      : <button className="btn" onClick={() => { dispatch(deliverOrder(order._id)) }}>Deliver</button>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div >
  )
}
