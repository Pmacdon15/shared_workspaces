import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
//import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

import api_config from "../../Components/config.js";

const AddBuilding = () => {
  document.title = "Add Building";

  const [smokingChecked, setSmokingChecked] = useState(false);
  const [parkingChecked, setParkingChecked] = useState(false);
  const [public_transportChecked, setPublic_transportChecked] = useState(false);
  // Initialize useForm
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  // Below is for actively checking the input fields

  const [nameValue, setNameValue] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleNameInputChange = (event) => {
    const { value } = event.target;
    setNameValue(value);
    setNameError(value.trim().length < 3);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("name", nameValue);
  }, [nameValue, setValue]);

  const [streetValue, setStreetValue] = useState("");
  const [streetError, setStreetError] = useState(false);

  const handleStreetInputChange = (event) => {
    const { value } = event.target;
    setStreetValue(value); // Set the value without trimming
    setStreetError(value.trim().length < 3);
  };

  // Use useEffect to update TextField value when streetValue changes
  useEffect(() => {
    // Set the value of the TextField
    setValue("street", streetValue);
  }, [streetValue, setValue]);

  const [numberValue, setNumberValue] = useState("");
  const [numberError, setNumberError] = useState(false);

  const handleNumberInputChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, "");
    setNumberValue(numericValue);
    setNumberError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("street_number", numberValue);
  }, [numberValue, setValue]);

  const [cityValue, setCityValue] = useState("");
  const [cityError, setCityError] = useState(false);

  const handleCityInputChange = (event) => {
    const { value } = event.target;
    setCityValue(value);
    setCityError(value.trim().length < 3);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("city", cityValue);
  }, [cityValue, setValue]);

  const [provinceValue, setProvinceValue] = useState("");
  const [provinceError, setProvinceError] = useState(false);

  const handleProvinceInputChange = (event) => {
    const { value } = event.target;
    setProvinceValue(value);
    setProvinceError(value.trim().length < 2);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("province", provinceValue);
  }, [provinceValue, setValue]);

  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [postalCodeError, setPostalCodeError] = useState(false);

  const handlePostalCodeInputChange = (event) => {
    const { value } = event.target;
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    setPostalCodeValue(value);
    setPostalCodeError(!postalCodeRegex.test(value));
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("postal_code", postalCodeValue);
  }, [postalCodeValue, setValue]);

  const [locationValue, setLocationValue] = useState("");
  const [locationError, setLocationError] = useState(false);

  const handleLocationInputChange = (event) => {
    const { value } = event.target;
    setLocationValue(value);
    setLocationError(value.trim().length < 2);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("location", locationValue);
  }, [locationValue, setValue]);

  // Handle checkbox changes
  const handleCheckboxChange = (event, checkboxStateSetter) => {
    checkboxStateSetter(event.target.checked);
  };

  const renderCheckbox = (label, state, stateSetter) => {
    return (
      <div className="checkbox-container">
        <label>{label}</label>
        <Checkbox
          {...register(label.toLowerCase())}
          checked={state}
          onChange={(event) => handleCheckboxChange(event, stateSetter)}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </div>
    );
  };

  const onSubmit = async (data) => {
    try {
      for (const key in data) {
        if (data[key] === "") {
          alert("Please fill out all fields before submitting.");
          return;
        }
      }

      data.smoking = smokingChecked ? 1 : 0;
      data.parking = parkingChecked ? 1 : 0;
      data.public_transport = public_transportChecked ? 1 : 0;

      const user_email = window.location.pathname.split("/").pop();
      console.log("User Email: ", user_email);

      const response = await axios.post(
        `${api_config.API_HOST}:5544/building/${user_email}`,
        data
      );

      if (response.status === 200) {
        const user_email = response.data[0].user_email;
        navigate(`/ownerspage/${user_email}`);
      }
    } catch (error) {
      console.error("Error while submitting the form:", error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "90vh",
            marginTop: " 3%",
            borderRadius: "9px",
            padding: "1%",
            overflowY: "scroll",
          }}
        >
          <div className="header">
            <div className="text">Add Building</div>
            <div className="underline"></div>
          </div>
          <br></br>
          <Container maxWidth="md">
            <Box
              sx={{
                bgcolor: "#90caf9",
                borderRadius: "9px",
                paddingTop: "1px",
                paddingBottom: "1%",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
                <TextField
                  sx={{ width: "90%" }}
                  // margin = "1%"
                  {...register("name")}
                  label="Building Name"
                  variant="outlined"
                  onChange={handleNameInputChange}
                  // value={nameValue}
                  error={nameError}
                  helperText={
                    nameError ? "Name must be at least 3 characters" : ""
                  }
                />

                <TextField
                  sx={{ width: "90%" }}
                  {...register("street")}
                  label="Street"
                  variant="outlined"
                  onChange={handleStreetInputChange}
                  value={streetValue}
                  error={streetError}
                  helperText={
                    streetError ? "Street must be at least 3 characters" : ""
                  }
                />              

                <TextField
                  sx={{ width: "90%" }}
                  {...register("street_number")}
                  label="Street Number"
                  variant="outlined"
                  value={numberValue}
                  onChange={handleNumberInputChange}
                  error={numberError}
                  helperText={numberError ? "Please enter numbers only" : ""}
                />

                <TextField
                  sx={{ width: "90%" }}
                  {...register("city")}
                  label="City"
                  variant="outlined"
                  value={cityValue}
                  onChange={handleCityInputChange}
                  error={cityError}
                  helperText={
                    cityError ? "City must be at least 3 characters" : ""
                  }
                />

                <TextField
                  sx={{ width: "90%" }}
                  {...register("province")}
                  label="Province"
                  variant="outlined"
                  value={provinceValue}
                  onChange={handleProvinceInputChange}
                  error={provinceError}
                  helperText={
                    provinceError
                      ? "Province must be at least 3 characters"
                      : ""
                  }
                />

                <TextField
                  sx={{ width: "90%" }}
                  {...register("postal_code")}
                  label="Postal Code"
                  variant="outlined"
                  value={postalCodeValue}
                  onChange={handlePostalCodeInputChange}
                  error={postalCodeError}
                  helperText={
                    postalCodeError ? "Please enter a valid postal code" : ""
                  }
                />

                <TextField
                  sx={{ width: "90%" }}
                  {...register("location")}
                  label="Location"
                  value={locationValue}
                  variant="outlined"
                  onChange={handleLocationInputChange}
                  error={locationError}
                  helperText={
                    locationError
                      ? "Location must be at least 2 characters"
                      : ""
                  }
                />

                <div className="checkbox-container">
                  {renderCheckbox("Smoking", smokingChecked, setSmokingChecked)}
                  {renderCheckbox("Parking", parkingChecked, setParkingChecked)}
                  {renderCheckbox(
                    "Public Transport",
                    public_transportChecked,
                    setPublic_transportChecked
                  )}
                </div>
                <div className="submit-container">
                  <Button type="submit" variant="contained">
                    Add Building
                  </Button>
                  <Button variant="contained" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </div>
              </form>
            </Box>
          </Container>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AddBuilding;
