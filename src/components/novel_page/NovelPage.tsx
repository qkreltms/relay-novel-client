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
import socket from "../../socket";
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
  fetchNovels: (
    skip: number,
    limit: number,
    roomId: string,
    userId?: number
  ) => void;
  setNovel: (novel: Novel) => void;
  pushNovel: (novel: Novel) => void;
  offset: number;
  setOffset: (offset: number) => void;
  fetchNovelTotal: (roomId: string) => void;
  totalNumOfNovel: number;
  setNovelTotal: (totalNumOfNovel: number) => void;
  isLoggedIn: boolean;
  user: User;
  isWriteable: boolean;
  fetchIsWriteable: (roomId: string) => void;
  setIsWriteable: (writeable: boolean) => void;
  slot: number;
  fetchRoomAvailableSlot: (roomId: string) => void;
  limit: number;
  fetchRoomSpaceLimitaion: (roomId: string) => void;
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
  private paginationBtnLimit: number = 10;
  // 보여줄 총 소설 개수
  private novelNumToShow: number = 0;

  constructor(props) {
    super(props);
    this.roomId = this.props.location.pathname.split("/")[2];
    this.socket = socket(this.roomId, (err: Error) => {
      alert(
        `서버 에러가 발생했습니다. F5를 눌러 새로고침 해주세요. 에러메시지: ${err}`
      );
    });
  }

  public componentDidMount() {
    this.initSocket();
    this.fetchNovels(0, this.paginationBtnLimit);
    this.props.setOffset(0);
    this.props.setIsWriteable(false);
    this.props.fetchRoomAvailableSlot(this.roomId);
    this.props.fetchNovelTotal(this.roomId);
    this.props.fetchRoomSpaceLimitaion(this.roomId);
    if (this.props.isLoggedIn) this.props.fetchIsWriteable(this.roomId);
  }

  public componentWillUnmount() {
    this.exitSocket();
    // state 초기화 액션
    this.props.setIsWriteable(false);
    // 슬롯값 초기화
    // 소설 내용 삭제
    // limit 초기화
    // novel total 값 초기화
    this.props.setOffset(0);
  }

  private initSocket = () => {
    this.socket.emit("join", {
      roomId: this.roomId,
      userId: this.props.user.id
    });

    this.socket.on("message", (novel: Novel) => {
      this.props.pushNovel(
        newNovel({ id: novel.id, text: novel.text } as Novel)
      );
      this.props.setNovelTotal(this.props.totalNumOfNovel + 1);
    });
  };

  private exitSocket = () => {
    this.socket.emit("leave", {});
    this.socket.close();
    console.log(`소켓 해제됨`);
  };

  private sendEventToSocket = (novel: Novel) => {
    this.socket.emit("message", novel);
  };

  private fetchNovels = (skip: number = 0, limit: number) => {
    if (this.props.isLoggedIn) {
      this.props.fetchNovels(skip, limit, this.roomId, this.props.user.id);
    } else {
      this.props.fetchNovels(skip, limit, this.roomId);
    }
  };

  private handlePaginationBtnClick = offset => {
    const skip = offset * this.paginationBtnLimit;
    const limit = this.paginationBtnLimit;
    this.props.setOffset(offset);
    this.fetchNovels(skip, limit);
  };

  private postNovel = (
    text: string = "",
    roomId: string = "",
    userId: number = 0
  ) => next => {
    if (!this.props.isLoggedIn) return alert("로그인 해주세요.");

    const body = {
      text,
      roomId,
      userId
    };

    axios
      .post(`${config.REACT_APP_SERVER_URL}/api/sentences`, body, axiosConfig)
      .then(res => {
        const id: number = res.data.message.insertId;
        return next(id, text);
      })
      .catch(err => {
        console.log(err.response);
        return next(0, "");
      });
  };

  // 글쓰기 버튼 클릭시 발동 되는 함수
  private handleSubmitButtonClick = () => {
    const text: string = this.props.novel.text || "";
    const roomId: string = this.roomId || "0";
    const userId: number = this.props.user.id || 0;

    // TODO: 글 길이에 따라서도 return 하기
    if (!this.props.novel.text) return;
    if (!this.props.isWriteable) return alert("글쓰기에 참가하지 않았습니다.");

    this.postNovel(text, roomId, userId)((sentenceId: number, text: string) => {
      const novel: Novel = newNovel({ id: sentenceId, text } as Novel);
      this.sendEventToSocket(novel);
      this.props.setNovel(newNovel());
    });
  };

  private handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.setNovel(newNovel({ text: event.target.value } as Novel));
  };

  private handleJoinToWrite = () => {
    const roomId: string = this.roomId;

    if (!this.props.isLoggedIn) return alert("로그인이 필요합니다.");

    const body = { roomId };

    axios
      .post(`${config.REACT_APP_SERVER_URL}/api/rooms/join`, body, axiosConfig)
      .then(res => {
        this.props.setIsWriteable(true);
        // 방 참가가 성공하면 re-render함
        this.forceUpdate();
      })
      .catch(err => {
        console.log(err.response);
        switch (err.response.status) {
          case 409: {
            if (err.response.data.message.code === "ER_SIGNAL_EXCEPTION") {
              return alert("방이 꽉 찾습니다.");
            }
            alert("이미 글쓰기에 참가했습니다.");
            break;
          }

          case 500: {
            alert("서버에러 발생. 잠시후 다시 시도해주세요.");
            break;
          }

          default:
            break;
        }
      });
  };

  private handleLikeDislikeBtnClick = (
    type: "LIKE" | "DISLIKE",
    sentenceId: number = 0
  ) => (event: MouseEvent) => {
    if (!this.props.isLoggedIn) return alert("로그인 해주세요.");
    const body = {
      sentenceId,
      isLike: type === "LIKE" ? true : false,
      roomId: this.roomId || "0",
      userId: this.props.user.id || 0
    };
  
    axios
      .post(
        `${config.REACT_APP_SERVER_URL}/api/sentences/likedislikes`,
        body,
        axiosConfig
      )
      .then(res => {})
      .catch(err => {
        console.log(err.response);
      });
  };

  private isLastPage = () => {
    if (this.novelNumToShow === 0) return true;
    if (this.novelNumToShow === this.props.offset + 1) return true;
    return false;
  };

  public shouldComponentUpdate(nextProps) {
    this.novelNumToShow = Math.ceil(nextProps.totalNumOfNovel / this.paginationBtnLimit);
    return true;
  }

  public render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container>
            <Grid xs={3} item>
            </Grid>
            <Grid xs={6} item>
              <CustomNovelList
                novels={this.props.novels}
                handleLikeDislikeBtnClick={this.handleLikeDislikeBtnClick}
              />
              {this.props.isWriteable &&
              this.props.novels.length <= this.paginationBtnLimit &&
              this.isLastPage() ? (
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

              <div>
                {this.props.isWriteable || this.props.slot < 0 ? (
                  <span />
                ) : (
                  <CustomButton
                    isDisable={false}
                    onClick={this.handleJoinToWrite}
                    formattedMessageId="novelpage_join_btn"
                  />
                )}
                <span>
                  {this.props.slot} / {this.props.limit}
                </span>
              </div>
              <CustomPagination
                handleClickEvent={this.handlePaginationBtnClick}
                offset={this.props.offset}
                total={this.novelNumToShow}
              />
              <Paper className={classes.paper}>댓글 넣을 부분</Paper>
            </Grid>
            <Grid xs={3} item>
              {/* 참가한 유저 넣을 부분 */}
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
