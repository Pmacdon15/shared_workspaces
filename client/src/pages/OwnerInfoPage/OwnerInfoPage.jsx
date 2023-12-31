import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import api_config from "../../Components/config.js";

const OwnerInfoPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const boxRef = useRef(null);

  useEffect(() => {
    document.title = 'Owner Information';
    const fetchData = async () => {
      try {
        const buildingId = window.location.pathname.split("/").pop();
        console.log(buildingId);
        const response = await fetch(
          `${api_config.API_HOST}:5544/user/${buildingId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserInfo(data);
        boxRef.current.scrollTop = 0; // Set the scroll position to the top
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          ref={boxRef}
          sx={{
            bgcolor: "#cfe8fc",
            height: "80vh",
            margin: "10%",
            borderRadius: "9px",
            padding: "1%",
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                bgcolor: "#90caf9",
                borderRadius: "9px",
                paddingBottom: "1%",
                paddingLeft: "1%",
              }}
            >
              <div>
                <h2>User Information</h2>
                <p>Name: {userInfo[0]?.first_name}</p>
                <p>Email: {userInfo[0]?.email}</p>
              </div>
            </Box>
          </Container>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default OwnerInfoPage;
