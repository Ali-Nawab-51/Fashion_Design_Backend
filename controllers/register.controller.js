const cloudinary = require("../utils/cloudinaryConfig");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, cnic, postalAddress, permanentAddress, country, province, city, zipCode } = req.body;

    if (!name || !email || !password || !phoneNumber || !cnic || !postalAddress || !permanentAddress || !country || !province || !city || !zipCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "user_images", resource_type: "auto" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.status(500).json({ message: "Image upload failed" });
          }
          imageUrl = result.secure_url;

          // Save user after uploading image
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            cnic,
            postalAddress,
            permanentAddress,
            country,
            province,
            city,
            zipCode,
            imageUrl,
          });

          await newUser.save();
          res.status(201).json({ message: "User registered successfully", user: newUser, status: true });
        }
      );
      result.end(req.file.buffer);
    } else {
      // Save user without image
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        cnic,
        postalAddress,
        permanentAddress,
        country,
        province,
        city,
        zipCode,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: newUser, status: true });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = register;
