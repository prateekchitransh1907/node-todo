//Calling MongoClient to connect to the mongo db first we installed npm install mongodb now we call it here.
//command to run the mongodb server - mongod.exe --dbpath E:/mongo-data
const MongoClient = require('mongodb').MongoClient;


//Destructuring an object -- if an object has multiple properties it can be accessed in ES6 and can be used as per
//requirement
// var user = { name : 'Prateek',age : 25};
// var {name}= user;
// console.log(name);   -- only the name property shows on the console



//MongoClient connect() helps us to connect to the mongo db server.
//connect function takes two arguments -- the forst argument is a string which is an url where your database resides
//second argument is a callback function which will be fired after a connection has been either succeeded or failed
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{//db is the database object which we can read/write
  if(err){
    return console.log('Unable to connect to the MongoDB server');
  }
  console.log('Connected to MongoDB server');

  /*----------------------Inserting a document ------------------------*/
//create a collection Todos and insertOne is used to insert a new document into your collection
//It takes two arguments - first is an object that you want to store like a key value pair and the
//second is a callback function which will be fired if everything goes well or fails.
   // db.collection('Todos').insertOne({
   //   text : 'Something to do',
   //   completed : false
   // },(err,result)=>{
   //   if(err){
   //     return console.log('unable to insert todo');
   //   }
   //
   //   console.log(JSON.stringify(result.ops,undefined,2));
   // });

   db.collection('Users').insertOne({
     name : 'Vaishali Singh',
     age : 25,
     location : 'India'
   },(err,result)=>{
     if(err){
       return console.log('unable to insert user', err);
     }

     console.log(JSON.stringify(result.ops,undefined,2));
     //to display the timestamp embedded in object id you can use
     console.log(result.ops[0]._id.getTimestamp());
   });
  db.close();//closes the connection to the db server
});


//------------------------------------ID property in MongoDB-----------------------------------------------------//
// The Id property in NoSQL MongoDB is quite different from that you usually use in other conventional databases
//"_id": "5a7b4af315dc1825a0325351"
//first thing to notice here is that this is not an auto incrementing ID which means the next record does not have
//an id which is greater than the previous id by 1
//Mongo was designed to scale out really easily i.e. that you add on more database servers to handle that extra load
//Suppose you have a web app that is used by about 200 users a day and your current server can handle that traffic
//then you get picked up by some new outlet and some 10000 people flood your site. With MongoDB it is quite easy
//to kick up new database servers that can handle that extra load.
//The object ID is also made of a few different things - it is a 12 byte value.
//the first 4 bytes are the timestamp ( the moment in time when the id was created ). This means we do not need to create
 // a createdAt field in our documents. The next 3 bytes are a system identifier - which means that if two computers
 // generate an object id their ids are going to be different. This ensures that the id is unique.
 //Next 2 bytes are process ID just another way to create a unique identifier. Last 3 bytes are counter.
 //The _id property has a value assigned by MongoDB by default but you can also assign the _id property a value
 //by just using _id : 123 ( e.g. ).
