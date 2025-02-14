const express = require("express");
const User = require("../models/user.model");

const updateSpecificUser = async (req, res, next) => {
    const updates = req.body; 
    const { userId } = req.params;
    console.log(userId)
    console.log(updates)

    try {
        // Check if the user exists
        const findUser = await User.findById(userId);

        if (!findUser) {
            const error = new Error("User not found");
            error.statusCode = 404; // Use 404 for "Not Found"
            throw error;
        }

        // Update the user's details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates }, // Use $set to update only the provided fields
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // Send success response with the updated user data
        res.status(200).json({
            status: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        next(error); 
    }
};

module.exports = updateSpecificUser;