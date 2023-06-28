import Blog from "../models/Blog.js";
import User from "../models/User.js"
import bcrypt from 'bcrypt'
export const register = async (req, res) => {
    console.log("hgggggggggggggg");
    try {
        console.log(req.body);
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(403).json({ msg: "Email Already Exist" })
        }
        const saltRounds = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(req.body.password, saltRounds)
        user = await User.create({ 
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedpassword,
            phoneNumber: req.body.phoneNumber 
        }) 
        console.log(user);
        res.status(200).json("registered successfully ") 
    } catch (err) {  
        console.log(err);
        return res.status(500).json("internal error Occured" + err)
    }
}

//login
export const login = async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email }) 
        if (!userData) {
            return res.status(400).json({ msg: "user Not Exist" })
        }
        const comparePassword = await bcrypt.compare(req.body.password, userData.password)
        if (!comparePassword) {
            return res.status(401).json({ msg: "incorrect password" })
        }  
     
        const { password, ...user } = userData._doc
        console.log("user===========");
        console.log(user);
        res.status(200).json({ user })  

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message })
    }
}

export const addBlog = async (req, res) => {
    try {
        let { userId, desc } = req.body
        let image = ""
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
            image = result.secure_url
        }
        let newPost = new Blog({
            desc: desc,
            image: image,
            author: userId
        })
        const post = await newPost.save()
        const updatedpost = await Blog.findById(post._id).populate("author")
        res.status(200).json(updatedpost)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal error occured" })
    }
}
                              
export const getBlogs = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findById(id)
        if (!user) return res.status(400).json('user not found')
        const posts = await Blog.find({isDeleted:false}).populate('author').populate('comments.author userName profilePc')
        return res.status(200).json(posts)
    } catch (err) {
        console.log(err);
        return res.status(400).json("internal error")
    }
}