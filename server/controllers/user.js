import bcrypt from "bcryptjs"
import UserCollection from "../models/user.js";
import jwt from "jsonwebtoken"


export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const oldUser = await UserCollection.findOne({ email });
      if (!oldUser) {
        return res.status(401).json({ message: "You need to register first" });
      }
  
      const ispasswordCorrect = await bcrypt.compare(password, oldUser.password);
      if (!ispasswordCorrect) {
        return res.status(400).json({ message: "Your password is incorrect" });
      }
  
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        process.env.SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({ oldUser, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };



  export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
      const oldUser = await UserCollection.findOne({ email });
      if (oldUser) {
        return res.status(400).json({ message: "You have already an account" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const newUser = await UserCollection.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });
  
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.SECRET,
        { expiresIn: "24h" }
      );
      res.status(201).json({ newUser, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  

  export const getUsers= async(req,res)=>{
    try {
      const users = await UserCollection.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }


  }