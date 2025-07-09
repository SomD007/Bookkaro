const mongoose = require("mongoose");
const orgModel = require("./models/orgSchema.js");

// getting-started.js

main()
.then((res) => {
    console.log("Connection Successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bookkaro');

}

let allUsers = [
    {
        name: "Ram",
        username:"Ram@adm",
        password:"Ram123",
    },
    {
        name: "Shayam",
        username:"Shayam@adm",
        password:"Shayam123",
    }
];

orgModel.insertMany(allUsers);