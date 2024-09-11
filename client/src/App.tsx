import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={HomeScreen} />
          <Route path='/cart' Component={CartScreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
