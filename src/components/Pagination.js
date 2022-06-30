import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getNewProducts, getProducts, reset } from '../features/product/productSlice'
import Card from './Card'
import {AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'
import Loader from './Loader'

export default function Pagination() {

  const {products: data, offset, formData, isLoading} = useSelector(state => state.product)

  const [productsPerPage] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageItem, setPageItem] = useState({start: 0, end: productsPerPage})

  const dispatch = useDispatch()

  //  - - - - - - - - - - - > Get initial products  <- - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    dispatch(getProducts({query: `name=${formData.name}&category=${formData.category}`}))
    setCurrentPage(1)
  }, [dispatch, formData])

  //  - - - - - - - - - - - > Reset al settings  <- - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  //  - - - - - - - - - - - > Change  <- - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   const onPageChangeEvent = (start, end) => {
    setPageItem({
        start: start,
        end: end
    })
  }

  //  - - - - - - - - - - - > Define pagination pages  <- - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const numOfPages = Math.ceil(data.length / productsPerPage);
  
  //  - - - - - - - - - - - > Define pagination buttons count  <- - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const numOfButtons = [];
    for (let i = 1; i <= numOfPages; i++) {
        numOfButtons.push(i);
    }

    //  - - - - - - - - - - - > Increase current page   <- - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const prevPageClick = () => {
        if (currentPage === 1) {
            setCurrentPage(currentPage);
        } else {
            setCurrentPage(currentPage - 1);
        }
    }

    //  - - - - - - - - - - - > Decrease current page   <- - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const nextPageClick = () => {
      if (currentPage === numOfButtons.length) {
          setCurrentPage(currentPage);
      } else {
          setCurrentPage(currentPage + 1);
      }
  }

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);   

  useEffect(() => {
    let tempNumberOfButtons = [...arrOfCurrButtons]

    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'

    if (numOfButtons.length < 6) {
        tempNumberOfButtons = numOfButtons
    }

    else if (currentPage >= 1 && currentPage <= 3) {
        tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfButtons.length]
    }

    else if (currentPage === 4) {
        const sliced = numOfButtons.slice(0, 5)
        tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length]
    }

    else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
        const sliced1 = numOfButtons.slice(currentPage - 2, currentPage)
        const sliced2 = numOfButtons.slice(currentPage, currentPage + 1)
        tempNumberOfButtons = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numOfButtons.length])
    }

    else if (currentPage > numOfButtons.length - 3) {
        const sliced = numOfButtons.slice(numOfButtons.length - 4)
        tempNumberOfButtons = ([1, dotsLeft, ...sliced])
    }

    else if (currentPage === dotsInitial) {
        setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
    }
    else if (currentPage === dotsRight) {
        setCurrentPage(arrOfCurrButtons[3] + 2)
    }

    else if (currentPage === dotsLeft) {
        setCurrentPage(arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfButtons);
    const value = currentPage * productsPerPage;

    onPageChangeEvent(value - productsPerPage, value)
}, [currentPage, productsPerPage, numOfPages]);

  useEffect(() => {
    if(currentPage === numOfPages){
      dispatch(getNewProducts({query: `offset=${offset}&name=${formData.name}&category=${formData.category}`}))
    }
  }, [currentPage, offset, dispatch, formData, numOfPages])

  return (
    <div className='mt-3'>
        {isLoading ? (
          <Loader />
        ):(
          <div>
            <div className="grid lg:grid-cols-3 auto-rows-fr md:grid-cols-2 gap-x-4">
            {
              data.length ? (
                data?.slice(pageItem.start, pageItem.end).map((product, i) => (
                  <Card key={i} {...product} />
                ))
              ):(<h2>Products not found!!!</h2>)
            }
          </div>
          <div className='w-fit mx-auto mt-3'>
            <ul className="flex items-center gap-x-2">
              <li 
                className={`cursor-pointer bg-gray-300 rounded-md w-6 h-6 flex items-center justify-center ${currentPage === 1 ? 'disable': ''}`}>
                <AiOutlineLeft onClick={prevPageClick} />
              </li>
              {
                arrOfCurrButtons.map((e, index) => {
                  return (
                        <li onClick={() => setCurrentPage(e)} key={index} className={`cursor-pointer bg-gray-300 rounded-md w-6 h-6 flex items-center justify-center ${currentPage === e ? 'activePage' : ''}`}>
                          {e}
                        </li>
                  )
                })
              }
              <li 
                className={`cursor-pointer bg-gray-300 rounded-md w-6 h-6 flex items-center justify-center ${currentPage === numOfButtons.length ? 'disable': ''}`}
                >
                  <AiOutlineRight onClick={nextPageClick} />
              </li>
            </ul>
          </div>
        </div>
        )}
    </div>
  )
}
