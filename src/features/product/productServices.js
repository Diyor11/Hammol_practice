import axios from 'axios'

const api = 'http://localhost:3001/api'

const getProducts = async(query) => {
    const res = await axios.get(api +  `/product?${query ? query:''}`)

    return res.data
}

const getProduct = async(productId) => {
    const res = await axios.get(api + `/product/` + productId)

    return res.data
}


const productServices = {
    getProducts,
    getProduct,
}

export default productServices