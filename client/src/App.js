import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Login'
import Logout from './pages/Auth/Logout'
import './index.css'
import 'react-calendar/dist/Calendar.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useState, createContext, useMemo } from 'react';
import Classes from './components/Classes/Class'
import User from './components/User/User';
import Dashboard from './components/Dashboard/Dashboard';
import Teacher from './components/Teacher/Teacher';
import Student from './components/Students/Student';
import Subject from './components/Subject/Subject'
import Class_schedule from './components/Class_schedule/Class_schedule';
import Profile from './components/Profile/Profile';
export const AppContext = createContext();

function App() {
  const [profile, setProfile] = useState({})
  const isAdmin = useMemo(() => {
    return profile.isAdmin
  }, [profile])
  const isUser = useMemo(() => {
    return profile.isUser
  }, [profile])
  return (
    <AppContext.Provider value={{ profile, setProfile, isAdmin, isUser }}>
      <Router>
        <Routes>
          <Route exact path='/login' element={<Auth />} />
          <Route exact path='/logout' element={<Logout />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/user' element={<User />} />
          <Route path='/home/class' element={<Classes />} />
          <Route path='/home/dashboard' element={<Dashboard />} />
          <Route path='/home/profile' element={<Profile />} />
          <Route path='/home/teacher' element={<Teacher />} />
          <Route path='/home/student' element={<Student />} />
          <Route path='/home/subject' element={<Subject />} />
          <Route path='/home/class_schedule' element={<Class_schedule />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}
export default App;