const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  login,
  getUserByEmail,
  createUser,
  deleteUserByEmail,
  getBuildingsByEmail,
  getBuildingByName,
  createBuilding,
  updateBuildingByName,
  deleteBuildingByName,
  getWorkspaces,
  getWorkspaceByName,
  getWorkspacesByBuildingNameAndWorkSpaceName,
  getWorkspacesByBuildingName,
  createWorkspace,
  updateWorkspaceByName,
  deleteWorkspaceByName,
} = require("./database");

//* Http requests
// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await login(email, password);
  if (user === null) {
    res.status(400).send("Wrong email or password");
  } 
    res.json(user);

});

// Get user by email
app.get("/users/:email", async (req, res) => {
  const { email } = req.params;

  const user = await getUserByEmail(email);
  if (user === null) {
    res.status(400).send("User not found");
  } 
    res.json(user);

});


app.listen(5544, () => {
  console.log("Server is listening on port 5544");
});
