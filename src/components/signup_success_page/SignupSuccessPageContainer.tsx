import { connect } from "react-redux";
import { ICombineReducersState } from "../../reducers";
import SignupSuccessPage from "./SignupSuccessPage";
import { setIsDialogOpen } from "../../actions";

const mapStateToProps = (state: ICombineReducersState) => ({
  isDialogOpen: state.open.isDialogOpen
});

const mapDispatchToProps = (dispatch: any) => ({
  setIsDialogOpen: (isOpen: boolean) => dispatch(setIsDialogOpen(isOpen))
});

export const SignupSuccessPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupSuccessPage);
