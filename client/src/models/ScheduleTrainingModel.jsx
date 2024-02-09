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
import React, { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import apiController from "../apiController";

const ScheduleTrainingModel = ({
  open,
  onClose,
  fetchRegistrations,
  registration_id,
}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "",
    mode: "select",
  });
  const [errors, setErrors] = useState({});

  const handleSelectChange = () => (e) => {
    setFormData({ ...formData, mode: e.target.value });
    setErrors({ ...errors, mode: "" });
  };
  const handleDateChange = (event) => {
    setFormData({ ...formData, date: event.target.value });
    setErrors({ ...errors, date: "" });
  };

  const handleTime = (event) => {
    const selectedTime = event.target.value;
    setFormData({
      ...formData,
      time: selectedTime,
    });
    setErrors({ ...errors, time: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (formData.mode === "select") {
      newErrors.mode = "Mode is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await apiController.put(`/registrations/${registration_id}/schedule`, {
        status: "Training Scheduled",
        date: formData.date,
      });
      fetchRegistrations();
      setFormData({});
      onClose();
    } catch (error) {
      console.error("Error scheduling training:", error);
    }
  };

  const mode = [
    { value: "select", label: "-- select one --" },
    { value: "Offline", label: "Offline" },
    { value: "Online", label: "Online" },
  ];

  const handleClose = () => {
    onClose();
    setErrors({});
    setFormData({});
  };
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
              width: "550px",
              minHeight: "22rem",
              margin: "10%",
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
                    Schedule Training
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <hr />
            <form>
              <Grid container>
                <Grid p={2} item xs={12}>
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Date<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      placeholder="Click to set date"
                      InputLabelProps={{
                        shrink: true,
                        required: true,
                      }}
                      type="date"
                      value={formData.date}
                      onChange={handleDateChange}
                      InputProps={{
                        style: { height: "34px" },
                      }}
                      sx={{
                        padding: "0",
                        margin: "0",
                        width: "100%",
                      }}
                    />
                    {errors.date && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.date}
                      </Typography>
                    )}
                  </Box>
                  <Box mt={2}>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Time<span className="error">*</span>
                    </Typography>
                    <TextField
                      style={{ fontFamily: "poppins" }}
                      size="small"
                      type="time"
                      sx={{
                        padding: "0",
                        margin: "0",
                        width: "100%",
                      }}
                      InputProps={{
                        style: { height: "34px" },
                      }}
                      value={formData.time}
                      onChange={handleTime}
                    />
                    {errors.time && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.time}
                      </Typography>
                    )}
                  </Box>
                  <Box mt={2}>
                    <FormControl fullWidth>
                      <FormLabel
                        style={{
                          fontSize: "15px",
                          fontFamily: "poppins",
                          color: "#000000",
                        }}
                      >
                        Select the mode
                        <span className="error">*</span>
                      </FormLabel>
                      <Select
                        fullWidth
                        value={formData.mode || ""}
                        onChange={handleSelectChange("course")}
                        sx={{ height: "40px" }}
                      >
                        {mode.map((mode) => (
                          <MenuItem key={mode.value} value={mode.value}>
                            <Typography style={{ fontFamily: "poppins" }}>
                              {mode.label}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.mode && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.mode}
                      </Typography>
                    )}
                  </Box>
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
};

export default ScheduleTrainingModel;
