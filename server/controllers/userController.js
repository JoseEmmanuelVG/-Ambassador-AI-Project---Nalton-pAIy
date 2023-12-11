const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function register  (req, res) {
    console.log(req.body);
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User successfully registered' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }    
};

  async function  login (req, res)  {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ message: 'Successful login', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    register,
    login,
  };