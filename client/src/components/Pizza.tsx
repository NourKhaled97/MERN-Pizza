import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from "react-redux"
import { addToCart } from '../actions/cartActions';
import AOS from 'aos';

export default function Pizza(pizza: any) {
    AOS.init({
        duration: 500,
    });

    const [varient, setVarient] = useState('small')
    const [quantity, setQuantity] = useState(1)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch<any>();

    const addPizzaToCart = () => {
        dispatch(addToCart(pizza.pizza, quantity, varient))
    }

    return (
        <div
            data-aos='zoom-in'
            style={{ margin: '70px' }}
            className='shadow-lg p-3 mb-5 bg-white rounded'
        >
            <div onClick={handleShow}>
                <h1>{pizza.pizza.name}</h1>
                <img
                    src={pizza.pizza.image}
                    alt={pizza.pizza.image}
                    className='img-fluid'
                    style={{ height: '200px', width: '200px' }}
                />
            </div>

            <div className='flex-container'>
                <div className='w-100 m-1'>
                    <p>Varients</p>
                    <select className='form-control' value={varient} onChange={(e) => setVarient(e.target.value)}>
                        {pizza.pizza.varients.map((varient: string) => {
                            return <option key={varient} value={varient}>{varient}</option>
                        })}
                    </select>
                </div>
                <div className='w-100 m-1'>
                    <p>Quantity</p>
                    <select className='form-control' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                        {Array.from(Array(10).keys()).map((x, i) => {
                            return <option key={i + 1} value={i + 1}>{i + 1}</option>
                        })}
                    </select>
                </div>
            </div>

            <div className='flex-container'>
                <div className='w-100 m-1'>
                    <h1 className='mt-1'>Price: {pizza.pizza.prices[0][varient] * quantity}$</h1>
                </div>
                <div className='w-100 m-1'>
                    <button className='btn' onClick={addPizzaToCart}>
                        ADD TO CART
                    </button>
                </div>
            </div>


            {/* Model */}
            <Modal show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{pizza.pizza.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={pizza.pizza.image}
                        alt={pizza.pizza.image}
                        className='img-fluid'
                        style={{ height: '400px', width: '400px' }}
                    />
                    <p>{pizza.pizza.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CLOSE
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
