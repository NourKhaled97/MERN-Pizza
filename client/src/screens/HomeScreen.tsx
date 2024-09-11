import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pizza from '../components/Pizza';
import { getAllPizzas } from '../actions/pizzaActions';

export default function HomeScreen() {
    const dispatch = useDispatch<any>();

    const pizzasState = useSelector((state: any) => state.getAllPizzasReducer)

    const { pizzas, error, loading } = pizzasState;

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])

    return (
        <div>
            <div className='row justify-content-center m-3'>
                {loading ?
                    (<h1>Loading ...</h1>)
                    : error ?
                        (<h1>Something went wrong</h1>)
                        : (
                            pizzas && pizzas.map((pizza: any) => {
                                return (
                                    <div key={pizza._id} className='col-md-4'>
                                        <Pizza pizza={pizza} />
                                    </div>
                                )
                            })
                        )
                }
            </div>
        </div>
    )
}
