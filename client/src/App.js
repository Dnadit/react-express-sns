import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Write from './pages/Write';

function App() {
  return (
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/write' Component={Write} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
