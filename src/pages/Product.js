import {useEffect, useState} from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import productServices from '../features/product/productServices'

export default function Product() {

  const [product, setProduct] = useState({})
  const {id} = useParams()
  console.log(id, product)

  useEffect(() => {
    const getProductById = async() => {
      try {
        const res = await productServices.getProduct(id)
        setProduct(res ? res:{})
      } catch (e) {
        console.log(e)
      }
    }
    getProductById()
  }, [id])

  return (
    <div>
      <div>
        <NavLink to='/' className='px-3 text-3xl'>
          <BiArrowBack />
        </NavLink>
      </div>

      <div className='grid grid-cols-2'>
        <div className='px-4'>
          <div>
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <ul className='flex items-center gap-x-3'>
            {product.images?.map((e, i) => (
              <li key={i} className='mt-3'>
                <img src={e} alt="thumbnail item" />
              </li>
            ))}
          </ul>
        </div>
        <div className='px-4'>
            <h3 className='text-lg mt-1'>
              <span className='font-semibold underline font-sans mr-2'>Brand:</span> {product.brand}
            </h3>
            <h3 className='text-lg mt-1'>
              <span className='font-semibold underline font-sans mr-2'>Title:</span> {product.title}
            </h3>
            <h3 className='text-lg mt-1'>
              <span className='font-semibold underline font-sans mr-2'>Category:</span> {product.category}
            </h3>
            <h3 className='text-lg mt-1'>
              <span className='font-semibold underline font-sans mr-2'>Description:</span> {product.description}
            </h3>
            <h3 className='text-lg mt-1'>
              <span className='font-semibold underline font-sans mr-2'>Discount Percentage:</span> {product.discountPercentage}
            </h3>
            <h3 className='text-lg mt-1'>
              <span className='font-semibold underline font-sans mr-2'>Price:</span> {product.price}
            </h3>
            <h3 className='text-lg mt-1'>
              <span className='font-semibold underline font-sans mr-2'>Rating:</span> {product.rating}
            </h3>
            <h3 className='text-lg mt-1'>
              <span className='font-semibold underline font-sans mr-2'>Stock:</span> {product.stock}
            </h3>
        </div>
      </div>
    </div>
  )
}
