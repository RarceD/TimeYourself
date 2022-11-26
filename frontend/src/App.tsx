import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Manage from './pages/Manage';
import Visualize from './pages/Visualize';

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/visualize" element={<Visualize  />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/config" element={<Config />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
