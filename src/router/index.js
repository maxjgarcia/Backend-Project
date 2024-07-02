import productsRouter from "../controllers/products.controller.js";
import cartsRouter from "../controllers/carts.controller.js";
import realTimeProductsRouter from "../controllers/realTimeProducts.controller.js";

const router = app => {
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);
    app.use("/realtimeproducts", realTimeProductsRouter)
}

export default router