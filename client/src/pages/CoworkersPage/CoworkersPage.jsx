import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


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

import SearchAppBar from "../../Components/searchBar.jsx";

import api_config from "../../Components/config.js";

function CoworkersPage() {
  document.title = "Coworkers Page";
  const [workspaces, setWorkspaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const boxRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_config.API_HOST}:5544/workspaces`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Filter workspaces based on the search term
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
        boxRef.current.scrollTop = 0; // Set the scroll position to the top
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]); // The empty dependency array ensures that the effect runs only once on mount

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <SearchAppBar setSearchTerm={setSearchTerm} />
        <Box
          ref={boxRef} // Get a reference to the Box element
          sx={{
            bgcolor: "#cfe8fc",
            height: "85vh",
            marginTop: " 2%",
            borderRadius: "9px",
            padding: "1%",
            overflowY: "auto",
            // overflowX: "scroll",
          }}
        >
          {workspaces.map((workspace) => (
            <div key={workspace.id} className="display-container">
              <Container maxWidth="lg">
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
                      // maxHeight: "70vh", // Set a maximum height for the table
                      overflowY: "auto", // Enable scrolling for the table if needed
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
                          <TableCell align="center">Number Of Seats</TableCell>
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
                          <TableCell align="center">
                            ${workspace.price}
                          </TableCell>
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
                      to={`/ownerInfo/${workspace.buildings_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">Get Owner Info</Button>
                    </Link>
                    <Button variant="contained">Book</Button>
                  </div>
                </Box>
              </Container>
            </div>
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default CoworkersPage;
