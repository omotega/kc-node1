const express = require('express');
const app = express();

app.use(express.json({urlEncoded: false}));
const userRecord = {
    id: 1001,
    name: "vara",
    ade: 20,
    address: "iwofe road",
}

const allUserRecords = [{
    id: 1002,
    name: "vara",
    ade: 21,
    address: "iwofe road",
},
{
    id: 1003,
    name: "para",
    ade: 22,
    address: "iwofe road",
},
{
    id: 1004,
    name: "tara",
    ade: 23,
    address: "iwofe road",
},
{
    id: 1005,
    name: "mara",
    ade: 24,
    address: "iwofe road",
},
{
    id: 1006,
    name: "dara",
    ade: 25,
    address: "iwofe road",
}]
function getUsers(req, res){
    const id = req.params.id;
    console.log(id);
    const user = allUserRecords.find(user => { 
        console.log(user.id === Number(id));
        if (user.id === Number(id)){
            return user
        }else {
           return false;
        }
    });
    if(user){
        res.send(user);
    }else{
        res.send("user not found");
    }
};
function getAllUsers(req, res){
    if (allUserRecords.length > 0){
        res.status(200).send(allUserRecords)
    }else {
        res.status(404).send("no user at the moment")
    }
}
function update (req,res){
    allUserRecords.push(userRecord)
}
app.get("/user/all", getAllUsers)

app.get("/user/:id",getUsers)

app.post("/user",(req,res) => {
    const {name,address,age} = req.body;
    if(name&&address&&age){
        const id = allUserRecords[allUserRecords.length-1].id+1;
        req.body.id = id;
        allUserRecords.push(req.body);
        res.status(201).json({success:true,data:req.body })
    }else{
            res.status(401).json({success:false,message:"bad input"})
        }
    console.log(req.body)
});

app.listen(3000, () => {
    console.log("running");
})