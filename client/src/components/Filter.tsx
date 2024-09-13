import { useState } from "react";
import { useDispatch } from "react-redux";
import { getFilterPizzas } from "../actions/pizzaActions";

export default function Filter() {
  const [searchKey, setSearchKey] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");

  const dispatch = useDispatch<any>();

  const onFilter = () => {
    dispatch(getFilterPizzas(searchKey, searchCategory))
  }

  return (
    <div className="container">
      <div className="row justify-content-center  shadow-lg p-3 mb-5 bg-white rounded">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Pizzas"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select className='form-control mt-2'
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>
        </div>

        <div className="col-md-3">
          <button
            className="btn w-100 mt-2"
            onClick={onFilter}
          >FILTER</button>
        </div>
      </div>
    </div>
  )
}
