import {
  Backdrop,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import apiController from "../apiController";

function RegistrationModel({
  open,
  onClose,
  fetchRegistrations,
  editingRegistration,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    qualification: "select",
    gender: "select",
    location: "",
    course: "select",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRegistration) {
      setFormData({
        firstName: editingRegistration.firstName,
        lastName: editingRegistration.lastName,
        phoneNumber: editingRegistration.phoneNumber,
        email: editingRegistration.email,
        qualification: editingRegistration.qualification,
        gender: editingRegistration.gender,
        location: editingRegistration.location,
        course: editingRegistration.course,
      });
    }
  }, [editingRegistration]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleSelectChange = (fieldName) => (e) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
    setErrors({ ...errors, [fieldName]: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]{1,20}$/.test(formData.firstName.trim())) {
      newErrors.firstName = "Only characters are allowed";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]{1,20}$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Only characters are allowed";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.qualification === "select") {
      newErrors.qualification = "Qualification is required";
    }

    if (formData.gender === "select") {
      newErrors.gender = "Gender is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (!/^[A-Za-z ]{1,25}$/.test(formData.location.trim())) {
      newErrors.location = "Only characters are allowed up to 25";
    }

    if (formData.course === "select") {
      newErrors.course = "Course is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      if (editingRegistration) {
        const response = await apiController.put(
          `/registrations/${editingRegistration._id}`,
          formData
        );
        console.log(response.data);
      } else {
        const response = await apiController.post("/registrations", formData);
        console.log(response.data);
      }
      fetchRegistrations();
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        qualification: "select",
        gender: "select",
        location: "",
        course: "select",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting registration:", error);
    }
  };

  const handleClose = () => {
    onClose();
    setErrors({});
  };

  const courses = [
    { value: "select", label: "--select one--" },
    { value: "Web Development", label: "Web Development" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Data Science", label: "Data Science" },
    { value: "pProgramming", label: "Programming" },
    { value: "Blockchain", label: "Blockchain" },
  ];

  const qualificationOptions = [
    { value: "select", label: "-- select one --" },
    { value: "No formal education", label: "No formal education" },
    { value: "Primary education", label: "Primary education" },
    { value: "Secondary education", label: "Secondary education" },
    { value: "Bachelor's degree", label: "Bachelor's degree" },
    { value: "Master's degree", label: "Master's degree" },
    { value: "others", label: "Others" },
  ];

  const genderOptions = [
    { value: "select", label: "-- select one --" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Backdrop
          open={open}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Paper
            style={{
              maxWidth: "850px",
              minHeight: "32rem",
              margin: "5%",
              borderRadius: "10px",
            }}
          >
            <Grid container>
              <Grid
                item
                sx={{ display: "flex", padding: "15px 33px 8px 15px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "3%",
                  }}
                >
                  <FaAngleDoubleRight size={25} style={{ color: "#0056CE" }} />
                  <Typography
                    style={{ whiteSpace: "nowrap", fontFamily: "poppins" }}
                  >
                    {editingRegistration
                      ? "Edit Registration"
                      : "Register For Course"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <hr />
            <form>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    gap: "4%",
                    padding: "10px 20px 0px 20px",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      First name<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={{ width: "24rem" }}
                    />
                    {errors.firstName && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.firstName}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Last Name<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={{ width: "24rem" }}
                    />
                    {errors.lastName && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.lastName}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    gap: "4%",
                    padding: "10px 20px 0px 20px",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Phone Number<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      style={{ width: "24rem" }}
                    />
                    {errors.phoneNumber && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.phoneNumber}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Email<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{ width: "24rem" }}
                    />
                    {errors.email && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.email}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    gap: "4%",
                    padding: "10px 20px 0px 20px",
                  }}
                >
                  <FormControl style={{ width: "24rem" }}>
                    <FormLabel
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Qualification
                      <span className="error">*</span>
                    </FormLabel>
                    <Select
                      fullWidth
                      value={formData.qualification}
                      onChange={handleSelectChange("qualification")}
                      sx={{ height: "40px" }}
                    >
                      {qualificationOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.qualification && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.qualification}
                      </Typography>
                    )}
                  </FormControl>

                  <FormControl style={{ width: "24rem" }}>
                    <FormLabel
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Gender
                      <span className="error">*</span>
                    </FormLabel>
                    <Select
                      fullWidth
                      value={formData.gender}
                      onChange={handleSelectChange("gender")}
                      sx={{ height: "40px" }}
                    >
                      {genderOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.gender && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.gender}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ padding: "10px 20px 0px 20px" }}>
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontFamily: "poppins",
                      color: "#000000",
                    }}
                  >
                    Location<span className="error">*</span>
                  </Typography>
                  <TextField
                    size="small"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    variant="outlined"
                    style={{ width: "24rem" }}
                  />
                  {errors.location && (
                    <Typography
                      style={{ fontSize: "15px", fontFamily: "poppins" }}
                      color="error"
                    >
                      {errors.location}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    padding: "10px 20px 0px 20px",
                  }}
                >
                  <FormControl fullWidth>
                    <FormLabel
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Select the course
                      <span className="error">*</span>
                    </FormLabel>
                    <Select
                      fullWidth
                      name="shortlistReason"
                      value={formData.course}
                      onChange={handleSelectChange("course")}
                      sx={{ height: "40px" }}
                    >
                      {courses.map((course) => (
                        <MenuItem key={course.value} value={course.value}>
                          {course.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.course && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.course}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                align="start"
                mt={0}
              >
                <Box display="flex" m={2}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    size="medium"
                    id="text-13-500-20-Inter"
                    style={{
                      background: "#0056CE",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      width: "130px",
                      height: "35px",
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleClose}
                    sx={{
                      ml: 2,
                      background: "#0056CE",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      width: "130px",
                      height: "35px",
                    }}
                    id="text-13-500-20-Inter"
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </form>
          </Paper>
        </Backdrop>
      </Modal>
    </>
  );
}

export default RegistrationModel;
