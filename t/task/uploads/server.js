const express=require('express');
const app=express()
const cors=require('cors')
const path=require('path');
const multer = require('multer');

const storage=multer.diskStorage({
    destination:`${__dirname}/uploads`,
    filename:(req,file,cb)=>{
        const fileName=`${Date.now()}${path.extname(file.originalname)}`;
        cb(null,fileName);
    }
})

const uploadImage = multer({storage}).single('photu');

app.use(cors())
app.use(express.static('/'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.post('/image',uploadImage,(req,res)=>{
    console.log(req.file);
    if(req.file) return res.json({msg:'image uploaded!'});
    res.send('image upload failed');
})

const port = process.env.PORT || 3003;

app.listen(port,()=>{
    console.log('Listening...')
});