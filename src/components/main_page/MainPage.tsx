import React from "react";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { Room } from "../../models";
import { ThumbUp } from "@material-ui/icons";

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
    
    // 클릭시 방안으로 리다이렉트
    const handleListItemClick = (roomId: number) => () => {
      this.props.history.push(`/${roomId}`);
    };

    return (
      <div className={classes.root}>
        <List>
          {this.props.rooms.map((room, index) => (
            <ListItem
              key={index}
              button
              role={undefined}
              onClick={handleListItemClick(room.id)}
            >
              <ListItemText primary={room.title} />
              <ListItemSecondaryAction>
                  <ThumbUp />
                  <ListItemText primary={"좋아요 개수"} />
              </ListItemSecondaryAction>
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
