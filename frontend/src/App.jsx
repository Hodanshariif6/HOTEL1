import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Contact from "./pages/contact"
import About from "./pages/About"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Booking from "./pages/Booking"
import Dashboard from "./pages/Dashboard"
import Room from "./pages/Room"
import News from "./pages/News"
import Slidebar from "./pages/Slidebar"
import AddNews from "./pages/AddNew"
import AddRoom from "./pages/AddRoom"
import UpdateRoom from "./components/updateRoom"
import UpdateNews from "./components/updateNews"
import Setting from "./pages/Setting"
import Profile from "./pages/profile"
import Customer from "./pages/Customer"
import ForgotPassword from "./pages/ForgotPassword"

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Dashboard /> 
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}


function App() {
  return (
    
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
          <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
          <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />
          <Route
        path="/forgot-password"
        element={
          <MainLayout>
            <ForgotPassword />
          </MainLayout>
        }
      />
          <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />

          <Route
        path="/dashboard"
        element={
          <DashboardLayout>
          <Slidebar/>
          </DashboardLayout>
        }
      />
        <Route
        path="/cus"
        element={
          <DashboardLayout>
            < Customer/>
          </DashboardLayout>
        }
      />

                <Route
        path="/Setting"
        element={
          <DashboardLayout>
            < Setting/>
          </DashboardLayout>
        }
      />
      
      <Route
        path="/updateRoom/:id"
        element={
          <DashboardLayout>
            <UpdateRoom/>
          </DashboardLayout>
        }
      />
      
      <Route
      path="/upnew/:id" 
        element={
          <DashboardLayout>
            <UpdateNews />
          </DashboardLayout>
        }
      />
      <Route
        path="/registerroom"
        element={
          <DashboardLayout>
            <AddRoom/>
          </DashboardLayout>
        }
      />
       <Route
        path="/news"
        element={
          <DashboardLayout>
            <AddNews />
          </DashboardLayout>
        }
      />

      <Route
        path="/Booking"
        element={
          <MainLayout>
            <Booking/>
          </MainLayout>
        }
      />
       <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />
       <Route
        path="/login"
        element={
          <MainLayout>
            <Login/>
          </MainLayout>
        }
      />


            <Route
        path="/Room"
        element={
          <DashboardLayout>
            <Room />
          </DashboardLayout>
        }

      />
      
   <Route
        path="/new"
        element={
          <DashboardLayout>
            <News />
          </DashboardLayout>
        }
      />
    

    </Routes>
  )
}

export default App

