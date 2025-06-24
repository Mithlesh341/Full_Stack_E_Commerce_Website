import {Router} from 'express'
import Auth from '../middleware/auth.js'
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/category.controller.js'

const categoryRouter = Router()

categoryRouter.post("/add-category",Auth,AddCategoryController)
categoryRouter.get('/get', getCategoryController)
categoryRouter.put('/update',Auth,updateCategoryController )
categoryRouter.delete('/delete', Auth, deleteCategoryController)

export default categoryRouter