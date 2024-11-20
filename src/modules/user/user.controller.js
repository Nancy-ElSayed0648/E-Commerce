

import { User } from "../../../database/models/user.model.js"
import { addOne, allData, deleteOne, getOne, updateOnee } from "../handlers/refactor.js"





const addUser = addOne(User,'user')

const allUsers =allData(User,'user')

const getUser = getOne(User,'user')

const updateUser = updateOnee(User,'user')

const deleteUser = deleteOne(User,'user')



export{
    addUser,
    allUsers,
    getUser,
    updateUser,
    deleteUser

}