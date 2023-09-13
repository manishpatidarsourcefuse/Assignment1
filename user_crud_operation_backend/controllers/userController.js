const fs = require('fs');
const userPath = './userDetails/userDetails.json';

const getUserData = () => {
    let userData = fs.readFileSync(userPath)
    return JSON.parse(userData);
}

const getAllUser =((req, res) => {
    fs.readFile(userPath, 'utf8', (err, data) => {
        if(err){
            throw err
        }
        res.send(JSON.parse(data))
    })
})

const addUser = ((req,res) => {
    let body = req.body
    let newUserId = Math.floor(Math.random() * 100)
    let id = {
        "id": newUserId
    }
    let existsUserData = getUserData();
    existsUserData.user.push(Object.assign(body, id))
    saveUserData(existsUserData)
    res.send({sucsess: true, message: "User added sucsessfully"})
})

const saveUserData = (data) => {
    let userData = JSON.stringify(data);
    fs.writeFileSync(userPath, userData)
}

const getUserById = ((req, res) => {
    let existsUserData =  getUserData()
    let findUserById = existsUserData.user.find((user) => user.id == req.params.id);
    if (!findUserById) {
        res.status(404).send("User with id was not found");
    } else {
        res.send(findUserById)
    }
})

const updateUser = ((req, res) => {
    let body = req.body
    let userId = req.params.id
    let id = {
        "id": userId
    }
    let existsUserData = getUserData();
    let replacement = Object.assign(body, id);
    let userIndex = existsUserData.user.findIndex((user) => (user.id == replacement.id));

    existsUserData.user[userIndex] = replacement
    saveUserData(existsUserData)

    res.send({sucsess: true, message: `User with id ${userId} updated successfully`})
})


const deleteUser = ((req, res) => {

    let userId = req.params.id
    let existsUserData = getUserData();
    let userIndex = existsUserData.user.findIndex((user) => (user.id == userId));

    existsUserData.user.splice(userIndex, 1);
    saveUserData(existsUserData);

    res.send({sucsess: true, message: `User with id ${userId} deleted successfully`})
})

module.exports = { getAllUser, addUser, getUserById, updateUser, deleteUser }