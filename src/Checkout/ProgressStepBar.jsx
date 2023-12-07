import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Personal Details", "Payment"];

// Customize the stepper with Material-UI's 'withStyles' higher-order component if needed

const ProgressStepBar = ({ activeStep }) => {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      sx={{
        padding: "10px 0", // Adds padding above and below the stepper
        ".MuiStepConnector-line": {
          // Targets the connector lines
          height: "3px", // Sets the height of the line
          border: "none",
          backgroundColor: "rgba(0, 0, 0, 0.12)", // Sets a background color for the line
        },
        ".MuiStepIcon-root": {
          // Targets the step icons
          height: "35px", // Sets the height of the icon
          width: "40px", // Sets the width of the icon
        },
        ".MuiStepLabel-label": {
          // Targets the step labels
          fontSize: "1rem", // Sets the font size of the label
        },
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default ProgressStepBar;
