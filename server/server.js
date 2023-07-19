const express = require("express");
const cors = require('cors');

const app = express();
const cookieparser = require("cookie-parser")
const bodyparser = require("body-parser");
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser())


app.use(cors({origin:' http://localhost:3000',credentials:true}));

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
  const { project_name, project_desc, manager } = req.body;

  const query = `
    UPDATE projectsdetails
    SET project_name = ?, project_desc = ?, manager = ?
    WHERE projectId = ?
  `;
  const values = [project_name, project_desc, manager, projectId];

  con.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating project:', err);
      res.status(500).json({ error: 'Failed to update project' });
      return;
    }

    res.json({ message: 'Project updated successfully' });
  });
});

// Delete project route
app.delete('/projectsdetails/:projectId', (req, res) => {
  const projectId = req.params.projectId;

  const query = `
    DELETE FROM projectsdetails
    WHERE projectId = ?
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

// Add new project route
app.post('/projectsdetails', (req, res) => {
  const { project_name, project_desc, manager } = req.body;

  const query = `
    INSERT INTO projectsdetails (project_name, project_desc, manager)
    VALUES (?, ?, ?)
  `;
  const values = [project_name, project_desc, manager];

  con.query(query, values, (err, results) => {
    if (err) {
      console.error('Error adding project:', err);
      res.status(500).json({ error: 'Failed to add project' });
      return;
    }

    res.json({ message: 'Project added successfully' });
  });
});


 
app.listen(5000, () => {
  console.log("server is working on http://localhost:5000");  
}); 

 