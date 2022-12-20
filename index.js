const express= require('express');

const app=express();
const path=require('path');
const fs= require('fs/promises');

const jsonPath= path.resolve('./file/task.json');
app.use(express.json());

app.get ('/task',async(req,res)=>{
  const jsonFile= await fs.readFile(jsonPath, 'utf-8');
  res.send(jsonFile);
});

app.post('/task', async(req,res)=>{
  const task=req.body;
  const taskArray= JSON.parse(await fs.readFile(jsonPath,'utf-8'));
  const lastIndex= taskArray.length -1
  const newId= taskArray[lastIndex].id +1;
  taskArray.push({...task, id:newId});
  await fs.writeFile(jsonPath, JSON.stringify(taskArray)) 
  res.end();
})

app.put('/task', async(req,res)=> {
  const taskArray= JSON.parse(await fs.readFile(jsonPath,'utf-8'));
  const {status,id}= req.body;
  const taskIndex= taskArray.findIndex(user=> user.id===id);
  if (taskIndex>=0) {
    taskArray[taskIndex].status=status;
  };
  await fs.writeFile(jsonPath, JSON.stringify(taskArray));
  res.send('tarea actualizada');
})

app.delete('/task', async(req,res)=>{
  const taskArray= JSON.parse(await fs.readFile(jsonPath,'utf-8'));
  const {id}=req.body;
  const taskIndex= taskArray.findIndex(user=> user.id===id);
  taskArray.splice(taskIndex, 1);
  await fs.writeFile(jsonPath, JSON.stringify(taskArray));
  res.end();
})


const  PORT= 7000;
app.listen(PORT, ()=>{
console.log(`servidor escuchando en el puerto ${PORT}` )});