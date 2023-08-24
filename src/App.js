
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Movie from './Components/Movie/Movie';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Combo from './Components/Combo/Combo';
import Theater from './Components/Theater/Theater';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Bookchair from './Components/BookChair/Bookchair';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Bank from './Components/Bank/Bank';
import History from './Components/History/History';
import PrivateRoute from './Components/Common/PrivateRoute';
import MovieComingSoon from './Components/Home/MovieComingSoon';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/movivedetails' element={<MovieDetails />} />
          <Route path='/combo' element={<PrivateRoute><Combo /></PrivateRoute>} />
          <Route path='/theater' element={<Theater />} />
          <Route path='/bookchair' element={<PrivateRoute><Bookchair /></PrivateRoute>} />
          <Route path='/bank' element={<PrivateRoute><Bank /></PrivateRoute>} />
          <Route path='/history' element={<PrivateRoute><History /></PrivateRoute>} />
          <Route path='/moviecomingsoon' element={<MovieComingSoon />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
