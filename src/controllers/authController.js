 
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    const token = user.getSignedJwtToken();

    res.status(201).json({ success: true, token });
});
