const con = require("../config/db");
const jwt = require("jsonwebtoken");

//Register User
exports.registerUser = async (req, res, next) => {
  const { username, contact, email, password, department, position, status, role, creationtime } = req.body;

  // Password validation
  if (password.length < 8 || !/[A-Z]/.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long and contain one uppercase letter.",
    });
  }

  // Check if the username, email, or contact already exists in the database
  const checkQuery = "SELECT * FROM userdetails WHERE username = ? OR email = ? OR contact = ?";
  con.query(checkQuery, [username, email, contact], async (error, existingUsers) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error checking user existence.",
      });
    }

    if (existingUsers.length > 0) {
      // If the username, email, or contact exists, return an error response
      let errorMessage = "Username, email, or contact already exists.";

      // Determine which field(s) already exist
      existingUsers.forEach(existingUser => {
        if (existingUser.username === username) {
          errorMessage = "Username already exists.";
          console.log(errorMessage);
        }
        if (existingUser.email === email) {
          errorMessage = "Email already exists.";
          console.log(errorMessage);
        }
        if (existingUser.contact === contact) {
          errorMessage = "Contact already exists.";
          console.log(errorMessage);
        }
      });

      return res.status(409).json({
        success: false,
        message: errorMessage,
      });
    } else {
      // If the username, email, and contact are unique, proceed with user registration
      const createQuery = "INSERT INTO userdetails (username, contact, email, password, department, position) VALUES ?";
      const values = [[username, contact, email, password, department, position]];

      con.query(createQuery, [values], async (error, user) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: "Error creating user",
          });
        }
        const userId = user.insertId;
        const Token = jwt.sign({ id: userId }, "Tarun1234", {
          expiresIn: "5d",
        });

        res.cookie("Token", Token, {
          expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Expires in 5 days
          httpOnly: true,
          secure: true,
        });

        res.status(201).json({
          success: true,
          message: "Successfully created new user",
          user,
          Token,
        });
      });
    }
  });
};





// Login User
// Login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // if (!email || !password ) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Please fill all the required fields.",
  //   });
  // }

  const loginquery = "SELECT * from userdetails where email=? AND password=?";

  con.query(loginquery, [email, password], (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error create user",
      });
    }
    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "invalide Email & password",
      });
    }

    const userId = user[0].id;
    const role = user[0].role;
   
    const Token = jwt.sign({ id: userId }, "Tarun1234", {
      expiresIn: "5d",
    });

    res.cookie("Token", Token, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Expires in 5 days
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      success: true,
      message: "succefully Login",
      user,
      Token ,
      isAuthenticated: true, 
      role
    });
  });
};



//Logout User
exports.logoutUser =  (req, res, next) => {
  res.cookie("Token", "", {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(201).json({
    success: true,
    message: "logged Out",
  });
};

//add new users
// exports.addUser = async (req, res, next) => {
//   const { username, contact, email, password, department, position, status, role, creationtime } = req.body;

  // Check for empty fields
  // if (!username || !contact || !email || !password || !department || !position || !status || !role || !creationtime) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Please fill all the required fields.",
  //   });
  // }

  // Password validation
  // if (password.length < 8 || !/[A-Z]/.test(password)) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Password must be at least 8 characters long and contain one uppercase letter.",
  //   });
  // }

  // Contact number validation
  // const contactNoRegex = /^\d{7,10}$/;
  // if (!contactNoRegex.test(contact)) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Contact number must be between 7 to 10 digits.",
  //   });
  // }

  // const name = firstName + " " + lastName;

//   const createquery = "INSERT INTO users(username, contactNo, email, password, department, position, status, role, creationtime) VALUES ?";

//   const values = [[username, contact, email, password, department, position, status, role, creationtime]];

//   con.query(createquery, [values], async (error, user) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({
//         success: false,
//         message: "Error creating user.",
//       });
//     }

//     res.status(201).json({
//       success: true,
//       message: "Successfully created new user.",
//       user,
//     });
//   });
// };


// Get all Users -- Admin
exports.getAllUsers =  (req, res, next) => {
  const getquery = "SELECT * FROM userdetails";

  con.query(getquery, (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error create user",
      });
    }

    res.status(201).json({
      success: true,
      error,
      user,
    });
  });
};





// Add new user 
// exports.addUser = async (req, res, next) => {
//   const { firstName, lastName, userName, contactNo, email, password, address } = req.body;

//   // Check for empty fields
//   if (!firstName || !lastName || !userName || !contactNo || !email || !password || !address) {
//     return res.status(400).json({
//       success: false,
//       message: "Please fill all the required fields.",
//     });
//   }

//   // Password validation
//   if (password.length < 8 || !/[A-Z]/.test(password)) {
//     return res.status(400).json({
//       success: false,
//       message: "Password must be at least 8 characters long and contain one uppercase letter.",
//     });
//   }

//   // Contact number validation
//   const contactNoRegex = /^\d{7,10}$/;
//   if (!contactNoRegex.test(contactNo)) {
//     return res.status(400).json({
//       success: false,
//       message: "Contact number must be between 7 to 10 digits.",
//     });
//   }

//   const name = firstName + " " + lastName;

//   const createquery = "INSERT INTO users(name, userName, contactNo, email, password, address) VALUES ?";

//   const values = [[name, userName, contactNo, email, password, address]];

//   con.query(createquery, [values], async (error, user) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({
//         success: false,
//         message: "Error creating user.",
//       });
//     }

//     res.status(201).json({
//       success: true,
//       message: "Successfully created new user.",
//       user,
//     });
//   });
// };



//current login user deatil
// exports.getMe = async (req, res, next) => {
//   const getMeQuery = "SELECT * FROM users WHERE id = ?";
//   con.query(getMeQuery, [req.user.id], (error, user) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({
//         success: false,
//         message: "Error retrieving user",
//       });
//     }
//     // req.user = user;
//     // console.log(user);
//     // next();

//     res.status(200).json({
//       success: true,
//       user,
//       isAuthenticated: true, 
//     });
//   });
// };

//get singel user  -- Admin
// exports.getsingleUser = async (req, res, next) => {
//   const getMequery = "SELECT * FROM users where id=?";

//   con.query(getMequery, req.params.id, (error, user) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({
//         success: false,
//         message: "Error create user",
//       });
//     }
//     if (user.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(201).json({
//       success: true,
//       error,
//       user,
//     });
//   });
// };

// Update User -- Admin -- masterAdmin
// exports.updateUser = async (req, res, next) => {
//   const { name, email, role } = req.body;

//   const updatequery = "UPDATE users SET name=?, email=?,  role=? WHERE id=?";

//   con.query(updatequery, [name, email, role, req.params.id], (error, user) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({
//         success: false,
//         message: "Error updating user",
//       });
//     }
//     if (user.affectedRows === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Successfully updated user",
//     });
//   });
// };

// Delete User --Admin
// exports.deleteUser = async (req, res) => {
//   const deletequery = " DELETE FROM users WHERE id=?";
//   con.query(deletequery, [req.params.id], (error, user) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({
//         success: false,
//         message: "Error deleting user",
//       });
//     }
//     if (user.affectedRows === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Successfully deleted user",
//     });
//   });
// };
