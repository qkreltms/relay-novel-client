import React, { Suspense } from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomInput from "../common/CustomInput";
import CustomRadioButtons from "../common/CustomRadioButtons";
import { RadioContents, Directions, Room, newRoom, User } from "../../models";
import CustomButton from "../common/CustomButton";
import axios from "axios";
import config from "../../config";
import axiosConfig from "../../config/axios";
import socket, { mainPage } from "../../socket";
import CustomSelects from "../common/CustomSelects";
import { async } from "q";

interface IProps extends WithStyles<typeof styles> {
  writerLimit: string;
  title: string;
  desc: string;
  genre: string;
  coverImage: string;
  tags: string;
  setTags: (tags: string) => void;
  setCoverImage: (coverImage: string) => void;
  setGenre: (genre: string) => void;
  setTitle: (title: string) => void;
  setDesc: (desc: string) => void;
  setWriterLimit: (writerLimit: string) => void;
  initCreateRoomState: () => void;
  classes: any;
  match: any;
  location: any;
  history: any;
  isLoggedIn: boolean;
  user: User;
  lang: string;
}

interface IState {
  asyncComponent: any;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing.unit * 2
    }
  });

class CreateRoomPage extends React.Component<IProps, IState> {
  private radioContents: Array<RadioContents>;
  private socket: any = null;

  constructor(props) {
    super(props);
    this.state = { asyncComponent: null };
    this.socket = socket(mainPage, (err: Error) => {
      alert(
        "서버 에러가 발생했습니다. F5를 눌러 새로고침해주세요. 에러메시지:" +
          err
      );
    });

    this.radioContents = [
      {
        value: "1",
        label: "1",
        labelPlacement: Directions.Start
      },
      {
        value: "10",
        label: "10",
        labelPlacement: Directions.Start
      },
      {
        value: "20",
        label: "20",
        labelPlacement: Directions.Start
      },
      {
        value: "50",
        label: "50",
        labelPlacement: Directions.Start
      },
      {
        value: "100",
        label: "100",
        labelPlacement: Directions.Start
      }
    ] as Array<RadioContents>;
  }

  public componentDidMount() {
    this.props.initCreateRoomState();

    import(`../../i18n/locales/${this.props.lang}`).then(o => {
      this.setState({
        asyncComponent: (
          <CustomSelects
            options={o.option}
            formattedMessageId="createroom_genre"
            value={this.props.genre}
            handleValueChange={this.handleGenreChange}
          />
        )
      });
    });
  }

  public componentWillUnmount() {}

  private isEmpty = (): boolean => {
    if (this.props.desc.length <= 0) return true;
    if (this.props.title.length <= 0) return true;
    if (this.props.writerLimit.length <= 0) return true;
    return false;
  };

  private sendEventToSocket = (room: Room) => {
    this.socket.emit("create", {
      id: room.id,
      writerLimit: room.writerLimit,
      title: room.title,
      desc: room.desc,
      tags: room.tags,
      genre: room.genre,
      coverImage: room.coverImage
    } as Room);
  };

  private handleCreateRoomClick = () => {
    if (this.isEmpty()) return;
    if (!this.props.isLoggedIn) return alert("로그인을 해주세요.");

    const body = {
      userId: this.props.user.id,
      writerLimit: this.props.writerLimit,
      title: this.props.title,
      desc: this.props.desc
    };

    return axios
      .post(`${config.REACT_APP_SERVER_URL}/api/rooms`, body, axiosConfig)
      .then(res => {
        const data = res.data;
        const roomId: string = data.message.insertId;

        // 페이지에 저장되어있는 state 값을 소켓으로 보냄
        const room: Room = newRoom({
          id: Number(roomId),
          writerLimit: Number(this.props.writerLimit),
          title: this.props.title,
          desc: this.props.desc,
          tags: this.props.tags,
          genre: this.props.genre,
          coverImage: this.props.coverImage
        } as Room);

        this.sendEventToSocket(room);

        return this.props.history.push(`/room/${roomId}`);
      })
      .catch(err => {
        console.log(err.response);
        alert(
          `Cannot create room: ${JSON.stringify(err.response.data.message)}`
        );
      });
  };

  private handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setTitle(event.target.value);
  };

  private handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setDesc(event.target.value);
  };

  private handleWriterLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.setWriterLimit(event.target.value);
  };

  // TODO: coverImage 구현
  private handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.setCoverImage(event.target.value);
  };

  private handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setTags(event.target.value);
  };

  private handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.setGenre(event.target.value);
  };

  public async render() {
    const classes = this.props.classes;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container>
            <Grid xs={3} item />
            <Grid xs={6} item>
              <Paper className={classes.paper}>
                <CustomInput
                  value={this.props.title}
                  handleChange={this.handleTitleChange}
                  formattedMessageId="createroom_title"
                  name="title"
                />

                <CustomInput
                  value={this.props.desc}
                  handleChange={this.handleDescChange}
                  formattedMessageId="createroom_desc"
                  name="desc"
                  multiline
                />

                {this.state.asyncComponent ? (
                  this.state.asyncComponent
                ) : (
                  <div />
                )}

                <CustomInput
                  value={this.props.tags}
                  handleChange={this.handleTagsChange}
                  formattedMessageId="createroom_tags"
                  name="tags"
                />

                <CustomRadioButtons
                  value={this.props.writerLimit}
                  handleValueChange={this.handleWriterLimitChange}
                  radioContents={this.radioContents}
                  formattedMessageId="createroom_writerlimit"
                />

                <CustomButton
                  onClick={this.handleCreateRoomClick}
                  formattedMessageId="createroom_btn"
                />
              </Paper>
            </Grid>
            <Grid xs={3} item />
          </Grid>
        </Grid>
      </Grid>
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
