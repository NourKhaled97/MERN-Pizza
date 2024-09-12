import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';

export default function CartScreen() {

    const cartState = useSelector((state: any) => state.cartReducer);
    const cartItems = cartState.cartItems;

    const dispatch = useDispatch<any>();

    var subTotal = cartItems.reduce((x: number, cart: any) => x + cart.price, 0)

    return (
        <div>
            <div className="row">
                <div className="col-md-6 ms-5">
                    <h2 style={{ fontSize: '40px' }}>My Cart</h2>

                    {cartItems.map((cart: any) => {
                        return (
                            <div key={cart._id}>
                                <div className="flex-container">
                                    <div style={{ textAlign: 'left', margin: '10px', flex: '1' }}>
                                        <h1>{cart.name} [{cart.varient}]</h1>
                                        {/* <h1>Price: {cart.quantity} * {cart.price} = {cart.price * cart.quantity}</h1> */}
                                        <h1>Price: {cart.quantity} * {cart.prices[0][cart.varient]} = {cart.price}</h1>
                                        <h1>Qunatity:
                                            <i className="fas fa-plus"
                                                onClick={() => dispatch(addToCart(cart, cart.quantity + 1, cart.varient))}
                                            ></i>
                                            {cart.quantity}
                                            <i className="fa fa-minus"
                                                onClick={() => dispatch(addToCart(cart, cart.quantity - 1, cart.varient))}
                                            ></i>
                                        </h1>
                                    </div>

                                    <div className='m-1'>
                                        <img src={cart.image} alt={cart.image} style={{ height: '80px', width: '80px', marginTop: '20px' }} />
                                    </div>

                                    <div className='m-1'>
                                        <i className="fa fa-trash mt-5"
                                            onClick={() => dispatch(deleteFromCart(cart))}
                                        ></i>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </div>

                <div className="col-md-4" style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '45px' }}>Subtotal: {subTotal}$</h2>
                    <Checkout subtotal={subTotal} />
                </div>
            </div>
        </div>
    )
}
