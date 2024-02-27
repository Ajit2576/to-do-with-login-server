import todo from "../models/todo.model.js"

//Create New Task
export const addTask = async (req, res) => {
    const {task} = req.body
    try {
        if(!task){
            return res.status(400).json({task: "Please enter task"})
        }
        let newTask = await todo.create(req.body)
        res.status(200).json(newTask)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 

//Get Created TasK
export const getTask = async (req, res) => {
    try {
        let task = await todo.find()
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Single task
export const singleTask = async (req, res) => {
    try {
        let task = await todo.findById(req.params.id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Update task 
export const updateTask = async (req, res) => {
    const {id} = req.params
    const {task} = req.body
    try {
        let update = await todo.findByIdAndUpdate(id, {task: task})
        res.status(200).json(update)
    } catch (error) {
        console.log(error)
    }
}

//Delete task
export const deleteTask = async (req, res) => {
    const {id} = req.params
    try {
        let deletetas = await todo.findByIdAndDelete({_id: id})
        res.status(200).json(deletetas)
    } catch (error) {
        console.log(error);
    }
}
