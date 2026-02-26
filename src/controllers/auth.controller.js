import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({name,email,phone,password: hashedPassword,});

    res.status(201).json(user);
  } catch (err) {
    console.log("signup error", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login=async(req,res)=>{
    try{
      const { email, password } = req.body;
        if ( !email || !password) {
            return res.status(400).json({ message: "missing name, email, phone and passs" });
        }

        const user= await User.findOne({email})  //finding user from database having same email
        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        const match= await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message: "password not matched"})
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        return res.json({ token });
        

    }catch(err){
        console.log("Login Error", err);
        return res.status(500).json({message:"Internal server error"});
    }
}