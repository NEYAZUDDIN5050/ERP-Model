import express from 'express';
import { addInventoryMovement, getInventoryMovements } from '../controllers/inventoryMovementController.js';

const router = express.Router();

router.post('/', addInventoryMovement);
router.get('/', getInventoryMovements);

export default router;