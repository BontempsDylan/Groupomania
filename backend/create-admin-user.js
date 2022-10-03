require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('./models/User');

const createAdminUser = async () => {
    try {
        const hash = await bcrypt.hash(process.env.PASSWORD_ADMIN_USER, 10);
        const user = new User({
            email: process.env.EMAIL_ADMIN_USER,
            password: hash,
            isAdmin: true
        });
        await user.save();
        console.log("ADMIN USER CREATED");
    } catch (error) {
        console.error(error);
    }
};

// connection to mongodb data
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to db success');
    createAdminUser();
  })
  .catch(error => {
    console.error(error);
    console.error('connected to db error');
});