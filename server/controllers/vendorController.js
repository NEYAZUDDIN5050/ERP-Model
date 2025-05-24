// server/controllers/vendorController.js
import Vendor from '../models/Vendor.js';

export const addVendor = async (req, res) => {
  try {
    const { name, contact, address } = req.body;

    if (!name || !contact || !address) {
      return res.status(400).json({ message: 'Vendor Name, Contact Info, and Address are required.' });
    }

    // Basic contact validation (email or phone)
    const contactRegex = /^(\S+@\S+\.\S+|\+?\d{10,})$/;
    if (!contactRegex.test(contact)) {
      return res.status(400).json({ message: 'Contact must be a valid email or phone number.' });
    }

    const vendor = new Vendor({
      name,
      contact,
      address,
    });

    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: `Error creating vendor: ${error.message}` });
  }
};

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: `Error fetching vendors: ${error.message}` });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByIdAndDelete(id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found.' });
    }
    res.status(200).json({ message: 'Vendor deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: `Error deleting vendor: ${error.message}` });
  }
};