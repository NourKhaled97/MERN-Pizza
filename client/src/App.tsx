import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavbarComponent from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OrdersScreen from './screens/OrdersScreen';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
