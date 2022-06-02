const util = require('util')
const con = require('./../db/conn');
const query = util.promisify(con.query).bind(con);

module.exports.create = async (req, res) => {
    try {
        const { name, address, mobile } = req.body;
        // console.log(name ,address);
        var sql = "INSERT INTO costumers (name, address , mobile) VALUES(? ,? , ?)";
        await query(sql, [name, address, mobile], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
        res.status(201).send("data inserted successfully");
    } catch (err) {
        console.log(err);
    }
}

module.exports.read = async (req, res) => {
    await query("SELECT * FROM costumers", function (err, result, fields) {
        if (err) throw err;
        res.status(200).send(result);
    });
}

module.exports.update = async (req, res) => {
    const { name, address, mobile } = req.body;
    const id = req.params.id;
    // console.log(name, address, mobile ,id);
    var sql = `UPDATE costumers SET name = ? , address = ? , mobile = ? where id = ?`;
    await query(sql, [name, address, mobile, id], function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.status(201).send("Data updated successfully ");
    });
}


module.exports.deleted = async (req, res) => {
    const id = req.params.id;
    var sql = "DELETE FROM costumers WHERE id = ?";
    await query(sql, id, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        res.status(201).send("data deleted successfully");
    });
}

