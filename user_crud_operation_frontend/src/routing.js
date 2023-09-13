import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from  './commonComponents/Header';
import User from './components/User';
import ListUsers from './components/listUser';
import AddUser from './components/addUser';
import UpdateUser from './components/updateUser';

const Routing = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/all-user" element={<ListUsers />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
}

export default Routing;