const express = require("express");
var mongoose = require("mongoose");
var signupRouter = express.Router();
var dbUrl = "mongodb://localhost:27017:27017/flipkart";
var userModel = require("../../model/userModel");


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    else console.log("DB connection is established")
})
function allowServerInLocalMachine(res) {
    /// enabling CORS policy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/*   ');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    ////********* */
}
signupRouter.get("/", (req, res) => {
    res.send("signup");
})
signupRouter.post("/login", (req, res) => {
    allowServerInLocalMachine(res);
    console.log("request login", req.body);
    userModel.find({ name: req.body.name }, (err, data) => {
        if (err) throw err;
        else {
            console.log(data == []);
            if (data.length === 0) {
                res.send({ msg: "Username not exists" });
            }
            else if (data[0].name === req.body.name && data[0].password === req.body.password) {
                res.send({ msg: "Login Success", type: data[0].type, _id: data[0]._id });
            }
            else {
                res.send({ msg: "Username or pasword incorrect" });
            }

        }

    })
});
signupRouter.post("/saveUser", (req, res) => {
    console.log(">>>>>>>>> 1");
    userModel.find({ name: req.body.name }, (err, data) => {
        console.log(">>>>>>>>> 2");
        if (err) throw err;
        else {
            console.log(">>>>>>>>> 3");
            if (data.length === 0) {
                console.log(">>>>>>>>> 4");
                var uModel = new userModel();
                uModel.name = req.body.name;
                uModel.password = req.body.password;
                uModel.email = req.body.email;
                uModel.type = req.body.type;
                uModel.phone = req.body.phone;
                uModel.save(uModel, (err) => {
                    if (err) throw err;
                    else {
                        console.log(">>>>>>>>> 5");
                        console.log("saved");
                        res.send({ msg: "success", type: uModel.type });
                    }
                })
            }
            else{
                console.log(">>>>>>>>> 00000000");
                res.send({msg:"Username exists. Please choose another name"});
            }
        }
    })


})


module.exports = signupRouter;