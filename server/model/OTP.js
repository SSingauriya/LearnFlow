const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema= new mongoose.Schema({
email:{
    type:String,
    required:true,
 
},
otp:
{
    type:String,
    required:true,
  
},

createdAt:{
    type:Date,
   default:Date.now(), 
   //5 minute mai expires
   expires:5*60,
},





});

// a function--> email send karne k liye

// input dena padega kisko mail bheju and kis otp k sath bheju
async function sendVerificationEmil(email, otp){
try{
 // tin chize pass karni hai email, title, otp(body mai otp)
const mailResponse= await mailSender(email,"Verification Email from StudyNotion", otp)
console.log("Email sent successfully", mailResponse);
}

catch(error){
console.log("error occured while email",error);
throw error;

}




}

//doc save hone se pehle ek verification mail bhejenge
//Schema pe pre ka use karenge
//next pass kiye taki next middleware call ho
OTPSchema.pre("save", async function(next) {
    //current obj ka mail and otp send karenge
await sendVerificationEmil(this.email, this.otp);
next();

})


//isse pehle start karna hai middlewrae ko
module.exports=mongoose.model("OTP",OTPSchema );