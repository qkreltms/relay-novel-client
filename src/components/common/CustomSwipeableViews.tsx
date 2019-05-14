import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MobileStepper from "@material-ui/core/MobileStepper";
import {
  createStyles,
  Theme,
  Button,
  withStyles,
  Paper,
  Typography
} from "@material-ui/core";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"
  }
];

interface IProps {
  classes: any;
  theme: Theme;
  activeStep: number;
  handleStepChange: (activeStep: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  isAutoPlay?: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      flexGrow: 1
    },
    header: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      height: 50,
      backgroundColor: theme.palette.background.default
    },
    img: {
      height: 255,
      display: "block",
      overflow: "hidden",
      width: "100%"
    }
  });

const CustomSwipeableViews: React.SFC<IProps> = props => {
  const { classes, theme } = props;
  const maxStep = tutorialSteps.length;

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[props.activeStep].label}</Typography>
      </Paper>

      {props.isAutoPlay ? (
        <AutoPlaySwipeableViews
          //   theme.direction이 right to left 일 때 x축 반전 아니면 x축 그대로 둠
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={props.activeStep}
          onChangeIndex={props.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={index}>
              {Math.abs(props.activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      ) : (
        <img
          className={classes.img}
          src={tutorialSteps[props.activeStep].imgPath}
          alt={tutorialSteps[props.activeStep].label}
        />
      )}

      <MobileStepper
        steps={maxStep}
        position="static"
        activeStep={props.activeStep}
        className={classes.mobileStepper}
        nextButton={
          <Button size="small" onClick={props.handleNext}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={props.handleBack}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </div>
  );
};

(CustomSwipeableViews as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
} as any;

export default withStyles(styles, {
  withTheme: true
})(CustomSwipeableViews);
