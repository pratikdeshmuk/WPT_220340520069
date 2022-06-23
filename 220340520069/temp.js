
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
const dbp={
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'inception',
	port:3306
};


const mysql=require('mysql2');
const con=mysql.createConnection(dbp);


app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;

app.get('/addbook', function (req, res) {
	
	let input ={bookid:req.query.x, bookname:req.query.y, price:req.query.z};
	let output=true;

		con.query('insert into book(bookid,bookname,price) values(?,?,?)',[input.bookid,input.bookname,input.price],(err,insert)=>{
			if(err){
				console.log("connection failed");
			}
			else if(insert.affectedRows>0)
			{
					output=true;
			}
			res.send(output);
		});
	
    });


app.get('/getbooks', function (req, res) {
    
	console.log("L")
	con.query('select * from book',[],(error,rows)=>{
		res.send(rows);

	});


		});




app.listen(900, function () {
    console.log("server listening at port 8081...");
});