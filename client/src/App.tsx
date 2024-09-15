import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavbarComponent from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OrdersScreen from './screens/OrdersScreen';
import AdminScreen from './screens/AdminScreen';
import UsersList from './screens/adminScreens/UsersList';
import PizzasList from './screens/adminScreens/PizzasList';
import AddPizza from './screens/adminScreens/AddPizza';
import OrderList from './screens/adminScreens/OrderList';
import EditPizza from './screens/adminScreens/EditPizza';

function App() {
  return (
    <div className="App">

      <NavbarComponent />

      <BrowserRouter>
        <Routes>
          <Route path='/' Component={HomeScreen} />
          <Route path='/cart' Component={CartScreen} />
          <Route path='/login' Component={LoginScreen} />
          <Route path='/register' Component={RegisterScreen} />
          <Route path='/orders' Component={OrdersScreen} />
          <Route path='/admin' Component={AdminScreen} >
            <Route path="" Component={UsersList} />
            <Route path="userslist" Component={UsersList} />
            <Route path="pizzaslist" Component={PizzasList} />
            <Route path="addnewpizza" Component={AddPizza} />
            <Route path="orderslist" Component={OrderList} />
            <Route path="editpizza/:pizzaId" Component={EditPizza} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
