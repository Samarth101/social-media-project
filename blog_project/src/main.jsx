import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx'
import Protected from './components/AuthLayout.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import Addpost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'

const router =createBrowserRouter([ 
  {
    path: "/",
    Element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: (
          <Protected  >
            <Login/>
          </Protected>
        )
      },
      {
        path: "/Singup",
        element: (
          <Protected authencation={false} >
            <Signup/>
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authencation >
            <AllPosts/>
          </Protected>
        )
      },
      {
        path: "/Post/:slug",
        element: (
          <Protected authencation >
            <Post/>
          </Protected>
        )
      },
      {
        path: "/Add-post",
        element: (
          <Protected authencation >
            <Addpost/>
          </Protected>
        )
      },
      {
        path: "/edit-posts/:slug",
        element: (
          <Protected authencation >
            <EditPost/>
          </Protected>
        )
      }


    ]
  }
 ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider  store= {store}>
      <RouterProvider router = {router}/>
    </Provider >
    </React.StrictMode>,
)
