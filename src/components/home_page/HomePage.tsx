import React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomSwipeableViews from "../common/CustomSwipeableViews";

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  match: any;
  location: any;
  history: any;
}

interface IState {
  activeStep: number;
}

const styles = (theme: Theme) => createStyles({});

class CreateRoomPage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = { activeStep: 0 };
  }

  private handleNext = () => {
    this.setState((prevState: Readonly<IState>) => ({
      activeStep: (prevState.activeStep + 1) % 5
    }));
  };

  private handleBack = () => {
    this.setState((prevState: Readonly<IState>) => {
      // length - 1
      return {
        activeStep: prevState.activeStep <= 0 ? 4 : prevState.activeStep - 1
      };
    });
  };

  private handleStepChange = (activeStep: number) => {
    this.setState({ activeStep });
  };

  public render() {
    const { classes, theme } = this.props.classes;

    return (
      <div>
        <CustomSwipeableViews
          activeStep={this.state.activeStep}
          handleBack={this.handleBack}
          handleNext={this.handleNext}
          handleStepChange={this.handleStepChange}
        />
      </div>
    );
  }
}

(CreateRoomPage as React.ComponentClass<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(CreateRoomPage));
