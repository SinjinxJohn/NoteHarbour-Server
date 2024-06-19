const userModel = require('../Models/userModel');

module.exports.signup = async function (req, res) {
    try {
        const { email, password, confirmPassword } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                messageType: 'error',
                error: "Email and password are required"
            });
        }
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                messageType: 'error',
                error: 'User with this email already exists'
            });
        } else {
            const user = await userModel.create({

                email,
                password,
                confirmPassword
            })
            if (user) {
                return res.status(201).json({
                    messageType: 'success',
                    message: "Account created Successfully"
                });
            };


        }



    } catch (error) {
        res.json({
            error: error.message,
        })
    }
}
module.exports.signin = async function (req, res) {
    

    try {
        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                messageType: 'error',
                error: "Email and password are required"
            });
        }
        const token = await userModel.matchPassword(email, password);

       

        res.status(200).json({
            messageType: 'success',
            message: 'Sign In successful',token: token
        });
    } catch (error) {
        
        res.status(401).json({
            messageType: 'error',
            error: 'Sign In failed'
        });
    }
};

module.exports.logout = async function (req, res) {
    // res.clearCookie('token');
    res.json({
        messageType:'success',
        message: "Logged Out Successfully"
    })
}