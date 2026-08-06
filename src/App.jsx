import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Collection from './pages/Collection'
import Sales from './pages/Sales'
import NewArrivals from './pages/NewArrivals'
import About from './pages/About'
import User from './Account/User'
import AnnouncementBar from './components/Announcementbar'
import Adminform from './Account/Adminform'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><ScrollToTop/><Navbar/><AnnouncementBar/><Home/><Footer/></>
    },
    {
      path: '/collection',
      element: <><ScrollToTop/><Navbar/><AnnouncementBar/><Collection/><Footer/></>
    },
    {
      path: '/sales',
      element: <><ScrollToTop/><Navbar/><AnnouncementBar/><Sales/><Footer/></>
    },
    {
      path: '/new-arrivals',
      element: <><ScrollToTop/><Navbar/><AnnouncementBar/><NewArrivals/><Footer/></>
    },
    {
      path: '/about',
      element: <><ScrollToTop/><Navbar/><AnnouncementBar/><About/><Footer/></>
    },
    // ✅ Combined Auth Page — Admin + Customer side by side
    {
      path: '/account',
      element: <><ScrollToTop/><Navbar/><User/><Footer/></>
    },
    // ✅ Profile & other dropdown pages (placeholders for now)
    {
      path: '/account/profile',
      element: <><ScrollToTop/><Navbar/><div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#343B2F] text-xl font-bold font-serif">Profile Page — Coming Soon</div><Footer/></>
    },
    {
      path: '/account/orders',
      element: <><ScrollToTop/><Navbar/><div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#343B2F] text-xl font-bold font-serif">My Orders — Coming Soon</div><Footer/></>
    },
    {
      path: '/account/data',
      element: <><ScrollToTop/><Navbar/><div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#343B2F] text-xl font-bold font-serif">Data & Privacy — Coming Soon</div><Footer/></>
    },
    {
      path: '/search',
      element: <><ScrollToTop/><Navbar/><About/></>
    },
    {
      path: '/cart',
      element: <><ScrollToTop/><Navbar/><About/></>
    },
    {
      path: '/admin',
      element: <><User/></>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App