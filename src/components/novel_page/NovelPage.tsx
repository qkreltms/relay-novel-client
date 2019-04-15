import React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Novel, newNovel } from "../../models";
import CustomNovelList from "../common/CustomNovelList";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import socket, { novelPage } from "../../socket";
import axios from "axios";
import axiosConfig from "../../config/axios";
import config from "../../config";
interface IProps extends WithStyles<typeof styles> {
  classes: any;
  match: any;
  location: any;
  history: any;
  novel: Novel;
  novels: Array<Novel>;
  fetchNovels: (skip: number, limit: number, roomId: string) => void;
  setNovel: (novel: Novel) => void;
  pushNovel: (novel: Novel) => void;
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

class NovelPage extends React.Component<IProps> {
  private roomId: string = "0";
  private socket: any = null;

  constructor(props) {
    super(props);
    this.roomId = this.props.location.pathname.split("/")[2];
    this.socket = socket(novelPage);
  }
  public componentDidMount() {
    this.props.fetchNovels(0, 30, this.roomId);
    this.initSocket();
  }

  public componentWillUnmount() {
    this.exitSocket();
    // TOOD: state 초기화 액션
  }

  private initSocket = () => {
    this.socket.emit("join", {});
    this.socket.on("message", data => {
      console.log(`소켓 message 값 받음:`, JSON.stringify(data));
      this.getASectence(data.roomId, data.sentenceId);
    });
  };

  private exitSocket = () => {
    this.socket.emit("leave", {});
    console.log(`소켓 해제됨`);
  };

  private getASectence = (roomId: string, sentenceId: string, skip: number = 0, limit: number = 30) => {
    if (!roomId || !sentenceId) {
      console.log("undefined 값이 들어옴 ", `${roomId} ${sentenceId}`);
      return;
    }

    if (roomId !== this.roomId) {
      console.log("roomId가 다름");
      return;
    }

    return axios
      .get(
        `${config.REACT_APP_SERVER_URL}/api/sentences?roomId=${roomId}&sentenceId=${sentenceId}&skip=${skip}&limit=${limit}`,
        axiosConfig
      )
      .then(res => {
        if (!res.data) return;

        // 상대방이 소켓으로 보내온 데이터 적용함
        console.log(res.data);
        this.props.pushNovel(newNovel(res.data.message[0].text));
        
      })
      .catch(err => {
        // 소설 못 가져온 것 예외처리
        if (!err.response) return;
        console.log(err);
      });
  };

  private postNovel = (text: string = "", roomId: string = "0") => callback => {
    const body = {
      text,
      roomId
    };
    axios
      .post(`${config.REACT_APP_SERVER_URL}/api/sentences`, body, axiosConfig)
      .then(res => {
        if (!res.data) return 0;
        console.log("작성한 novel 데이터: " + text, res.data);

        return callback(res.data.message.insertId);
      })
      .catch(err => {
        console.log(err.response);
        return callback(0);
      });
  };

  private handleSendButtonClick = () => {
    this.props.pushNovel(this.props.novel);
    this.postNovel(this.props.novel.text, this.roomId)(sentenceId => {
      this.sendEventToSocket(this.roomId, sentenceId);
    });
    this.props.setNovel(newNovel(""));
  };

  private sendEventToSocket = (roomId: string, sentenceId: number) => {
    this.socket.emit("create", {
      roomId,
      sentenceId
    });
  };

  private handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.setNovel(newNovel(event.target.value));
  };

  public render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container alignItems="stretch" direction="row">
            <Grid xs={3} item />
            <Grid xs={9} item>
              {/* TODO: limit 넘을시 disable 됨 */}
              <Button>글쓰기 참가</Button>
              <Button>구독</Button>
            </Grid>
          </Grid>
          <Grid container>
            {/* 댓글 */}
            <Grid xs={3} item>
              <Paper className={classes.paper}>댓글 들어갈 부분</Paper>
            </Grid>
            {/* 소설 글 */}
            <Grid xs={6} item>
              <CustomNovelList novels={this.props.novels} />
              <CustomInput
                name="novel"
                formattedMessageId="novelpage_input"
                value={this.props.novel.text}
                handleChange={this.handleInputValueChange}
                multiline
              />
              <CustomButton
                onClick={this.handleSendButtonClick}
                formattedMessageId="novelpage_btn"
              />
            </Grid>
            {/* 접속한 유저 표시 */}
            <Grid xs={3} item>
              <Paper className={classes.paper}>접속한 유저 넣을 부분</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

(NovelPage as React.ComponentClass<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(NovelPage));
