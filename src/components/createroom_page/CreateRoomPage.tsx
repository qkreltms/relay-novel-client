import React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomInput from "../common/CustomInput";
import CustomRadioButtons from "../common/CustomRadioButtons";
import { RadioContents, Directions } from "../../models";
import CustomButton from "../common/CustomButton";
import axios from "axios";
import config from "../../config";
import axiosConfig from "../../config/axios";
import socket, {mainPage} from "../../socket";

interface IProps extends WithStyles<typeof styles> {
  writerLimit: string;
  title: string;
  desc: string;
  setTitle: (title: string) => void;
  setDesc: (desc: string) => void;
  setWriterLimit: (writerLimit: string) => void;
  classes: any;
  match: any;
  location: any;
  history: any;
}

const styles = (theme: Theme) => createStyles({});

class CreateRoomPage extends React.Component<IProps> {
  private radioContents: Array<RadioContents>;
  private socket: any = null;

  constructor(props) {
    super(props);
    this.socket = socket(mainPage, (err: Error) => {
      alert("서버 에러가 발생했습니다. F5를 눌러 새로고침해주세요. 에러메시지:" + err);
    });

    this.radioContents = [
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
    this.initProps()
  }
 
  public componentWillUnmount() {
    this.initProps()
  }

  private initProps = () => {
    // TODO : redux에서 처리하기
    this.props.setDesc("")
    this.props.setTitle("")
    this.props.setWriterLimit("100")
  }

  private isEmpty = (): boolean => {
    if (this.props.desc.length <= 0) return true;
    if (this.props.title.length <= 0) return true;
    if (this.props.writerLimit.length <= 0) return true;
    return false;
  };

  private sendEventToSocket = (roomId: string) => {
    this.socket.emit("create", {
      roomId
    });
  };

  private handleCreateRoomClick = () => {
    if (this.isEmpty()) return;

    const body = {
      writerLimit: this.props.writerLimit,
      title: this.props.title,
      desc: this.props.desc
    };

    return axios
      .post(`${config.REACT_APP_SERVER_URL}/api/rooms`, body, axiosConfig)
      .then(res => {
        const data = res.data;
        if (!data) return;
        const roomId: string = data.message.insertId;

        this.sendEventToSocket(roomId);

        return this.props.history.push(`/room/${roomId}`);
      })
      .catch(err => {
        // 방 못 만든것 예외처리
        console.log(err);
        if (!err.response) return;
        alert(`Cannot create more room: ${err.response.data.message}`);
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

  public render() {
    return (
      <div>
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
      </div>
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
