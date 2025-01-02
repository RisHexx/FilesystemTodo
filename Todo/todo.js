const fs = require('fs')
const filepath = './tasks.json'

let command = process.argv[2]
let argument = process.argv[3]

let loadData = ()=>{
    try{
        let dataBuffer = fs.readFileSync(filepath)
        let dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(error){
        return []
    }
}
let saveTask = (tasks)=>{
    try{
        let dataJson = JSON.stringify(tasks)
        fs.writeFileSync(filepath,dataJson)
    }catch(error){
        console.log("");
    }
}

let addTask = (task)=>{
    let data = loadData()
    let index = 0;
    if(data.length != 0){ index = data[data.length - 1].id}
    task.id = index + 1
    data.push(task)
    saveTask(data)
    console.log(`Task Added ${task.Task}`);
    
}

let listTask = ()=>{
    let dataJson = loadData()
    if(dataJson != 0){
        for (const task of dataJson ) {
            console.log(task);
        }
    }else{
        console.log("Nothing To Display");
    }
}

let removeTask = (taskid)=>{
    let dataJson = loadData()
    if(dataJson.length != 0){
        dataJson.splice(taskid - 1,1)
    console.log("Task Got Removed");
    saveTask(dataJson)
    }else{
        console.log("Nothing To Remove");
        
    }
}
if(command == 'add'){
    let newTask = {
        Task : argument
    }
    addTask(newTask);
}else if(command == 'list'){
    listTask()
}else if(command == 'remove'){
    removeTask(parseInt(argument))
}else {
    console.log("Command Not Found");
}


    