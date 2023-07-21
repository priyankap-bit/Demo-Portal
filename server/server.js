const express = require("express");
const cors = require('cors');
const multer = require('multer');
const app = express();
const cookieparser = require("cookie-parser")
const bodyparser = require("body-parser");
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser())


app.use(cors({origin:' http://localhost:3000',credentials:true}));

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});
const upload = multer({ storage });

const con = require("./config/db");
const {
  registerUser,
  getAllUsers,
  updateUser,
  getMe,
  deleteUser, 
  loginUser,
  logoutUser,
  getsingleUser,
  addUser,
} = require("./controllers/usersController");

// import Authentication 
const { isAuthenticatedUser, authorizeRoles } = require("./Middleware/auth");
// const { newProducts, getAllProducts } = require("./controllers/productController");


con.connect(function (error) {
  if (error) throw error;
  console.log("connected");
});

//All Routes
app.post("/user/register", registerUser); 
app.post("/user/login", loginUser);
app.get("/user/logout",isAuthenticatedUser,logoutUser);   
// app.post("/user/add", addUser)
app.get("/users",getAllUsers); // Only Admin
// app.get("/users",isAuthenticatedUser, authorizeRoles("admin"),getAllUsers); // Only Admin
// app.post("/user/new",addUser )
// app.post("/user/add", addUser)
// app.get("/user/me",isAuthenticatedUser, getMe); // Current login User details     
// app.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),getsingleUser) // Admin 
// app.put("/user/update/:id",isAuthenticatedUser,authorizeRoles("admin","masteradmin"), updateUser); // both Admin & MasterAdmin      
// app.delete("/user/delete/:id",isAuthenticatedUser,authorizeRoles("admin"), deleteUser); //only Admin   

app.get('/user/authenticated', isAuthenticatedUser, (req, res) => {
  res.json({ authenticated: true });
});

// Products Routes
// app.post("/product/new",isAuthenticatedUser, authorizeRoles("admin"), newProducts)
// app.get("/products",isAuthenticatedUser, authorizeRoles("admin"), getAllProducts)
// app.get("/products", getAllProducts)


// Fetch data from the database
app.get('/projectsdetails', (req, res) => {
  const query = 'SELECT * FROM `projectsdetails`';
  con.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the projectsdetails query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Update project route
app.put('/projectsdetails/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  const { project_name, project_desc, created_by } = req.body;

  const query = `
    UPDATE projectsdetails
    SET project_name = ?, project_desc = ?, created_by = ?
    WHERE id = ?
  `;
  const values = [project_name, project_desc, created_by, projectId];

  con.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating project:', err);
      res.status(500).json({ error: 'Failed to update project' });
    } else {
      res.json({ message: 'Project updated successfully' });
    }
  });
});

// Delete project route
app.delete('/projectsdetails/:projectId', (req, res) => {
  const projectId = req.params.projectId;

  const query = `
    DELETE FROM projectsdetails
    WHERE id = ?
  `;
  const values = [projectId];

  con.query(query, values, (err, results) => {
    if (err) {
      console.error('Error deleting project:', err);
      res.status(500).json({ error: 'Failed to delete project' });
      return;
    }

    res.json({ message: 'Project deleted successfully' });
  });
});

// Endpoint to fetch the total number of unique project names
app.get('/projectCount', (req, res) => {
  const query = 'SELECT COUNT(DISTINCT id) AS totalProjects FROM projectsdetails';

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving project count:', err);
      res.status(500).json({ error: 'Error retrieving project count' });
    } else {
      const totalProjects = results[0].totalProjects;
      console.log('Total number of unique project names:', totalProjects); // <-- Console.log here
      res.json({ totalProjects });
    }
  });
});

// Handle POST request for file upload
// Route to handle the form submission
// API endpoint to handle form submissions for adding a new project
app.post('/projectsdetails', upload.single('attachFile'), (req, res) => {
  const formData = req.body;

  // Process the attachFile if it exists
  const attachFile = req.file;
  if (attachFile) {
    const fileName = `${Date.now()}_${attachFile.originalname}`;
    const filePath = path.join(__dirname, 'uploads', fileName);
    fs.renameSync(attachFile.path, filePath);
    formData.file_name = fileName; // Insert the file name into the 'file_name' column
    formData.file_path = filePath; // Insert the file path into the 'file_path' column
  }

  // Convert the selectedMembers array to a comma-separated string
  const membersString = formData.members.join(', ');

  // Set the members field in formData with the formatted string
  formData.members = membersString;

  // Remove the attachFile property from formData as it's not needed for the SQL query
  delete formData.attachFile;

  // Insert formData into the projectsdetails table
  const sql = 'INSERT INTO projectsdetails SET ?';
  con.query(sql, formData, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      res.json({ success: true });
    }
  });
});

// Add new project route
// app.post('/projectsdetails', (req, res) => {
//   const { project_name, project_desc, manager } = req.body;

//   const query = `
//     INSERT INTO projectsdetails (project_name, project_desc, manager)
//     VALUES (?, ?, ?)
//   `;
//   const values = [project_name, project_desc, manager];

//   con.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error adding project:', err);
//       res.status(500).json({ error: 'Failed to add project' });
//       return;
//     }

//     res.json({ message: 'Project added successfully' });
//   });
// });




 
app.listen(5000, () => {
  console.log("server is working on http://localhost:5000");  
}); 

 