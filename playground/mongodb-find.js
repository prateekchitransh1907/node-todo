//---------------------------Fetching data from DB server------------------------------------------//

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

//we can create a new id on the fly by using the ObjectID interface
// var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
//find() function is used to fetch the data --if no arguments are given to the function
//it fetches the entire data from the server. find() returns a cursor which is just a pointer to all those
//documents that are present in the collection and the cursor has a tons of methods which we can use to get our documents
//one of the most common cursor methods is toArray - we have an array of objects. toArray returns a promise.

//we can pass in a query in find like finding a certain document that has a certain property like in todo
//find only the documents that have completed property set to false.
//inside the find() function we can specify {completed : false}
//when querying by id we need to create a new objectid with the id to be searched because we cannot pass a simple string
// db.collection('Todos').find({_id : new ObjectID('5a7aff4a24e29d1ef4e0e137') }).toArray().then((docs)=>{
//      console.log('Todos');
//      console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
//   console.log('unable to fetch todos');
// });


// This is an example to find the count of todos in the database by using a count function which is a part of
//cursor methods present in the mongodb api docs please refer. The count function also returns promise
//we can either use promise or provide a call back functiion as a parameter
//db.collection('Todos').finc().count(function(err,count)){}
db.collection('Todos').find().count().then((count)=>{
     console.log(`Todos Count:${count}`);

},(err)=>{
  console.log('unable to fetch todos');
});

//challenge find the user with a name passed as query from the users collection
db.collection('Users').find({ name : 'Vaishali Singh').toArray().then((docs)=>{
  console.log('The user has been found ! ');
  console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  console.log('The user does not exist');
});
  // db.close();
});
