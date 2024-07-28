import React from 'react'
import { Container, Logo } from "../Index"
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
  
    const authStatus = useSelector((state)=> state.auth.status)
    
    const navigate = useNavigate()

    const navItem =[
        {
            name : "Home",
            slug: "/",
            active: true 
        },
        {
            name: "Login",
            slug:"/login",
            active: !authStatus
        },
        {
            name: "Singup",
            slug:"/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug:"/all-post",
            active: authStatus
        },
        {
            name: "Add Post",
            slug:"/add-post",
            active: authStatus
        }
    ]


    return (
    <header 
    className='py-3 shadow bg-grey-500'>
        <Container>
            <nav className=''>
                <div className=''>
                    <Link to="/">
                        <Logo/>
                    </Link>
                </div>
                <ul className='flex ml-auto'> 
                    {
                        navItem.mao((item) => item.active ? (
                            <li key={item.name}>
                                <button
                                onClick={() => navigate(item.slug)}
                                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                    {item.name}
                                </button>
                            </li>
                        ) : null)
                    }
                    (authStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )
                </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header