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
                currency='inr'
                label="Pay Now"
                ComponentClass="btn"
                stripeKey="pk_test_51PyBuHGBRsgl6h5sv77ENRUN81mCpiPvY4WCiPI2JN5U4xz2lLydEFOYTUXxV2Avwt9T0cdX0mzJaiFMIamlMzRL00kYcxOLUo"
            />
        </div>
    )
}
