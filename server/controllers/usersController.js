const con = require("../config/db");
const jwt = require("jsonwebtoken");

//Register User
exports.registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Password validation
  if (password.length < 8 || !/[A-Z]/.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long and contain one uppercase letter.",
    });
  }

  const createquery = "INSERT INTO users(name,email,password,role) VALUES ?";

  const values = [[name, email, password, role]];

  con.query(createquery, [values], async (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ 
        success: false,
        message: "Error create user",
      });
    }
    const userId = user.insertId;
    const Token = jwt.sign({ id: userId }, "Tarun1234", {
      expiresIn: "5d",
    });
    console.log(userId, "controller");

    res.cookie("Token", Token, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Expires in 5 days
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      success: true,
      message: "successfully created new User",
      user,
      Token,
    });
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

  const loginquery = "SELECT * from login where email=? AND password=?";

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
    const status = user[0].status;
   
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
      status
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
exports.addUser = async (req, res, next) => {
  const { firstName, lastName, userName, contactNo, email, password, address } = req.body;

  // Check for empty fields
  if (!firstName || !lastName || !userName || !contactNo || !email || !password || !address) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the required fields.",
    });
  }

  // Password validation
  if (password.length < 8 || !/[A-Z]/.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long and contain one uppercase letter.",
    });
  }

  // Contact number validation
  const contactNoRegex = /^\d{7,10}$/;
  if (!contactNoRegex.test(contactNo)) {
    return res.status(400).json({
      success: false,
      message: "Contact number must be between 7 to 10 digits.",
    });
  }

  const name = firstName + " " + lastName;

  const createquery = "INSERT INTO users(name, userName, contactNo, email, password, address) VALUES ?";

  const values = [[name, userName, contactNo, email, password, address]];

  con.query(createquery, [values], async (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error creating user.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Successfully created new user.",
      user,
    });
  });
};

// Add new user 
exports.addUser = async (req, res, next) => {
  const { firstName, lastName, userName, contactNo, email, password, address } = req.body;

  // Check for empty fields
  if (!firstName || !lastName || !userName || !contactNo || !email || !password || !address) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the required fields.",
    });
  }

  // Password validation
  if (password.length < 8 || !/[A-Z]/.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long and contain one uppercase letter.",
    });
  }

  // Contact number validation
  const contactNoRegex = /^\d{7,10}$/;
  if (!contactNoRegex.test(contactNo)) {
    return res.status(400).json({
      success: false,
      message: "Contact number must be between 7 to 10 digits.",
    });
  }

  const name = firstName + " " + lastName;

  const createquery = "INSERT INTO users(name, userName, contactNo, email, password, address) VALUES ?";

  const values = [[name, userName, contactNo, email, password, address]];

  con.query(createquery, [values], async (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error creating user.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Successfully created new user.",
      user,
    });
  });
};





// Get all Users -- Admin
exports.getAllUsers =  (req, res, next) => {
  const getquery = "SELECT * FROM users";

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



//current login user deatil
exports.getMe = async (req, res, next) => {
  const getMeQuery = "SELECT * FROM users WHERE id = ?";
  con.query(getMeQuery, [req.user.id], (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error retrieving user",
      });
    }
    // req.user = user;
    // console.log(user);
    // next();

    res.status(200).json({
      success: true,
      user,
      isAuthenticated: true, 
    });
  });
};

//get singel user  -- Admin
exports.getsingleUser = async (req, res, next) => {
  const getMequery = "SELECT * FROM users where id=?";

  con.query(getMequery, req.params.id, (error, user) => {
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
        message: "User not found",
      });
    }

    res.status(201).json({
      success: true,
      error,
      user,
    });
  });
};

// Update User -- Admin -- masterAdmin
exports.updateUser = async (req, res, next) => {
  const { name, email, role } = req.body;

  const updatequery = "UPDATE users SET name=?, email=?,  role=? WHERE id=?";

  con.query(updatequery, [name, email, role, req.params.id], (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error updating user",
      });
    }
    if (user.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully updated user",
    });
  });
};

// Delete User --Admin
exports.deleteUser = async (req, res) => {
  const deletequery = " DELETE FROM users WHERE id=?";
  con.query(deletequery, [req.params.id], (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error deleting user",
      });
    }
    if (user.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully deleted user",
    });
  });
};
