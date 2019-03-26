import React from "react";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  ListItem,
  ListItemText,
  List
} from "@material-ui/core";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    list : {},
  });

interface IProps extends WithStyles<typeof styles> {
  match: any;
  location: any;
  history: any;
  classes: any;
  selectedIndex;
  setSelectedIndex: (index: number) => void;
}

const MainPage: React.SFC<IProps> = props => {
  const { classes } = props;

  const handleListItemClick = (index: number) => () => {
    props.setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List>
        {[0, 1, 2, 3].map(value => (
          <ListItem
            key={value}
            button
            selected={props.selectedIndex === 0}
            role={undefined}
            onClick={handleListItemClick(0)}
          >
            <ListItemText primary={`Line item ${value + 1}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

(MainPage as React.SFC<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(MainPage));
