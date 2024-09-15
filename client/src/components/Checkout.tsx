import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout"
import { placeOrder } from "../actions/orderAction";
import Loading from "./Loading";
import Success from "./Success";
import Error from "./Error";

export default function Checkout(props: { subtotal: number }) {
    const dispatch = useDispatch<any>();

    const orderState = useSelector((state: any) => state.placeOrderReducer);
    const { loading, error, success } = orderState

    const tokenHandler = (token: any) => {
        dispatch(placeOrder(token, props.subtotal))
    }

    return (
        <div>

            {loading && <Loading />}
            {success && <Success message='Your Order Placed successfully' />}
            {error && <Error error='Something went wrong' />}

            <StripeCheckout
                amount={props.subtotal * 100}
                shippingAddress
                token={tokenHandler}
                currency='INR'
                label="Pay Now"
                ComponentClass="btn"
                stripeKey={process.env.REACT_APP_PUBLIC_KEY || ""}
            />
        </div>
    )
}
