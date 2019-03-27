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
import { Room } from "../../models";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    list: {}
  });

interface IProps extends WithStyles<typeof styles> {
  match: any;
  location: any;
  history: any;
  classes: any;
  selectedIndex;
  setSelectedIndex: (index: number) => void;
  setRoom: (room: Room) => void;
  rooms: Array<Room>;
  fetchRooms: (skip: number, limit: number) => void;
}

class MainPage extends React.Component<IProps> {
  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
      this.props.fetchRooms(0, 30);
  }

  public render() {
    const { classes } = this.props;
    const handleListItemClick = (index: number) => () => {
      this.props.setSelectedIndex(index);
    };

    return (
      <div className={classes.root}>
        <List>
          {this.props.rooms.map((value, index) => (
            <ListItem
              key={index}
              button
              selected={this.props.selectedIndex === 0}
              role={undefined}
              onClick={handleListItemClick(0)}
            >
              <ListItemText primary={value.title} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

(MainPage as React.ComponentClass<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(MainPage));
