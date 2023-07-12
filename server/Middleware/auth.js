/* eslint-disable prettier/prettier */

const jwt = require("jsonwebtoken");
const con = require("../config/db");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { Token } = req.cookies;

  if (!Token || Token === "") {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }

  try {
    const decodedData = jwt.verify(Token, "yash1234");
    console.log(decodedData, "decodedata");
    const userId = decodedData.id;
    console.log(userId);

    const getMeQuery = "SELECT * FROM users WHERE id = ?";

    const user = await new Promise((resolve, reject) => {
      con.query(getMeQuery, [userId], (error, users) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          const user = users[0];
          resolve(user);
        }
      });
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.user = user;
    console.log(user, "auth");
    console.log(req.user, "req.user");
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};


//   Authorize roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not allowed to access this resource`,
      });
    }
    next();
  }; 
};
      

// Middleware function to check if the user is a master admin
//   exports.isMasterAdmin = (req, res, next) => {
//     const userRole = req.user.role;

//     if (userRole === 'MasterAdmin') {
//       next();
//     } else {
//       res.status(403).json({ success: false, message: 'Access denied' });
//     }
//   };

// exports.isAdmin = (req, res, next) => {
//     const userRole = req.user.role;
//   console.log(userRole)
//     if (userRole === 'admin') {
//       next();
//     } else {
//       res.status(403).json({ success: false, message: 'Access denied' });
//     }
//   };
