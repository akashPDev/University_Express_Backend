const express= require('express')
const db = require('./db')
const app = express()
const validateMiddleware=require('./validator')
const port = 3000
const crypto =require('node:crypto')
const jwt = require('jsonwebtoken')

app.use(express.json());

const secret = ()=>{
    return crypto.randomBytes(32).toString('hex')
}

const secretKey= secret()

const authenticator = (req ,res,next)=>{
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({msg:'Authentication failed no token'})
    }

    try{
        const decoded =jwt.verify(token,secretKey)
        req.user=decoded.user
        next()

    }catch(error){
        res.status(401).json({Msg : "Authentication failed no token"})
    }

}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/',(req,res)=>{
    res.send('hello from experss')
})

app.post('/teacher/login',async(req,res)=>{

})

app.post('/student/login',async(req,res)=>{

    

})


app.get('/students',async(req,res)=>{
    const stList = await db.any('SELECT * FROM student')
    res.json(stList)
})

app.get('/students/:id' ,async(req,res)=>{
    try{
     const studentId=req.params.id
     const student = await db.one('SELECT * FROM student WHERE id=$1',[studentId] )
     res.json(student)}
     catch(error){
        console.error('error Retrieving Data',error)
        res.status(500).json({ error: 'Unable to retrieve student data' });
     }
})

app.post('/students',validateMiddleware,async(req,res)=>{
    try{
        const {name,age,grade}=req.body
        const newStudent = db.one('INSERT INTO student(name,age,grade) VALUES($1,$2,$3) RETURNING *',[name,age,grade])
        res.status(201).json(newStudent)
    }
    catch(error){
        console.error('Unable to add student in the list encounter a problem',error)
        res.status(500).json({error:'Unable to add student to the database'})
    }
})

app.put('/students/:id',async(req,res)=>{
    try{
        const studentId=req.params.id
        const {name,age,grade}=req.body
        await db.none('UPDATE student SET name=$1 ,age=$2 ,grade=$3 WHERE id=$4',[name,age,grade,studentId])
        res.status(200).json({Success:'Upadate was successful'})
    }
    catch(error){
        console.error('Error updating student ',error)
        res.status(500).json({error:'Unable to update the student'})

    }
})

app.delete('/students/:id',async(req,res)=>{
    try {const studentId=req.params.id
    await db.none('DELETE FROM student WHERE id=$1',[studentId])
    res.status(200).json({Success:'deleted succesfully'})}
    catch(error){
        console.error('Error deleting student ',error)
        res.status(500).json({error:'Unable to delete the student'})

    }
})
app.listen(port,()=>console.log('app running on port ',port))