import React from "react";
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
import { Novel, newNovel, User } from "../../models";
import CustomNovelList from "../common/CustomNovelList";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import socket, { novelPage } from "../../socket";
import axios from "axios";
import axiosConfig from "../../config/axios";
import config from "../../config";
import CustomPagination from "../common/CustomPagination";

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
  offset: number;
  setOffset: (offset: number) => void;
  fetchTotal: (roomId: string) => void;
  total: number;
  setTotal: (total: number) => void;
  isLoggedIn: boolean;
  user: User;
  isWriteable: boolean;
  fetchIsWriteable: (userId: number, roomId: string) => void;
  setIsWriteable: (writeable: boolean) => void;
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
  private paginationBtnLimit = 5;

  constructor(props) {
    super(props);
    this.roomId = this.props.location.pathname.split("/")[2];
    this.socket = socket(novelPage, (err: Error) => {
      this.initSocket();
    });
  }

  public componentDidMount() {
    this.props.fetchNovels(0, this.paginationBtnLimit, this.roomId);
    this.props.fetchTotal(this.roomId);
    this.props.fetchIsWriteable(this.props.user.id, this.roomId);
    this.initSocket();
  }

  public componentWillUnmount() {
    this.exitSocket();
    this.props.setIsWriteable(false);
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

  private handlePaginationBtnClick = offset => {
    const skip = offset * this.paginationBtnLimit;
    const limit = this.paginationBtnLimit;
    this.props.setOffset(offset);
    this.props.fetchNovels(skip, limit, this.roomId);
  };

  private getASectence = (roomId: string, sentenceId: string) => {
    if (!roomId || !sentenceId) {
      console.log(
        "roomId, sentenceId가 undefined 값이 들어옴 ",
        `${roomId} ${sentenceId}`
      );
      return;
    }

    if (roomId !== this.roomId) {
      console.log("roomId가 다름");
      return;
    }

    return axios
      .get(
        `${
          config.REACT_APP_SERVER_URL
        }/api/sentences?roomId=${roomId}&sentenceId=${sentenceId}&skip=${0}&limit=${1}`,
        axiosConfig
      )
      .then(res => {
        if (!res.data) return;

        // 상대방이 소켓으로 보내온 데이터 적용하고 total 값을 + 1 함
        this.props.pushNovel(newNovel(res.data.message[0].text));
        this.props.setTotal(this.props.total + 1);
      })
      .catch(err => {
        // 소설 못 가져온 것 예외처리
        if (!err.response) return;
        console.log(err);
      });
  };

  private postNovel = (text: string = "", roomId: string) => callback => {
    if (!roomId) return console.log("roomId가 undefined 값이 들어옴", roomId);

    const body = {
      text,
      roomId
    };
    axios
      .post(`${config.REACT_APP_SERVER_URL}/api/sentences`, body, axiosConfig)
      .then(res => {
        if (!res.data) return 0;

        return callback(res.data.message.insertId);
      })
      .catch(err => {
        console.log(err.response);
        return callback(0);
      });
  };

  private handleSubmitButtonClick = () => {
    if (!this.props.isWriteable) {
      alert("글쓰기에 참가하지 않았습니다.");
      return;
    }
    
    this.postNovel(this.props.novel.text, this.roomId)(sentenceId => {
      this.sendEventToSocket(this.roomId, sentenceId);
    });
  };

  private sendEventToSocket = (roomId: string, sentenceId: number) => {
    if(!roomId) return console.log("roomId가 undefined", roomId);

    this.props.setNovel(newNovel(""));

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

  // 방 참가하기 버튼 기능 
  private handleJoinToWrite = () => {
    const roomId: string = this.roomId;
    const userId: number = this.props.user.id;

    if (!this.props.isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!roomId) return console.log("roomId가 undefined", roomId);
    if (!userId) return console.log("userId가 undefined", userId);

    const body = {
      roomId: this.roomId,
      userId: this.props.user.id
    };
    axios
      .post(`${config.REACT_APP_SERVER_URL}/api/rooms/join`, body, axiosConfig)
      .then(res => {
        // 방 참가가 성공하면 re-render함 
        this.props.setIsWriteable(true);
        alert("참가했습니다.");
        this.forceUpdate();
      })
      .catch(err => {
        console.log(err.response);
        if (!err.response) return;
        if (err.response.status === 409) {
          alert("이미 글쓰기에 참가했습니다.");
        }
        if (err.response.status === 500) {
          alert("서버에러 발생. 잠시후 다시 시도해주세요.");
        }
        // 방 참가인원 한계치 다다랐을 때의 예외처리
      });
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
              {this.props.isWriteable ? ( //TODO: || limit가 꽉차지 않으면
                <div />
              ) : (
                <CustomButton
                  isDisable={false}
                  onClick={this.handleJoinToWrite}
                  formattedMessageId="novelpage_join_btn"
                />
              )}
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
              {this.props.isWriteable ? (
                <div>
                  <CustomInput
                    name="novel"
                    formattedMessageId="novelpage_input"
                    value={this.props.novel.text}
                    handleChange={this.handleInputValueChange}
                    multiline
                  />
                  <CustomButton
                    onClick={this.handleSubmitButtonClick}
                    formattedMessageId="novelpage_btn"
                  />
                </div>
              ) : (
                <div />
              )}
            </Grid>
            {/* 접속한 유저 표시 */}
            <Grid xs={3} item>
              <Paper className={classes.paper}>접속한 유저 넣을 부분</Paper>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} item>
              <CustomPagination
                handleClickEvent={this.handlePaginationBtnClick}
                offset={this.props.offset}
                total={Math.ceil(this.props.total / this.paginationBtnLimit)}
              />
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
