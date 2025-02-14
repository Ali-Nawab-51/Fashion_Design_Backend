require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINEARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
