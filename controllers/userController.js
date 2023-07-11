import Location from "../models/location.js";
import User from "../models/User.js"
import bcrypt from 'bcrypt'
export const register = async (req, res) => {
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

export const addPlace = async (req, res) => {
    try {
        console.log("req.body");
        console.log(req.body);
        let { description, title, latitude, longitude, id } = req.body
        let newLocation = new Location({
            title: title,
            description: description,
            lat: latitude,
            lng:longitude,
            createdBy: id
        })
        const response = await newLocation.save()
        const updatedLocation = await Location.findById(response._id)
        res.status(200).json(updatedLocation)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal error occured" })
    }
}

export const getPlaces = async (req, res) => {
    console.log("first-djkljd")
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) return res.status(400).json('user not found')
        const posts = await Location.find({ createdBy: id }).populate('createdBy', 'name');
        console.log(id);
        console.log(posts);
        return res.status(200).json(posts)
    } catch (err) {
        console.log(err);
        return res.status(500).json("internal error")
    }
}  