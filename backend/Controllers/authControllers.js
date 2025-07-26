let authSchema = require('../Modals/User');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
JWT_Secret = "wertyu34567890poiuytrewq";

// SignUp API

exports.userSignup = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check existing user
        const existingUser = await authSchema.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Create and save new user
        const newUser = new authSchema({
            fullname,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully", newUser });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};



// Login API

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const user = await authSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // token expires in 10 minutes
        const token = jwt.sign({ _id: user._id, email: user.email }, JWT_Secret, {
            expiresIn: "1m"
        });

        res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            },
            Token: token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

