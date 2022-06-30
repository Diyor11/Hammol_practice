import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { search } from '../features/product/productSlice'

export default function SearchBar() {

    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target[0].value
        const category = e.target[1].value

        dispatch(search({name, category,}))
    }

    useEffect(() => {
        const getCategories = async() => {
            const res = await axios.get(process.env.REACT_APP_API + '/category')
            setCategories(res ? res.data:[])
        }
        getCategories()
    }, [])

  return (
    <div className='w-fit mx-auto mt-2'>
        <form onSubmit={handleSubmit} className='border border-black px-4 py-1 rounded-full'>
            <input className='w-[350px]' type="text" placeholder='Search product...' />
            <select className='border-l border-black'>
                <option value="">All</option>
                {categories?.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                ))}
            </select>
        </form>
    </div>
  )
}
