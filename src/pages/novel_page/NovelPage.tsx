import React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  IconButton,
  ListItem,
  List
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Novel, newNovel, User, newComment, Comment } from "../../models";
import CustomNovelList from "../../components/CustomNovelList";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import socket from "../../socket";
import axios from "axios";
import axiosConfig from "../../config/axios";
import config from "../../config";
import CustomPagination from "../../components/CustomPagination";
import { Favorite, FavoriteBorder, Book } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";
import easyDateFormat from "easy-date-format";
import CustomCommentList from "../../components/CustomCommentList";

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
  totalNumOfNovel: number;
  setNovelTotal: (totalNumOfNovel: number) => void;
  isLoggedIn: boolean;
  user: User;
  isWriteable: boolean;
  joinedUserTotal: number;
  writerLimit: number;
  updateNovel: (novel: Novel) => void;
  isLikeRoom: boolean;
  setRoomIsLike: (isLike: boolean) => void;
  postRoomIsLike: (roomId: string, userId: number, isLike: boolean) => void;
  fetchRoomInfo: (roomId: string, userId: number, isLoggedIn: boolean) => void;
  setIsWriteable: (isWriteable: boolean) => void;
  tags: string;
  title: string;
  genre: string;
  desc: string;
  coverImage: string;
  creatorId: number;
  like: number;
  createdAt: Date;
  setComment: (comment: Comment) => void;
  comment: Comment;
  comments: Array<Comment>;
  updateComment: (comment: Comment) => void;
  pushComment: (comment: Comment) => void;
  fetchComments: (
    skip: number,
    limit: number,
    roomId: string,
    userId?: number
  ) => void;
  roomCreatedUser: User;
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
  private totalPaginationBtn: number = 0;

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
    this.initState();
  }

  private initState = () => {
    this.fetchNovels(0, this.paginationBtnLimit);
    this.fetchComments(0, this.paginationBtnLimit);
    this.props.fetchRoomInfo(
      this.roomId,
      this.props.user.id,
      this.props.isLoggedIn
    );
  };

  public componentWillUnmount() {
    this.exitSocket();
  }

  private initSocket = () => {
    this.socket.emit("join", {
      id: this.roomId,
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

  private fetchComments = (skip: number = 0, limit: number) => {
    if (this.props.isLoggedIn) {
      this.props.fetchComments(skip, limit, this.roomId, this.props.user.id);
    } else {
      this.props.fetchComments(skip, limit, this.roomId);
    }
  };

  private handlePaginationBtnClick = (offset: number) => {
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
        if (!err.response) return;
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
    if (roomId === "0") return;
    if (!text) return;
    if (!this.props.isWriteable) return alert("글쓰기에 참가하지 않았습니다.");

    this.postNovel(text, roomId, userId)((sentenceId: number, text: string) => {
      const novel: Novel = newNovel({ id: sentenceId, text } as Novel);
      this.sendEventToSocket(novel);
      this.props.setNovel(newNovel());
    });
  };

  private handleNovelInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.setNovel(newNovel({ text: event.target.value } as Novel));
  };

  private handleCommentValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.setComment(newComment({ text: event.target.value } as Comment));
  };

  private handleJoinToWrite = () => {
    const roomId: string = this.roomId;

    if (roomId === "0") return;
    if (!this.props.isLoggedIn) return alert("로그인이 필요합니다.");

    const body = { roomId };

    axios
      .post(`${config.REACT_APP_SERVER_URL}/api/rooms/join`, body, axiosConfig)
      .then(res => {
        this.props.setIsWriteable(true);
        // 방 참가가 성공하면 참가 버튼 가리기 위해 re-render함
        this.forceUpdate();
      })
      .catch(err => {
        if (!err.response) return;
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

  private handleSentenceLikeDislikeBtnClick = (
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
      .then(res => {
        // 해당 글의 좋아요, 싫어요를 업데이트 함
        this.props.updateNovel({
          id: sentenceId,
          isLike: type === "LIKE" ? 1 : 0
        } as Novel);
      })
      .catch(err => {
        if (!err.response) return;
        console.log(err.response);
      });
  };

  private handleCommentLikeDislikeBtnClick = (
    type: "LIKE" | "DISLIKE",
    commentId: number = 0
  ) => (event: MouseEvent) => {
    if (!this.props.isLoggedIn) return alert("로그인 해주세요.");
    const body = {
      commentId,
      isLike: type === "LIKE" ? true : false,
      roomId: this.roomId || "0",
      userId: this.props.user.id || 0
    };

    axios
      .post(
        `${config.REACT_APP_SERVER_URL}/api/comments/likedislikes`,
        body,
        axiosConfig
      )
      .then(res => {
        // 해당 아이디의 댓글의 좋아요, 싫어요를 업데이트 함
        this.props.updateComment({
          id: commentId,
          isLike: type === "LIKE" ? 1 : 0
        } as Comment);
      })
      .catch(err => {
        if (!err.response) return;
        console.log(err.response);
      });
  };

  private postComment = (
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
      .post(`${config.REACT_APP_SERVER_URL}/api/comments`, body, axiosConfig)
      .then(res => {
        const id: number = res.data.message.insertId;
        return next(id, text);
      })
      .catch(err => {
        if (!err.response) return;
        console.log(err.response);
        return next(0, "");
      });
  };

  private handleCommentSubmitButtonClick = () => {
    const text: string = this.props.comment.text || "";
    const roomId: string = this.roomId || "0";
    const userId: number = this.props.user.id || 0;

    // TODO: 글 길이에 따라서도 return 하기
    if (roomId === "0") return;
    if (!text) return;

    this.postComment(text, roomId, userId)(
      (commentId: number, text: string) => {
        const comment: Comment = newComment({ id: commentId, text } as Comment);
        this.props.pushComment(comment);
        this.props.setComment(newComment());
      }
    );
  };

  private handleFavoriteBtnClick = (type: boolean) => (event: any) => {
    if (!this.props.isLoggedIn) return alert("로그인 해주세요.");
    this.props.postRoomIsLike(this.roomId, this.props.user.id, type);
  };

  private isLastPage = () => {
    if (this.totalPaginationBtn === 0) return true;
    if (this.totalPaginationBtn === this.props.offset + 1) return true;
    return false;
  };

  public shouldComponentUpdate(nextProps) {
    this.totalPaginationBtn = Math.ceil(
      nextProps.totalNumOfNovel / this.paginationBtnLimit
    );
    return true;
  }

  public render() {
    const { classes } = this.props;
    const FavoriteBtn = this.props.isLikeRoom ? (
      <IconButton
        color="secondary"
        aria-label="favorite"
        onClick={this.handleFavoriteBtnClick(false)}
      >
        <Favorite />
      </IconButton>
    ) : (
      <IconButton
        color="secondary"
        aria-label="favorite-border"
        onClick={this.handleFavoriteBtnClick(true)}
      >
        <FavoriteBorder />
      </IconButton>
    );

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid xs={3} item>
                {/* 참가한 유저 넣을 부분 */}
              </Grid>
              <Grid xs={6} item>
                <Paper className={classes.paper}>
                  {/* 방 정보 넣는 부분 */}
                  <div>
                    <List
                      subheader={
                        <ListItem>
                          <Book />
                          {this.props.title}
                          {FavoriteBtn}
                        </ListItem>
                      }
                      className={classes.root}
                    >
                      <ListItem>
                        <FormattedMessage id="novelpage_desc" />
                      </ListItem>
                      <ListItem>{this.props.desc}</ListItem>
                      <ListItem>
                        <FormattedMessage id="novelpage_desc_genre" />
                      </ListItem>
                      {this.props.genre ? (
                        <FormattedMessage id={this.props.genre}>
                          {(text: string) => <ListItem>{text}</ListItem>}
                        </FormattedMessage>
                      ) : (
                        <div />
                      )}
                      <ListItem>
                        <FormattedMessage id="novelpage_desc_tags" />
                      </ListItem>
                      <ListItem>{this.props.tags}</ListItem>
                      <ListItem>like</ListItem>
                      <ListItem>{this.props.like}</ListItem>
                      <ListItem>creator</ListItem>
                      <ListItem>{this.props.roomCreatedUser && this.props.roomCreatedUser.nickname}</ListItem>
                      <ListItem>
                        <FormattedMessage id="novelpage_desc_created_date" />
                      </ListItem>
                      <ListItem>
                        {easyDateFormat(new Date(this.props.createdAt))}
                      </ListItem>
                    </List>
                  </div>
                  <CustomNovelList
                    novels={this.props.novels}
                    handleLikeDislikeBtnClick={
                      this.handleSentenceLikeDislikeBtnClick
                    }
                  />
                </Paper>
                {this.props.isWriteable &&
                this.props.novels.length <= this.paginationBtnLimit &&
                this.isLastPage() ? (
                  <div>
                    <CustomInput
                      name="novel"
                      formattedMessageId="novelpage_input"
                      value={this.props.novel.text}
                      handleChange={this.handleNovelInputValueChange}
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
                  {this.props.isWriteable || this.props.joinedUserTotal < 0 ? (
                    <span />
                  ) : (
                    <CustomButton
                      isDisable={false}
                      onClick={this.handleJoinToWrite}
                      formattedMessageId="novelpage_join_btn"
                    />
                  )}
                  <span>
                    {this.props.joinedUserTotal} / {this.props.writerLimit}
                  </span>
                </div>
                <CustomPagination
                  handleClickEvent={this.handlePaginationBtnClick}
                  offset={this.props.offset}
                  total={this.totalPaginationBtn}
                />
                <Paper className={classes.paper}>
                  <CustomCommentList
                    isLoggedIn={this.props.isLoggedIn}
                    comment={this.props.comment}
                    handleInputValueChange={this.handleCommentValueChange}
                    comments={this.props.comments}
                    handleLikeDislikeBtnClick={
                      this.handleCommentLikeDislikeBtnClick
                    }
                    handleSubmitButtonClick={
                      this.handleCommentSubmitButtonClick
                    }
                  />
                </Paper>
              </Grid>
              <Grid xs={3} item />
            </Grid>
          </Grid>
        </Grid>
      </div>
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
