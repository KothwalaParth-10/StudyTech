const express=require('express')
const app=express();


const userRoutes=require('./routes/User')
const profileRoutes=require('./routes/Profile')
const paymentRoutes=require('./routes/Payments')
const courseRoutes=require('./routes/Course')

const database=require('./config/database');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const {cloudinaryConnect}=require('./config/cloudinary');
const fileUpload=require('express-fileupload');
const dotenv=require("dotenv")
const {PostAboutinfo}=require("./controllers/About");
const { auth } = require('./middleware/auth');

dotenv.config();
const PORT=process.env.PORT || 4000;

database();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.post('/api/v1/reach/contact',PostAboutinfo)
app.post('/api/v1', auth, (req, res) => {
    
    res.json({
        success: true,
        message: "Access granted!",
        user: req.user, 
    });
});


//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'your server is up and running....'
    })
})

app.listen(PORT,()=>{
    console.log(`App is live on ${PORT}`);
})