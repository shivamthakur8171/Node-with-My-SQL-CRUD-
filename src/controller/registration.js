const util = require('util')
const con = require('./../db/conn');
const query = util.promisify(con.query).bind(con);
const bcrypt = require('bcrypt');
const validation = require('./../helper/validation')

module.exports.registration = async (req, res) => {
    try {
        const { name, mobile, gender, username, email, password, confirmPassword } = req.body;
        // all fileds are required .....
        if (!(name, mobile, gender, username, email, password, confirmPassword)) {
            return res.send({
                msg: " All the fields are required ",
                fields: "name , mobile , gender ,username , email , password , confirmPassword"
            })
        }
        // password and confirm matched ...
        if (password != confirmPassword) return res.send("password and confirm password is not matched");
        
        if (!validation.email(email)) return res.send("plz enter a email ...");
        
        if (!validation.password(password)) return res.send("plz enter a strong password ...");

        // bcrypt password  .......
        const bcryptPassword = await bcrypt.hash(password, 10);
        console.log(bcryptPassword);
        var sql = "INSERT INTO users (name, mobile, gender , username ,email , password ) VALUES(? ,? , ? ,?, ?, ?)";
        await query(sql, [name, mobile, gender, username, email, bcryptPassword], function (err, result) {
            if (err) throw err;
            res.status(201).send("data inserted successfully");
        });
    } catch (err) {
        console.log(err);
    }
}


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(password);
        var findEmail = "SELECT * FROM USERS WHERE email = ?";
        var emailData = await query(findEmail, email);
        // console.log(emailData);
        if (emailData.length == 0) return res.send("user can not exist plz register");

        const isMatch = await bcrypt.compare(password, emailData[0].password);

        if(!isMatch) return res.send("password is not matched ...");
        
        

        await res.status(200).send("you are login successfully ....");
        
    } catch (err) {
        console.log(err);
    }
}