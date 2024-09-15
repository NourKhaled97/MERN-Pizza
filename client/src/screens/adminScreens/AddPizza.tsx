import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../../actions/pizzaActions";
import Loading from "../../components/Loading";
import Success from "../../components/Success";
import Error from "../../components/Error";

export default function AddPizza() {
  const dispatch = useDispatch<any>();

  const [name, setName] = useState('');
  const [smallPrice, setSmallPrice] = useState<number>();
  const [mediumPrice, setMediumPrice] = useState<number>();
  const [largePrice, setLargePrice] = useState<number>();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("veg");


  const addPizzaState = useSelector((state: any) => state.addPizzaReducer);
  const { error, loading, success } = addPizzaState;


  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pizza = {
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
    
    dispatch(addPizza(pizza));
  }

  return (
    <div>
      <h1>Add Pizza</h1>
      
      <div style={{ textAlign: 'left' }}>

        {loading && <Loading />}
        {success && <Success message='New Pizza added successfully' />}
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

          <button type="submit" className="btn mt-3">Add Pizza</button>
        </form>
      </div>
    </div>
  )
}
