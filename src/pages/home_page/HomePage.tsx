import React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomSwipeableViews from "../../components/CustomSwipeableViews";
import CustomCard from "../../components/CustomCard";
import { FormattedMessage } from "react-intl";

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  match: any;
  location: any;
  history: any;
}

interface IState {
  mainActiveStep: number;
  subActiveStep: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    swipeableView: {
      alignItems: "center"
    }
  });

class CreateRoomPage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = { mainActiveStep: 0, subActiveStep: 0 };
  }

  private handleMainNext = () => {
    this.setState((prevState: Readonly<IState>) => ({
      mainActiveStep: (prevState.mainActiveStep + 1) % 5
    }));
  };

  private handleMainBack = () => {
    this.setState((prevState: Readonly<IState>) => {
      // length - 1
      return {
        mainActiveStep:
          prevState.mainActiveStep <= 0 ? 4 : prevState.mainActiveStep - 1
      };
    });
  };

  private handleMainStepChange = (mainActiveStep: number) => {
    this.setState({ mainActiveStep });
  };

  private handleSubNext = () => {
    this.setState((prevState: Readonly<IState>) => ({
      subActiveStep: (prevState.subActiveStep + 1) % 5
    }));
  };

  private handleSubBack = () => {
    this.setState((prevState: Readonly<IState>) => {
      // length - 1
      return {
        subActiveStep:
          prevState.subActiveStep <= 0 ? 4 : prevState.subActiveStep - 1
      };
    });
  };

  private handleSubStepChange = (subActiveStep: number) => {
    this.setState({ subActiveStep });
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid spacing={0} container>
          <Grid item xs={8} className={classes.swipeableView}>
            <CustomSwipeableViews
              isAutoPlay
              activeStep={this.state.mainActiveStep}
              handleBack={this.handleMainBack}
              handleNext={this.handleMainNext}
              handleStepChange={this.handleMainStepChange}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomSwipeableViews
              activeStep={this.state.subActiveStep}
              handleBack={this.handleSubBack}
              handleNext={this.handleSubNext}
              handleStepChange={this.handleSubStepChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <FormattedMessage id="homepage_today_novels" />
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CustomCard
              writerLimit={100}
              like={100}
              genre={"genre"}
              title={"title"}
              tags={"tags"}
              author={"author"}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomCard
              writerLimit={100}
              like={100}
              genre={"genre"}
              title={"title"}
              tags={"tags"}
              author={"author"}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomCard
              writerLimit={100}
              like={100}
              genre={"genre"}
              title={"title"}
              tags={"tags"}
              author={"author"}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <FormattedMessage id="homepage_popular_novels" />
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CustomCard
              writerLimit={100}
              like={100}
              genre={"genre"}
              title={"title"}
              tags={"tags"}
              author={"author"}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomCard
              writerLimit={100}
              like={100}
              genre={"genre"}
              title={"title"}
              tags={"tags"}
              author={"author"}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomCard
              writerLimit={100}
              like={100}
              genre={"genre"}
              title={"title"}
              tags={"tags"}
              author={"author"}
            />
          </Grid>
        </Grid>
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
