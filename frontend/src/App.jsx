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
import ProtectedRouter from "./pages/ProtectedRouter"
import LoginAdmin from "./pages/LoginAdmin"
import RegisterAdmin from "./pages/Registeradmin"

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
          <ProtectedRouter>
          <DashboardLayout>
          <Slidebar/>
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
        <Route
        path="/cus"
        element={
   <ProtectedRouter>  
           <DashboardLayout>
            < Customer/>
          </DashboardLayout>
           </ProtectedRouter> 
        }
      />

                <Route
        path="/Setting"
        element={
             <ProtectedRouter>
          <DashboardLayout>
            < Setting/>
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
   
       
      <Route
        path="/updateRoom/:id"
        element={
             <ProtectedRouter>
          <DashboardLayout>
            <UpdateRoom/>
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
      
      <Route
      path="/upnew/:id" 
        element={
             <ProtectedRouter>
          <DashboardLayout>
            <UpdateNews />
          </DashboardLayout>
         </ProtectedRouter>
        }
      />
      <Route
        path="/registerroom"
        element={
             <ProtectedRouter>
          <DashboardLayout>
            <AddRoom/>
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
       <Route
        path="/news"
        element={
             <ProtectedRouter>
          <DashboardLayout>
            <AddNews />
          </DashboardLayout>
          </ProtectedRouter>
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
        path="/registerAdmin"
        element={
          <MainLayout>
            <RegisterAdmin />
          </MainLayout>
        }
      />
       <Route
        path="/loginAdmin"
        element={
          <MainLayout>
            <LoginAdmin/>
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

