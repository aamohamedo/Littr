import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";

// import SQL queries
import {supabaseEventInsert } from '../../Models/queries';

import "./CreateCardForm.css";
import {
  Stack,
  Typography,
  TextField,
  Divider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const jankTheme = createTheme({
  palette: {
    primary: {
      main: "#6AAF88",
    },
  },
});

export default function CreateCardForm() {
  const [postTitle, setPostTitle] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationPostcode, setLocationPostcode] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [recommendedEquipment, setRecommendedEquipment] = useState("");
  const [disposalMethod, setDisposalMethod] = useState("");
  const [date, setDate] = useState(null);

  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handleLocationAddressChange = (event) => {
    setLocationAddress(event.target.value);
  };

  const handleLocationPostcodeChange = (event) => {
    setLocationPostcode(event.target.value);
  };

  const handleAdditionalInformationChange = (event) => {
    setAdditionalInformation(event.target.value);
  };

  const handleRecommendedEquipmentChange = (event) => {
    setRecommendedEquipment(event.target.value);
  };

  const handleDisposalMethodChange = (event) => {
    setDisposalMethod(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleCreatePost = async () => {
    const PostData = {
      creator_user_id: "XXX",
      location: locationAddress,
      address: locationPostcode,
      created_at: new Date(),
      likes: 0,
      is_flagged: false,
      post_introduction: postTitle,
      has_uneven_ground: document.getElementById("checkbox-uneven-ground")?.checked || false,
      has_bathrooms: document.getElementById("checkbox-bathrooms")?.checked || false,
      has_parking: document.getElementById("checkbox-parking")?.checked || false,
      is_remote_location: document.getElementById("checkbox-remote-location")?.checked || false,
      disposal_method: disposalMethod,
      equipment: recommendedEquipment,
      date_timestamp: new Date(date),
    };

    supabaseEventInsert(PostData);
  };

  return (
    <div id="create-card-outer-container">
      <Navbar />
      <ThemeProvider theme={jankTheme}>
        <Typography variant="h4" id="create-card-title">
          Create a Post
        </Typography>
        <Stack spacing={2} direction="column" id="create-card-form-container">
          <TextField
            id="post-title"
            label="Title"
            variant="standard"
            value={postTitle}
            onChange={handlePostTitleChange}
          />
          <TextField
            id="location-address"
            placeholder="Address"
            variant="standard"
            value={locationAddress}
            onChange={handleLocationAddressChange}
          />
          <TextField
            id="location-postcode"
            placeholder="Postcode"
            variant="standard"
            value={locationPostcode}
            onChange={handleLocationPostcodeChange}
          />
          <Divider />
          <Typography id="date-time-title" variant="h6">
            Date and Time
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="date-picker"
              label="Date"
              value={date}
              onChange={handleDateChange}
              TextField={(params) => <TextField {...params} />}
            />
            <SingleInputTimeRangeField
              id="time-range"
              slotProps={{
                textField: ({ position }) => ({
                  label: "Start Time - End Time",
                  className: "time-range-field",
                }),
              }}
            />
          </LocalizationProvider>
          <Typography id="additional-information-title" variant="h6">
            Additional information
          </Typography>
          <TextField
            id="additional-information"
            className="multi-line-input"
            placeholder="Additional information"
            multiline
            rows={3}
            variant="standard"
            value={additionalInformation}
            onChange={handleAdditionalInformationChange}
          />
          <Divider />
          <Typography id="accessibility-title" variant="h6">
            Accessibility information
          </Typography>
          {/* Accessibility checkboxes */}
          <FormGroup id="accessibility-checkboxes">
            <FormControlLabel
              control={<Checkbox id="checkbox-bathrooms" />}
              className="checkbox"
              label="Nearby Bathrooms"
            />
            <FormControlLabel
              control={<Checkbox id="checkbox-uneven-ground" />}
              className="checkbox"
              label="Uneven ground"
            />
            <FormControlLabel
              control={<Checkbox id="checkbox-remote-location" />}
              className="checkbox"
              label="Remote location"
            />
            <FormControlLabel
              control={<Checkbox id="checkbox-parking" defaultChecked />}
              className="checkbox"
              label="Nearby Parking"
            />
          </FormGroup>
          <Divider />
          {/* Disposal method */}
          <FormControl fullWidth>
            <InputLabel id="disposal-method">Disposal Method</InputLabel>
            <Select
              labelId="disposal-method"
              id="disposal-select"
              value={disposalMethod}
              label="method"
              onChange={handleDisposalMethodChange}
            >
              <MenuItem value={"Pickers must dispose of their own litter"}>
                Pickers must dispose of their own litter
              </MenuItem>
              <MenuItem value={"Council pick-up"}>Council pick-up</MenuItem>
              <MenuItem value={"On-site Refuse disposal"}>On-site Refuse disposal</MenuItem>
              <MenuItem value={"Literal dumpster fire"}>Literal dumpster fire</MenuItem>
            </Select>
          </FormControl>
          <Typography id="recommended-equipment-title" variant="h8">
            Recommended equipment
          </Typography>
          <TextField
            className="multi-line-input"
            id="recommended-equipment"
            multiline
            rows={3}
            variant="standard"
            value={recommendedEquipment}
            onChange={handleRecommendedEquipmentChange}
          />

          {/* Buttons */}
          <Stack spacing={2} direction="row" id="create-card-button-container">
            <Button id="create-card-button" variant="contained" onClick={handleCreatePost}>
              Create Card
            </Button>
          </Stack>
        </Stack>
      </ThemeProvider>
    </div>
  );
}
