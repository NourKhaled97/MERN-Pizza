/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getAllPizzas } from "../../actions/pizzaActions";
import Loading from "../../components/Loading";
import Success from "../../components/Success";
import Error from "../../components/Error";
import { useParams } from "react-router-dom";

export default function EditPizza() {
  const params = useParams();

  const dispatch = useDispatch<any>();

  const [name, setName] = useState('');
  const [smallPrice, setSmallPrice] = useState<number>();
  const [mediumPrice, setMediumPrice] = useState<number>();
  const [largePrice, setLargePrice] = useState<number>();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("veg");


  const pizzasState = useSelector((state: any) => state.getAllPizzasReducer)
  const { pizzas } = pizzasState;

  const editPizzaState = useSelector((state: any) => state.editPizzaReducer);
  const { error, loading, success } = editPizzaState;

  useEffect(() => {
    if (pizzas) {
      const pizza = pizzas.find((item: any) => item._id === params.pizzaId);
      setName(pizza.name);
      setDescription(pizza.description);
      setImage(pizza.image);
      setCategory(pizza.category);
      setSmallPrice(pizza.prices[0]['small']);
      setMediumPrice(pizza.prices[0]['medium']);
      setLargePrice(pizza.prices[0]['large']);
    }
    else {
      dispatch(getAllPizzas())
    }
  }, [pizzas, params.pizzaId])


  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pizza = {
      _id: params.pizzaId,
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      }
    }

    dispatch(editPizza(pizza));
  }

  return (
    <div>
      <h1>Edit Pizza</h1>

      <div style={{ textAlign: 'left' }} className="shadow-lg p-3 mb-5 bg-white rounded">

        {loading && <Loading />}
        {success && <Success message='Pizza edited successfully' />}
        {error && <Error error='Something went wrong' />}


        <form onSubmit={formHandler}>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Small Varient Price"
            value={smallPrice}
            onChange={(e) => setSmallPrice(parseInt(e.target.value))}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Medium Varient Price"
            value={mediumPrice}
            onChange={(e) => setMediumPrice(parseInt(e.target.value))}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Large Varient Price"
            value={largePrice}
            onChange={(e) => setLargePrice(parseInt(e.target.value))}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <select
            className='form-control mt-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>

          <button type="submit" className="btn mt-3">Edit Pizza</button>
        </form>
      </div>
    </div>
  )
}
