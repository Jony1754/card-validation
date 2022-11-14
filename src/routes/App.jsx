import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Login } from '../pages/Login';
import { useState } from 'react';
function App() {
  const [isLogged, setIsLogged] = useState(false);

  if (!isLogged) {
    return (
      <div className='App'>
        <Login setIsLogged={setIsLogged} />
      </div>
    );
  }

  return (
    <div className='App'>
      <Navbar />
      <Sidebar />
    </div>
  );
}

export default App;
