const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory before sending to Cloudinary
const upload = multer({ storage });

module.exports = upload;
