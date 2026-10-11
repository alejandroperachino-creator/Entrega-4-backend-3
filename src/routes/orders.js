import { Router } from 'express';
import OrderController from '../controllers/order.controller.js';

const router = Router();
const orderController = new OrderController();

router.get('/', orderController.getAll);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.create);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.delete);

export default router;
