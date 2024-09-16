import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pizza from '../components/Pizza';
import { getAllPizzas } from '../actions/pizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Filter from '../components/Filter';

export default function HomeScreen() {
    const dispatch = useDispatch<any>();

    const pizzasState = useSelector((state: any) => state.getAllPizzasReducer)

    const { pizzas, error, loading } = pizzasState;

    useEffect(() => {
        dispatch(getAllPizzas())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Filter />

            <div className='row justify-content-center m-3'>

                {loading ?
                    (<Loading />)
                    : error ?
                        (<Error error="Something went wrong" />)
                        : (
                            pizzas && pizzas.map((pizza: any) => {
                                return (
                                    <div key={pizza._id} className='col-md-6 col-lg-4'>
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
