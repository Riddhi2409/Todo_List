const mongoose= require('mongoose');

exports.connectdb= (url) => {
    mongoose.set('strictQuery',true)
    mongoose.connect(url)
        .then(()=>console.log("database connected"))
        .catch((err)=>{
            console.error("failed to connect");
            console.error(err)
        })
};