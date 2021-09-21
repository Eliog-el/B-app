require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('613699f67a6b377b4c4442cb').then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false })
// }).then((Result) => {
//     console.log(Result);
// }).catch((e) => {
//     console.log(e);
// }) 

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count;
}

deleteTaskAndCount('61374f59e53f615d145ec88d').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})