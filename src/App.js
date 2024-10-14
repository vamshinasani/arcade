import './App.css';
import TicTacToe from './games/TicTacToe';
import DotsAndConnect from './games/DotsAndConnect';
import Home from './games/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  // const routes = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/">
  //       <Route index element={<Home />} />
  //       <Route path='/tictactoe' element={<TicTacToe />} />
  //       <Route path='/dotsandconnect' element={<DotsAndConnect />} />
  //     </Route>)
  // )
  return (
    <div className="App">
      <BrowserRouter basename='/arcade'>
        <Routes>
          <Route exact path="/arcade" element={<Home />} />
          <Route path='/tictactoe' element={<TicTacToe />} />
          <Route path='/dotsandconnect' element={<DotsAndConnect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

