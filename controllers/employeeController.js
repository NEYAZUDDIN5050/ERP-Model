const Employee = require ('../models/Employee');

exports.addEmployee = async (requestAnimationFrame, res) => {
   try {
    const employee = new Employee (req.body);
    await employee.save();
    res.status(201).json(employee);
   
   }catch (error) {
    res.status(500).json({ message: error.message });
   }
};

exports.getEmployees = async (req, res) => {
    try {
        const emplyees = await Emplyee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};