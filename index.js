const express = require("express");
const fs = require('fs');
const users = require("./MOCK_DATA.json");
const { error } = require("console");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false})); 


//Route
app.get("/api/users",(req,res)=>{
    return res.json(users);
});


//Get all data 
app.get("/users" , (req,res)=>{
    const html =`
    <ul>
    ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

//Get the particular id with name 
app.route("/api/users/:id")
.get((req,res)=>{  
    const id = Number(req.params.id);
    const user = users.find(user =>user.id ==id);
    return res.json(user);
})
.patch((req,res)=>{
    //Edit user with id
    return res.json({status:"Pending"});
})
.delete((req,res)=>{  
    //Delete User
     return res.json({status:"Pending"});
    });

    //Post new Data
app.post("/api/users" , (req,res)=>{
    const body = req.body;
   users.push({ ...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users),(err,data)=>{
        return res.json({status: "pending"});
    }); 
});

//POST is mainly used to post new data and it is posted by an app "POSTMAN" ;

app.listen(PORT , () => console.log(`Server Started at PORT:${PORT}`));
