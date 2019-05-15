import { Option } from "../../../models/option";

/* tslint:disable */

export default {
  title: "릴레이 소설",
  appbar_menu_logout: "로그아웃",
  appbar_menu_myprofile: "프로필",
  appbar_signup_btn: "회원가입",
  appbar_login_btn: "로그인",
  appbar_ko_btn: "한글",
  appbar_en_btn: "English",
  signup_password: "비밀번호",
  signup_email: "이메일",
  signup_nickname: "닉네임",
  signup_btn: "회원가입 하기",
  signup_err_password: "비밀번호 길이는 6자 이상 또는 30자 이하입니다.",
  signup_err_nickname: "닉네임 길이는 1자 이상 또는 30자 이하입니다.",
  signup_err_email: "이메일 형식이 맞는지 확인해 주세요.",
  signup_duplicated_email: "이메일이 이미 존재합니다.",
  signupsuccess_success: "회원가입 완료!",
  signupsuccess_btn: "홈페이지로 가기",
  notfound_btn: "홈페이지로 가기",
  notfound_msg: "페이지를 찾을 수 없습니다. 에러 상태코드: 404",
  logindialog_title: "로그인",
  logindialog_email: "이메일",
  logindialog_password: "비밀번호",
  logindialog_cancle_btn: "취소",
  logindialog_ok_btn: "확인",
  logindialog_notexists_email: "존재하지 않는 이메일입니다.",
  logindialog_incorrect_password: "비밀번호가 옳바르지 않습니다.",
  mainpage_btn: "내 릴레이소설 만들기",
  mainpage_create_room: "내 릴레이 소설 만들기",
  mainpage_latest_novel: "최신 소설",
  mainpage_home: "홈",
  createroom_title: "제목",
  createroom_desc: "설명",
  createroom_writerlimit: "작가 수 제한",
  createroom_btn: "생성",
  createroom_tags: "태그",
  createroom_genre: "장르",
  createroom_title_error: "제목의 길이는 1자 이상 또는 100자 이하입니다.",
  createroom_genre_error: "장르를 한 가지 선택하세요.",
  createroom_chip_input: "엔터 값으로 구분",
  novelpage_input: "입력",
  novelpage_btn: "글쓰기",
  novelpage_join_btn: "글쓰기 참가하기",
  novelpage_desc: "설명",
  novelpage_desc_tags: "태그",
  novelpage_desc_genre: "장르",
  novelpage_desc_created_date: "만든 날짜", 
  select_SF_AND_FANTACY: "공상과학/판타지",
  select_MYSTERY: "미스터리/서스펜스",
  select_LIGHT_NOVEL: "라이트 노벨",
  select_CHIVALRY: "무협",
  select_HORROR: "공포",
  select_DRAMA: "드라마",
  select_ROMANCE: "로맨스",
  select_ACTION_AND_ADVENTURE: "액션/모험",
  select_COMEDY: "코미디",
  customswipeableviews_next: "다음",
  customswipeableviews_prev: "이전",
  homepage_today_novels: "오늘의 소설",
  homepage_popular_novels: "인기 소설"
};

export const options: Array<Option> = [
  {
    id: "ACTION_AND_ADVENTURE"
  },
  {
    id: "HORROR"
  },
  {
    id: "DRAMA"
  },
  {
    id: "ROMANCE"
  },
  {
    id: "MYSTERY"
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
    id: "COMEDY"
  }
];
