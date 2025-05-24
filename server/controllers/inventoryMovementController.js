import InventoryMovement from "../models/InventoryMovement.js";



export const addInventoryMovement = async (req, res) => {
    try{
        const { itemName, quantity, fromLocation, toLocation } = req.body;

        if(!itemName || !quantity || !fromLocation || !toLocation) {
            return res.status(400).json({ message: 'Item Name, Quantity, From Location, and To location are required.'});
        }

        const parsedQuantity = parseInt(quantity);
        if (parsedQuantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0.'});
        }

        const inventoryMovement = new InventoryMovement({
            itemName,
            quantity: parsedQuantity,
            fromLocation,
            toLocation,
        });

        await inventoryMovement.save();
        res.status(201).json(inventoryMovement);
    } catch (error){
        res.status(500).json({ message: `Error creating inventory movement: ${error.message}`});
    }
};

export const getInventoryMovements = async (req, res) => {
    try{
        const movements = await InventoryMovement.find().sort({ createdAt: -1 });
        res.status(200).json(movements);
    }catch (error){
        res.status(500).json({ message: `Error fetching inventory movements: ${ error.message }`});
    }
};