const mysql = require('mysql2');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME
});


//View Users //
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Mysql Connected as ID:' + connection.threadId);
        // User connection //
        connection.query('SELECT * FROM users', (err, rows) => {
            // when done with the connection, release it //
            connection.release();
            if(!err) {
                let removedUser = req.query.removed;
                res.render('home', { rows, removedUser });
            }else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows);
        });
    });
}

// Find User by search
exports.find = (req, res) => {
    //Connect to database and read all users data //
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Mysql Connected as ID:' + connection.threadId);
    
        let searchTerm = req.body.search;

        // User connection //
        connection.query('SELECT * FROM users WHERE first_name LIKE ? OR email LIKE ? OR phone LIKE ? OR subject LIKE ?',['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // when done with the connection, release it //
            connection.release();
            if(!err) {
                res.render('home', { rows });
            }else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows);
        });
    });
    }

exports.form = function(req, res){
    res.render('add-user');
};

// Add new user //
exports.create = (req, res) => {
    const { first_name, email, phone, subject, comments } = req.body;   
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Mysql Connected as ID:' + connection.threadId);
    
        let searchTerm = req.body.search;

        // User connection //
        connection.query('INSERT INTO users SET first_name = ?, email = ?, phone = ?, subject = ?, comments = ?',[first_name, email, phone, subject, comments],(err, rows) => {
            // when done with the connection, release it //
            connection.release();
            if(!err) {
                res.render('add-user',{ alert: "User added successefully"});
            }else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows);
        });
    });
    }

//Edit user   
exports.edit = function(req, res){
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Mysql Connected as ID:' + connection.threadId);
    
        // User connection //
        connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
            // when done with the connection, release it //
            connection.release();
            if(!err) {
                res.render('edit-user', { rows });
            }else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows);
        });
    });
    }

 //Update user   
exports.update = function(req, res){
    const { first_name, email, phone, subject, comments } = req.body; 
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Mysql Connected as ID:' + connection.threadId);
    
        // User connection //
        connection.query('UPDATE users SET first_name = ?, email = ?, phone = ?, subject = ?, comments = ? WHERE id = ?',[first_name, email, phone, subject, comments, req.params.id],(err, rows) => {
            // when done with the connection, release it //
            connection.release();
            if(!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; // not connected
                    console.log('Mysql Connected as ID:' + connection.threadId);
                
                    // User connection //
                    connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
                        // when done with the connection, release it //
                        connection.release();
                        if(!err) {
                            res.render('edit-user', { rows, alert: `${first_name} has been updated.`});
                        }else {
                            console.log(err);
                        }
                        console.log('The data from users table: \n', rows);
                    });
                });
            }else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows);
        });
    });
    }
  
//Delete user   
exports.delete = function(req, res){
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Mysql Connected as ID:' + connection.threadId);

        connection.query('DELETE FROM users WHERE id = ?',[req.params.id], (err, rows) =>{
            connection.release() // return the connection to pool
            if (!err) {
                let removedUser = encodeURIComponent('User successfully removed.');
                res.redirect('/?removed=' + removedUser);
                // res.redirect('/');
            }else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows);
        });
    });
}

//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         connection.query('DELETE FROM users WHERE id = ?',[req.params.id], (err, rows) => {
//             connection.release();
//             if(!err) {
//                 let removedUser = encodeURIComponent('User successfully removed.');
//                 res.redirect('/?removed=' + removedUser);
//             }else {
//                 console.log(err);
//             }
//             console.log('The data from users table: \n', rows);
//         });
//     });
// };
 

//View all Users //
exports.viewall = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Mysql Connected as ID:' + connection.threadId);
    
        // User connection //
        connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
            // when done with the connection, release it //
            connection.release();
            if(!err) {
                res.render('view-user', { rows });
            }else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows);
        });
    });
    };
