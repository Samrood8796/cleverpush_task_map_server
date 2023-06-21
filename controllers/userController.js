import cloudinary from '../config/cloudinary.js';
import User from '../model/userModel.js'

export const addUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        mobile,
        gender,
        status,
        location
    } = req.body

    try {
        console.log(req.body);
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(403).json({ msg: "Email Already Exist" })
        }

        let image = ""
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
            image = result.secure_url
        }
        user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            mobile: mobile,
            status: status,
            profile: image,
            location: location
        })
        res.status(200).json("registered successfully")
    } catch (err) {
        console.log(err);
        return res.status(500).json("internal error Occured" + err)
    }
}

export const editUser = async (req, res) => {
    try {
        const {id,...others}=req.body
        User.findByIdAndUpdate(id, others, {
            runValidators: true, 
        }).then((response) => {
            console.log(response);
            res.status(200).json("edited successfully ")
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json("internal error Occured" + err)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        User.findByIdAndRemove(id).then(() => {
            res.status(200).json("deleted successfully ")
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json("internal error Occured" + err)
    }
}

export const searchUser = async (req, res) => {
    const { key } = req.params
    try {
        const users = await User.find({
            "$or": [
                {
                    firstName: { $regex: key }
                },
                {
                    email: { $regex: key }
                }
            ]
        })
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const allUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalCount = await User.countDocuments();
        console.log(totalCount);
        const users = await User.find().skip(startIndex).limit(endIndex);
        const response = {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount: totalCount,
            users: users,
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message })
    }
}
export const getUserDetails = async (req, res) => {
    try {
        const response = await User.findById(req.query.id)
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message })
    }
}

export const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.body
        await User.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, runValidators: true }
        );
        res.status(200).json("status updated");
    } catch (err) {
        console.log(err); 
        res.status(404).json({ message: err.message })
    }
}