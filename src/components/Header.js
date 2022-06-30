import { NavLink, useNavigate } from 'react-router-dom'

export default function Header() {

    const navigate = useNavigate()


  return (
    <header className='bg-black z-10 fixed w-full top-0 left-0 flex justify-between items-center px-7 h-12'>
        <div className="text-white text-2xl">
            <NavLink to='/'>Home</NavLink>
        </div>
        <ul></ul>
    </header>
  )
}
