import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";

import {  Link } from "react-router-dom";

import SearchAppBar from "../../Components/navBar.jsx";

import api_config from "../../Components/config.js";

function BuildingsWorkspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user_email, setUser_email] = useState(""); 
  const building_name = window.location.pathname.split("/").pop(); 

  const boxRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buildingName = window.location.pathname.split("/").pop();
        const response = await fetch(
          `${api_config.API_HOST}:5544/workspaces/${buildingName}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser_email(data[0].user_email);//added by me
        //const user_email = data[0].user_email;  
        console.log(user_email);
        const filteredData = data.filter((workspace) => {
          return Object.entries(workspace).some(([key, value]) => {
            const stringValue =
              typeof value === "number" ? value.toString() : value;

            if (key === "available") {
              return (
                (searchTerm.toLowerCase() === "yes" && value === 1) ||
                (searchTerm.toLowerCase() === "no" && value === 0)
              );
            }

            return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
          });
        });
        setWorkspaces(filteredData);
        boxRef.current.scrollTop = 0;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm, user_email]);  

  const handleDelete = async (workspaceName) => {
    try {
      console.log("Deleting workspace:", workspaceName);

      const response = await fetch(
        `http://localhost:5544/workspace/${workspaceName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the state to remove the deleted workspace
      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.filter((workspace) => workspace.name !== workspaceName)
      );

      console.log("Workspace deleted successfully.");
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <SearchAppBar setSearchTerm={setSearchTerm} user_email={user_email} building_name={building_name} />
        <Box
          ref={boxRef}
          sx={{
            bgcolor: "#cfe8fc",
            height: "85vh",
            marginTop: " 2%",
            borderRadius: "9px",
            padding: "1%",
            overflowY: "auto",
          }}
        >          
          {workspaces.map((workspace) => (
            // <div key={workspace.id} className="display-container">
            <Container maxWidth="lg" key={workspace.name}>
              <Box
                sx={{
                  bgcolor: "#90caf9",
                  borderRadius: "9px",
                  paddingBottom: "1%",
                  paddingLeft: "1%",
                }}
              >
                <h2>{workspace.name}</h2>
                <TableContainer
                  component={Paper}
                  sx={{
                    overflowY: "auto",
                    maxWidth: 710,
                  }}
                >
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Number of Seats</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Lease Term(Days)</TableCell>
                        <TableCell align="center">Available</TableCell>
                        <TableCell align="center">Size(Sqr Feet):</TableCell>
                        <TableCell align="center">Type</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          {workspace.number_of_seats}
                        </TableCell>
                        <TableCell align="center">${workspace.price}</TableCell>
                        <TableCell align="center">
                          {workspace.lease_term}
                        </TableCell>
                        <TableCell align="center">
                          {workspace.available === 1 ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="center">{workspace.size}</TableCell>
                        <TableCell align="center">{workspace.type}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="options-container">
                  <Link
                    to={`/editworkspace/${workspace.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">Edit</Button>
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(workspace.name)}
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </Container>
            // </div>
          ))}
          <div className="submit-container">
          <Link
              to={`/addWorkspace/${window.location.pathname.split("/").pop()}`}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained">Add Workspace</Button>
            </Link>
            </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default BuildingsWorkspaces;
