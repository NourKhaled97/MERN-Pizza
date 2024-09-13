import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout"
import { placeOrder } from "../actions/orderAction";

export default function Checkout(props: { subtotal: number }) {
    const dispatch = useDispatch<any>();

    const tokenHandler = (token: any) => {
        console.log(token);
        dispatch(placeOrder(token, props.subtotal))
    }

    return (
        <div>
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
