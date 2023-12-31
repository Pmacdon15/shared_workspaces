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
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";

// import { useForm } from "react-hook-form";

import SearchAppBar from "../../Components/navBar.jsx";

import api_config from "../../Components/config.js";

const OwnersPage = () => {
  // const { register, handleSubmit } = useForm();

  const user_email = window.location.pathname.split("/").pop();
  const [userBuildings, setUserBuildings] = useState([]);
  const boxRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Owner's Page";
    const fetchData = async () => {
      try {
        const userEmail = window.location.pathname.split("/").pop();
        console.log("user e mail: " + userEmail);
        const response = await fetch(
          `${api_config.API_HOST}:5544/buildings/${userEmail}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filteredData = data.filter((workspace) => {
          return Object.entries(workspace).some(([key, value]) => {
            const stringValue =
              typeof value === "number" ? value.toString() : value;

            if (
              key === "smoking" ||
              key === "parking" ||
              key === "public_transport"
            ) {
              return (
                (searchTerm.toLowerCase() === "yes" && value === 1) ||
                (searchTerm.toLowerCase() === "no" && value === 0)
              );
            }

            return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
          });
        });

        setUserBuildings(filteredData);
        boxRef.current.scrollTop = 0; // Set the scroll position to the top
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleDeleteBuilding = async (buildingName) => {
    try {
      const response = await fetch(
        `${api_config.API_HOST}:5544/building/${buildingName}`,
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

      // Update state to trigger re-render after successful deletion
      setUserBuildings((prevBuildings) =>
        prevBuildings.filter((building) => building.name !== buildingName)
      );
    } catch (error) {
      console.error("Error deleting building:", error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <SearchAppBar setSearchTerm={setSearchTerm} user_email={user_email} />
        <Box
          ref={boxRef}
          sx={{
            bgcolor: "#cfe8fc",
            height: "85vh",
            marginTop: " 2%",
            borderRadius: "9px",
            overflowY: "auto",
            marginBottom: "2%",
          }}
        >
          {userBuildings.map((building) => (
            // <div key={building.name} className="display-container">
            <Container maxWidth="lg" key={building.name}>
              <Box
              className="BoxStyle"
                sx={{
                  bgcolor: "#90caf9",
                  borderRadius: "9px",
                  paddingBottom: "2%",                   
                  margin: "2%",
                }}
              >
                <h2>{building.name}</h2>
                <TableContainer
                className="TableContainerStyle"
                  component={Paper}
                  sx={{
                    overflowY: "auto",
                    // maxWidth: "40%",
                    marginBottom: "1%",
                  }}
                >
                  <Table                  
                    // sx={{ maxWidth: 400 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Street</TableCell>
                        <TableCell align="center">Street Number</TableCell>
                        <TableCell align="center">City</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          {building.street}
                        </TableCell>
                        <TableCell align="center">
                          {building.street_number}
                        </TableCell>
                        <TableCell align="center">{building.city}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer
                className="TableContainerStyle" 
                  component={Paper}
                  sx={{
                    overflowY: "auto",
                  }}
                >
                  <Table
                    // sx={{ minWidth: 600 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Province</TableCell>
                        <TableCell align="center">Postal Code</TableCell>
                        <TableCell align="center">location</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          {building.province}
                        </TableCell>
                        <TableCell align="center">
                          {building.postal_code}{" "}
                        </TableCell>
                        <TableCell align="center">
                          {building.location}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer
                className="TableContainerStyle"
                  component={Paper}
                  sx={{
                    marginTop: "1%",
                    overflowY: "auto",                   
                  }}
                >
                  <Table
                    sx={{ minWidth: 400 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Smoking</TableCell>
                        <TableCell align="center">Parking</TableCell>
                        <TableCell align="center">Public Transport</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          {building.smoking === 1 ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="center">
                          {building.parking === 1 ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="center">
                          {building.public_transport === 1 ? "Yes" : "No"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="options-container">
                  <Link
                    to={`/editbuilding/${building.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">Edit</Button>
                  </Link>
                  <Link
                    to={`/workspaces/${building.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">View Workspaces</Button>
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteBuilding(building.name)}
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </Container>
            // </div>
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default OwnersPage;
