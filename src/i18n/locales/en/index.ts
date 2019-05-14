import { Option } from "../../../models/option";

/* tslint:disable */

export default {
  title: "Relay Novel",
  appbar_menu_myprofile: "Profile",
  appbar_menu_logout: "Log Out",
  appbar_signup_btn: "Sign Up",
  appbar_login_btn: "Log In",
  appbar_ko_btn: "한글",
  appbar_en_btn: "English",
  signup_password: "Password",
  signup_email: "Email",
  signup_nickname: "Nickname",
  signup_btn: "Sign Up",
  signup_err_password: "Password's length is must be in 6~30.",
  signup_err_nickname: "Nickname's length is must be in 1~30.",
  signup_err_email: "Email format is invali.",
  signup_duplicated_email: "Email is already in use.",
  signupsuccess_success: "Sing Up Completed!",
  signupsuccess_btn: "Go Homepage",
  notfound_btn: "Go Homepage",
  notfound_msg: "Page Not Found. Error status 404", 
  logindialog_title: "Login",
  logindialog_email: "Email",
  logindialog_password: "Password",
  logindialog_cancle_btn: "Cancle",
  logindialog_ok_btn: "OK",
  logindialog_notexists_email: "Email is not exists.",
  logindialog_incorrect_password: "Incorrect Password.",
  mainpage_create_room: "Create my relay novel",
  mainpage_latest_novel: "Latest Novel",
  mainpage_home: "Home",
  createroom_title: "Title",
  createroom_desc: "Description",
  createroom_writerlimit: "Writer Limit",
  createroom_btn: "Create Room",
  createroom_tags: "Tags",
  createroom_genre: "Genre",
  createroom_title_error: "Title field's length must be in 1~100.",
  createroom_genre_error: "You must select a genre.",
  novelpage_input: "Input",
  novelpage_btn: "Submit",
  novelpage_join_btn: "Join to write",
  novelpage_desc: "Description",
  novelpage_desc_tags: "Tags",
  novelpage_desc_genre: "Genre",
  novelpage_desc_created_date: "Create at", 
  select_SF_AND_FANTACY: "Sci-Fi & Fantasy",
  select_MYSTERY: "Mystery & Suspense",
  select_LIGHT_NOVEL: "Light Novel",
  select_CHIVALRY: "Chivalry",
  select_HORROR: "Horror",
  select_DRAMA: "Drama",
  select_ROMANCE: "Romance",
  select_ACTION_AND_ADVENTURE: "Action & Adventure",
  select_COMEDY: "Comedy",
  customswipeableviews_next: "Next",
  customswipeableviews_prev: "Prev"
};

export const options: Array<Option> = [
    {
      id: "ACTION_AND_ADVENTURE"
    },
    {
      id: "COMEDY"
    },
    {
      id: "DRAMA"
    },
    {
      id: "HORROR"
    },
    {
      id: "ROMANCE"
    },
    {
      id: "LIGHT_NOVEL"
    },
    {
      id: "SF_AND_FANTACY"
    },
    {
      id: "CHIVALRY"
    },
    {
      id: "MYSTERY"
    }
  ];
