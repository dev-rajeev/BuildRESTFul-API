const express = require('express');
require('./db/conn')
const Student= require('./models/students')

const app = express();
const port = process.env.PORT || 5000

app.use(express.json());


// create a new student
// app.post('/students', (req,res)=>{

//     console.log(req.body);
//     const user= new Student(req.body);
//     // console.log(req.body);
    
//     user.save().then(() => {
//         res.send(user);
//     }).catch((err) => {
//         res.send(err)
//     });

//     // res.send("Hello Rajeev for creating Api");
// })


// post() using async await----------------

app.post('/students', async (req, res)=>{

    try {
        const user= new Student(req.body);
        const createUser = await user.save();
        res.status(200).send(createUser);
    } catch (error) {
        res.status(400).send(error)
    }
})






// note:----

// You DO NOT NEED express.json() and express.urlencoded() for GET Requests or DELETE Requests.
// we only need it for POST and PUT req.

// express.json() is a method inbuilt in express to recognize the incoming 
// Request Object as a JSON object. This Method is called as a middleware in your application using
// the code:    app.use(express,json());





// read the data of registered studends

app.get('/students', async (req,res)=>{

    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (error) {
        res.send(error)
    }
})

// get the indivisual student data using id

// app.get('/students/:id', async (req,res)=>{

//     try {
//         const _id = req.params.id;

//         const studentData= await Student.findById(_id);
//         console.log(studentData);

//         if(!studentData){
//             return res.status(404).send();
//         }else{
//             res.send(studentData)
//         }

//         // console.log(req.params.id);
//         // res.send(req.params.id);
//     } catch (error) {
//         res.send(error)
//     }
// })



// update the Students by it id ---------------------------------

app.patch('/students/:id', async (req,res)=>{

    try {
        const _id = req.params.id;
        const updateStudents= await Student.findByIdAndUpdate(_id, req.body);
        res.send(updateStudents)
    } catch (error) {
        res.
        res.status(404).send(err)
    }
})



// delete request --------------------------------------------

app.delete('/students/:id', async (req,res)=>{

    try {
        const _id = req.params.id;
        const deleteStudents= await Student.findByIdAndDelete(_id);
        res.send(deleteStudents)
    } catch (error) {
        res.
        res.status(404).send(err)
    }
})











app.listen(port, ()=>{
    console.log(`Connection is successful ${port}`);
})