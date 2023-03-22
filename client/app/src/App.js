import './App.css';
import { Route, Routes} from 'react-router-dom';
import SideBar from './components/Sidebar';

function App() {
  return (
    <div className="container-fluid">
      <SideBar />
    </div>
  );
}

export default App;