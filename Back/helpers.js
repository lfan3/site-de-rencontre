let users = []

const addUser = ({id, name, room})=>{
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    let existingUser = users.includes((user)=>user.name === name && user.room === room)
    if(existingUser)
        return ({error : "the name is already tocken"})
    let user = {id, name, room}
    users.push(user)
    return {user}
}

const removeUser = (id)=>{
    users = users.filter((user)=> user.id != id)
    user = users.find((user)=> user.id === id)
    return user
}

const getUser = (id)=>{
    return user = users.find((user)=>user.id === id)
}

const getUserInRoom = (room)=>{
    return users = users.filter((user)=>user.room === room)
}

module.exports = { addUser, removeUser, getUser, getUserInRoom}