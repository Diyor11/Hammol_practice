import { NavLink } from 'react-router-dom'

export default function Card({id, brand, category, description, discountPercentage, price, rating, title, thumbnail}) {

    const descShorter = (text) => {
        if(text.split(' ').length > 10){
            let newText = text.split(' ').slice(0, 10).join(' ') + '...'
            return newText
        }
        return text
    }

  return (
    <div className='mt-4 cursor-pointer relative'>
        <div>
            <img src={thumbnail} alt={title} />
        </div>
        <div className='pt-2 px-4'>
            <div className='text-lg font-semibold'>
                <span className='underline uppercase'>Title:</span> {title}
            </div>
            <div className='text-md mt-3 font-semibold'>
                <span className='uppercase underline'>description:</span> {descShorter(description)}
            </div>
        </div>
        <NavLink className='absolute top-0 left-0 right-0 bottom-0' to={`/product/` + id}></NavLink>
    </div>
  )
}
