import cloudinary from "../config/cloudinary.js";
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
        res.status(200).json(user)

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message })
    }
}

export const addBlog = async (req, res) => {
    try {
        let { description, title, category, authorName, id } = req.body
        let image = ""
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
            image = result.secure_url
        }
        let newPost = new Blog({
            description: description,
            cover: image,
            authorName: authorName,
            title: title,
            category: category,
            author: id
        })
        const post = await newPost.save()
        const updatedpost = await Blog.findById(post._id)
        res.status(200).json(updatedpost)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal error occured" })
    }
}
export const editBlog = async (req, res) => {
    try {
        let { description, title, category, id } = req.body
        console.log(req.body);
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            $set: {
                description: description,
                title: title,
                category: category,
            }
        }, { new: true })
        console.log("updatedBlog");
        res.status(200).json(updatedBlog)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal error occured" })
    }
}
export const deleteBlog = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if (user) {
            await Blog.findByIdAndDelete(req.params.id)
            return res.status(200).json({ id: req.params.id, msg: "deleted successfully" })
        } else {
            return res.status(400).json('you are not allowed to delete this blog')
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json("internal server error")
    }
}
export const getBlogs = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) return res.status(400).json('user not found')
        const posts = await Blog.find({ author: id }).populate('author', 'name');
        console.log(id);
        console.log(posts);
        return res.status(200).json(posts)
    } catch (err) {
        console.log(err);
        return res.status(500).json("internal error")
    }
}  