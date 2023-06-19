import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Write from './pages/Write';
import Login from './pages/Login';
import Join from './pages/Join';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/write' Component={Write} />
        <Route path='/login' Component={Login} />
        <Route path='/join' Component={Join} />
        <Route path='/profile' Component={Profile} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

