import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Navbar from './pages/Navbar';
import { useState } from 'react';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import UpdatePassword from './pages/UpdatePassword';
import OpenRoute from "./components/core/Authentication/OpenRoute"
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/Authentication/PrivateRoute';
import Error from "./pages/Error"
import Setting from './components/core/Dashboard/Setting';
import Cart from './components/core/Dashboard/Cart/index';
import About from "./pages/About";
import Dashboard from './pages/Dashboard';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import {ACCOUNT_TYPE} from "./utils/constants"
import { useSelector } from 'react-redux';
import AddCourse from "./components/core/Dashboard/AddCourse/index"
import ContactPage from './pages/ContactPage';

function App() {
  const {user}=useSelector((state)=>state.profile)

  return (
    <div className='w-screen bg-richblack-900 min-h-screen flex flex-col font-inter'>
      <Navbar ></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>

        <Route path='/signup' element={
          <OpenRoute>
            <SignupPage></SignupPage>
          </OpenRoute>
        }></Route>

        <Route path='/about' element={
          <OpenRoute>
            <About></About>
          </OpenRoute>
        }></Route>
          
          <Route path='/contact' element={
          <OpenRoute>
           <ContactPage></ContactPage>
          </OpenRoute>
        }></Route>


        <Route path='/login' element={
          <OpenRoute>
            <LoginPage  ></LoginPage>
          </OpenRoute>
        }></Route>

        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path='/update-password/:id' element={
          <OpenRoute>
            <UpdatePassword></UpdatePassword>
          </OpenRoute>
        }></Route>

        <Route element={
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }>
          <Route path='/dashboard/my-profile' element={
            <MyProfile></MyProfile>
          }></Route>

          <Route path='/dashboard/settings' element={
            <Setting></Setting>
          }></Route>

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT &&(
            <>
            <Route path='/dashboard/cart' element={
           <Cart></Cart>
          }></Route>

          <Route path='/dashboard/enrolled-courses' element={
            <EnrolledCourses></EnrolledCourses>
          }></Route>
            </>
          )
        }
          {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&(
            <>
          <Route path='/dashboard/add-course' element={
            <AddCourse></AddCourse>
          }></Route>
            </>
          )
        }
        </Route>



        <Route path='*' element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}
//mega-frontend-1-25min done
export default App;
