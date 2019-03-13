import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";
import React from "react";

const styles = {
    // 증가하는 부분
    grow: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
    },
};

export interface IProps extends WithStyles<typeof styles> {

}

export interface IState {
    isLoggedIn: boolean;
    anchorElement: null | HTMLElement;
}

class Appbar extends React.Component<IProps, IState> {
    public state: IState = {
        anchorElement: null,
        isLoggedIn: false,
    };

    public render() {
        const { classes } = this.props;
        const { isLoggedIn, anchorElement } = this.state;
        const isOpen = Boolean(anchorElement); // anchorElement가 값이 있을 경우

        return (
            <div className = { classes.root }>
                <AppBar position = "static">
                    <Toolbar>
                        <Typography variant = "h6" color = "inherit" className = { classes.grow }>
                            릴레이 소설
                        </Typography>
                        { isLoggedIn ? (
                            <div>
                                <IconButton
                                    aria-owns = { isOpen ? "menu-appbar" : undefined }
                                    aria-haspopup = "true"
                                    onClick = { this.handlePopup }
                                    color = "inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id = "menu-appbar"
                                        anchorEl = { anchorElement }
                                        anchorOrigin = {{
                                            horizontal: "right",
                                            vertical: "top",
                                        }}
                                        transformOrigin = {{
                                            horizontal: "right",
                                            vertical: "top",
                                        }}
                                        open = { isOpen }
                                        onClose = { this.handlePopupClose }
                                        >
                                        {/* Todo: 페이지 이동 까지 구현 */}
                                        <MenuItem onClick = { this.handlePopupClose }>프로필</MenuItem>
                                        <MenuItem onClick = { this.handlePopupClose }>내 정보</MenuItem>
                                    </Menu>
                            </div>) : (
                                <div>
                                    <Button>회원가입</Button>
                                    <Button>로그인</Button>
                                </div>
                            ) }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    private handlePopup = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorElement: event.currentTarget });
    }

    private handlePopupClose = () => {
        this.setState({ anchorElement: null });
    }

}

(Appbar as React.ComponentClass<IProps, IState>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Appbar);
