export const PAGES = {
  BOARD: "BOARD",
  SPACE: "SPACE",
  GENERAL: "GENERAL",
  SPACES: "SPACES",
  RECENT: "RECENT",
  TRASH: "TRASH",
};

export const elmStore = {
  handButton: null,
  timerNumber: null,
  timerSelectBox: null,
  shareBtnContainer: null,
  emojiBtnContainer: null,
  emojiBtn: null,
  emojiPicker: null,
};

export const boardConst = {
  classNameEmojiModalContainer: "emoji-picker__wrapper",
  idNameEmojiButton: "mystarp-emoji-button__wrapper",
  idNameEmojiButtonContainer: "mystarp-emoji-button__wrapper",
};

export const timerStatus = {
  selectUnixTime: 0,
  selectValue: 0,
  secondToStartAttention: 10,
  timerId: null,
  cssAnimationClassName: "blinkanime",
};

export const keyPressCodeDefault = "KeyH";
export const handStatus = {
  keyPressCode: keyPressCodeDefault,
};

export const storage = {
  timer: {
    active: "TIMER_ACTIVE",
  },
  hand: {
    active: "HAND_ACTIVE",
    useDefault: "HAND_USE_DEFAULT",
    code: "HAND_CODE",
  },
  emoji: {
    active: "EMOJI_ACTIVE",
  },
  joinSpaceArrowButton: {
    active: "JOIN_SPACE_ARROW_BUTTON_ACTIVE",
    close: "JOIN_SPACE_ARROW_CLOSE",
  },
};

export const elmSpace = {
  joinSpace: null,
  joinSpaceLabel: null,
  joinSpaceList: null,
  arrowBtnInJoinSpace: null,
};

export const spaceConst = {
  idNameJoinSpaceLabel: "mystarp-joinspace-label",
  idNameJoinSpaceList: "mystarp-joinspace-list",
  idNameJoinSpaceArrowBtn: "mystarp-joinspace-arrowbtn",
  classNameArrowBtnClose: "mystarp--close",
  classNameJoinSpaceListClose: "mystarp--close",
};
