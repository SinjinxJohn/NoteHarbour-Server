const mongoose = require('mongoose');
const {createHmac, randomBytes} =  require('crypto');
const { createTokenForUser } = require('../Service/auth');

const db_link = "mongodb+srv://sinjinhotlinebling:hotlinebling@cluster0.v34jvsb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGO_URL)
    .then(function (db) {
        console.log("db connected");
    })
    .catch(function (err) {
        console.log(err);
    })

const userSchema  = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        min:8,
        required:true,
    },
    salt:{
        type:String,

    },
    confirmPassword:{
        type:String,
        required:true,
        min:8,
    }
},{timeStamps:true});

userSchema.pre('save', function (next) {

    const user=this;
    if(!user.isModified("password")) return;
    if(this.password!==this.confirmPassword){
        throw new Error("Passwords do not match");
    }

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex');
    this.salt=salt;
    this.password=hashedPassword;
    this.confirmpassword=undefined;
    next();


});


userSchema.static("matchPassword",async function (email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvided = createHmac('sha256',salt).update(password).digest('hex');

    if(hashedPassword !== userProvided ){
        throw new Error("Password is incorrect");
    }
    const token = createTokenForUser(user);
    return token;

})

const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;

