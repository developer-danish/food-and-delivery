import { BrowserRouter, Routes, Route, Switch, HashRouter, Router } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import NotFound from './NotFound';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';


const App = () => (
  <BrowserRouter>
    <Header />
    {/* <main> */}
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route exact  path="/signin" element={<Signin />} />
        <Route exact  path="/signup" element={<Signup></Signup>} />
        <Route exact  path="/admin/dashboard" element={<AdminDashboard></AdminDashboard>} />
        <Route exact  path="/user/dashboard" element={<UserDashboard></UserDashboard>} />
        <Route exact path="*" element={<NotFound></NotFound>} />
      </Routes>
      
    {/* </main> */}
  </BrowserRouter>
);

export default App;
