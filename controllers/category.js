exports.create = async (req, res) => {
    // const {name} = req.body;
    console.log(req.body.category);
    res.status(200).json({message:"successfully created"})
    // try {
    //     const user = await User.findOne({ email: email });
    //     if (user) {
    //         return res.status(400).json({ errorMessage: "Email Already Exists" });
    //     }

    //     const newUser = new User();
    //     newUser.username = username;
    //     newUser.email = email;
    //     bcrypt.hash(password, 10).then(function (hash) {
    //         // Store hash in your password DB.
    //         newUser.password = hash
    //         newUser.save();
    //         res.json({ successMessage: "Registration Successfully, please login" });
    //     });
    // } catch (err) {
    //     res.status(400).json({ errorMessage: "Sign up server error" });
    // }
}