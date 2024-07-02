import { Router } from "express";
import realTimeProductsManager from "../managers/realTimeProducts.manager.js ";
import { io } from "../app.js";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await realTimeProductsManager.getProducts()
        return res.render('realTimeProducts.handlebars', { products, title: 'Challenge05: WebsocketsHandlebars', style: 'realTimeProducts.css' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { body } = req
        const productAdded = await realTimeProductsManager.addProduct(body)
        const products = await realTimeProductsManager.getProducts()
        io.emit('newArrProducts', products)
        return res.status(200).json({ products })
        // return res.render('realTimeProducts.handlebars', { products, productAdded, title: 'Challenge05: WebsocketsHandlebars', style: 'realTimeProducts.css' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const deletedProduct = await realTimeProductsManager.deleteProductById(Number(pid))
        const products = await realTimeProductsManager.getProducts()
        io.emit('newArrProducts', products)
        return res.status(200).json({ products })
        // res.render('realTimeProducts.handlebars', { products, deletedProduct, title: 'Challenge05: WebsocketsHandlebars', style: 'realTimeProducts.css' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router