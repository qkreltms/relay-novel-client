import React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomInput from "../common/CustomInput";
import RadioButtons from "../common/RadioButtons";
import { RadioContents, Directions } from "../../models";
import CustomButton from "../common/CustomButton";
import axios from "axios";
import config from "../../config";
import axiosConfig from "../../config/axios";
import io from "socket.io-client";

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
  private socket: any;

  constructor(props) {
    super(props);

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

    this.socket = io(`${config.REACT_APP_SOCKET_URL}/mainpage`);
  }

  private isEmpty = (): boolean => {
    if (this.props.desc.length <= 0) return true;
    if (this.props.title.length <= 0) return true;
    if (this.props.writerLimit.length <= 0) return true;
    return false;
  };

  private notifySocket = roomId => {
    const socket = this.socket;
    socket.emit("create", {
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
        const roomId = data.message.insertId;

        this.notifySocket(roomId);

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

        <RadioButtons
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
