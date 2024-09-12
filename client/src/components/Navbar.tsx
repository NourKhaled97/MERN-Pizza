/* eslint-disable jsx-a11y/anchor-is-valid */
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../actions/userAction";

export default function NavbarComponent() {
    const cartState = useSelector((state: any) => state.cartReducer);
    const userState = useSelector((state: any) => state.loginUserReducer);

    const { cartItems } = cartState;
    const { currentUser } = userState;

    const dispatch = useDispatch<any>();

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary shadow-lg p-3 mb-5 bg-white rounded">
                <Navbar.Brand href="/">SHEY PIZZA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {currentUser
                            ? (
                                <NavDropdown title={currentUser.name} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/">Orders</NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <li onClick={() => dispatch(logoutUser())}>Logout</li>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )
                            : (
                                <Nav.Link href="/login">Login</Nav.Link>
                            )}
                        <Nav.Link href="/cart">Cart {cartItems.length}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
