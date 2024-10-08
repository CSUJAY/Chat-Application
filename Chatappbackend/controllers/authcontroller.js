import bcrypt from 'bcryptjs';
import User  from '../models/user.model.js';

export const signup = async (req, res) => {
    try{
        const {username, password, confirmPassword,gender} = req.body;

        if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

        // HASH PASSWORD HERE for security
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        
        //api for avatar placeholders
        // https://avatar-placeholder.iran.liara.run/
        //profile pics for users profile
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;  
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
			username,
            gender,
			password: hashedPassword,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

        await newUser.save(); //saving the new user in databsae using postman request

        res.status(201);
        res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
 

    }catch(error){
            console.error("Error in signup controller:", error);
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        
    }
};
export const login = async (req, res) => {
	try {
		
	} catch (error) {
		
	}
};
export const logout = async (req, res) => {
	try {
		
	} catch (error) {
		
	}
};