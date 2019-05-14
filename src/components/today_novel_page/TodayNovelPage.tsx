import React from "react";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  Grid
} from "@material-ui/core";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { Room } from "../../models";
import socket, { mainPage } from "../../socket";
import CustomCard from "../common/CustomCard";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1
    }
  });

interface IProps extends WithStyles<typeof styles> {
  match: any;
  location: any;
  history: any;
  classes: any;
  isLoggedIn: boolean;
  setRooms: (rooms: Array<Room>) => void;
  rooms: Array<Room>;
  fetchRooms: (skip: number, limit: number) => void;
  total: number;
}

class TodayNovelPage extends React.Component<IProps> {
  private socket: any = null;

  public constructor(props) {
    super(props);

    this.socket = socket(mainPage, (err: Error) => {
      alert(
        "서버 에러가 발생했습니다. F5를 눌러 새로고침 해주세요. 에러메시지:" +
          err
      );
    });
  }

  public componentDidMount() {
    this.initSocket();
    this.initState();
  }

  public componentWillUnmount() {
    this.exitSocket();
  }

  private initState = () => {
    this.props.fetchRooms(0, 30);
    // this.props.fetchRoomTotal();
  };

  initSocket = () => {
    this.socket.emit("join", {});
    this.socket.on("createdRoom", (room: Room) => {
      console.log(`소켓 message 값 받음:`, JSON.stringify(room.id));
      this.props.setRooms([room, ...this.props.rooms] as Array<Room>);
      //   this.props.setRoomTotal(this.props.total + 1);
    });
  };

  exitSocket = () => {
    this.socket.emit("leave", {});
    this.socket.close();
    console.log(`소켓 해제됨`);
  };

  // 클릭시 방안으로 리다이렉트
  handleListItemClick = (roomId: number) => () => {
    this.socket.emit("joinChannal", { id: roomId } as Room);
    this.props.history.push(`/room/${roomId}`);
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid spacing={0} container>
          {this.props.rooms &&
            this.props.rooms.map((room: Room, index: number) => (
              <Grid item xs={3} key={index}>
                <CustomCard
                  onClick={this.handleListItemClick(room.id)}
                  title={room.title}
                  genre={room.genre}
                  tags={room.tags}
                  author={room.user && room.user.nickname}
                  writerLimit={room.writerLimit}
                  like={room.like}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}

(TodayNovelPage as React.ComponentClass<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(TodayNovelPage));
