import React from "react";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction
} from "@material-ui/core";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { Room } from "../../models";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import CustomButton from "../common/CustomButton";

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
  isLoggedIn: boolean;
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

  // 클릭시 방안으로 리다이렉트
  handleListItemClick = (roomId: number) => () => {
    this.props.history.push(`/room/${roomId}`);
  };

  // 클릭시 방 만들기 페이지로 리다이렉트
  handleCreateRoomClick = () => {
    if (this.props.isLoggedIn) {
      this.props.history.push(`/create/room`);
    } else {
      // TODO: dialog 창으로 바꾸는거 생각해보기
      alert(`로그인을 먼저 해주세요!`);
    }
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CustomButton
          onClick={this.handleCreateRoomClick}
          formattedMessageId="mainpage_btn"
        />
        <List>
          {this.props.rooms.map((room, index) => (
            <ListItem
              key={index}
              button
              role={undefined}
              onClick={this.handleListItemClick(room.id)}
            >
              <ListItemText primary={room.title} />
              <ListItemSecondaryAction>
                <ThumbUp />
                <ListItemText primary={room.like} />
                <ThumbDown />
                <ListItemText primary={room.dislike} />
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
