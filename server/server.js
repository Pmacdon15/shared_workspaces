const express = require("express");
const app = express();
const path = require("path");


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
  getWorkspacesByBuildingName,
  createWorkspace,
  updateWorkspaceByName,
  deleteWorkspaceByName,
} = require("./database");

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//* Http requests
//* User requests
// Login
app.get("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await login(email, password)

  if (user === null) {
    res.status(400).send("Wrong email or password")
  } else {
    res.json(user)
}
});

// Get user by email
app.get("/users/:email", async (req, res) => {
  const { email } = req.params;
  const user = await getUserByEmail(email)

  if (user === null) {
    res.status(400).send("User not found")
  }  else {
    res.json(user)
}

});

// Create user
app.post("/users", async (req, res) => {
  const { email, first_name, password, owner } = req.body;
  const user = await createUser(email, first_name, password, owner)

  if (user === null) {
    res.status(400).send("User not created")
  } else {
    res.json(user)
  }
});

// Delete user by e mail
app.delete("/users/:email", async (req, res) => {
  const { email } = req.params;
  const user = await deleteUserByEmail(email)

  if (user === null) {
    res.status(400).send("User not found")
  } else {
    res.json(user)
}
});

//* Building requests
// Get buildings by email
app.get("/buildings/:email", async (req, res) => {
  const { email } = req.params
  const buildings = await getBuildingsByEmail(email)

  if (buildings === null) {
    res.status(400).send("Buildings not found")
  } else {
    res.json(buildings)
}
});

// Get building by name
app.get("/building/:name", async (req, res) => {
  const { name } = req.params;
  const building = await getBuildingByName(name)

  if (building === null) {
    res.status(400).send("Building not found")
  } else {
    res.json(building);
}
});

// Create building
app.post("/building", async (req, res) => {
  const { 
    email,
    name,     
    street,
    street_number,
    city,
    province,
    postal_code,
    location,
    smoking,
    parking,
    public_transport } = req.body

  const building = await createBuilding(
    email,
    name,    
    street,
    street_number,
    city,
    province,
    postal_code,
    location,
    smoking,
    parking,
    public_transport)

  if (building === null) {
    res.status(400).send("Building not created")
  } else {
    res.json(building)
}
})

// Update building by name
app.put("/building/:name", async (req, res) => {
  const { name } = req.params
  const { 
    street,
    street_number,
    city,
    province,
    postal_code,
    location,
    smoking,
    parking,
    public_transport } = req.body

  const building = await updateBuildingByName(
    name,
    street,
    street_number,
    city,
    province,
    postal_code,
    location,
    smoking,
    parking,
    public_transport)

  if (building === null) {
    res.status(400).send("Building not updated")
  } else {
    res.json(building)
}
})

// Delete building by name
app.delete("/building/:name", async (req, res) => {
  const { name } = req.params;
  const building = await deleteBuildingByName(name)

  if (building === null) {
    res.status(400).send("Building not found")
  } else {
    res.json(building)
}
})

//* Workspace requests
// Get workspaces
app.get("/workspaces", async (req, res) => {
  const workspaces = await getWorkspaces()

  if (workspaces === null) {
    res.status(400).send("Workspaces not found")
  } else {
    res.json(workspaces)
}
})

// Get workspace by name
app.get("/workspace/:name", async (req, res) => {
  const { name } = req.params;
  const workspace = await getWorkspaceByName(name)

  if (workspace === null) {
    res.status(400).send("Workspace not found")
  } else {
    res.json(workspace)
}
})

// Get workspaces by building name
app.get("/workspaces/:building_name", async (req, res) => {
  const { building_name } = req.params;
  const workspaces = await getWorkspacesByBuildingName(building_name)

  if (workspaces === null) {
    res.status(400).send("Workspaces not found")
  } else {
    res.json(workspaces);
}
})

// Create workspace
app.post("/workspace", async (req, res) => {
  const { 
    name,
    building_name,    
    number_of_seats,
    price,
    lease_term,
    available,
    size,
    type } = req.body

  const workspace = await createWorkspace(
    name,
    building_name, 
    number_of_seats, 
    price, 
    lease_term, 
    available,
    size, 
    type)
    if (workspace === null) {
      res.status(400).send("Workspace not created")
    } else {
      res.json(workspace)
  }
})



app.listen(5544, () => {
  console.log("Server is listening on port 5544");
});
    
