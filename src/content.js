"use strict";
import { routeObserver, buttonElementLoaded } from "./components/contentMain";
import { getPageType } from "./components/utils";
import { PAGES } from "./components/const";
import { initBoard, updateBoard } from "./components/board/board";
import {
  initJoinSpaceArrowButton,
  updateJoinSpaceArrowButton,
  resetArrowBtn,
} from "./components/joinSpaceArrowButton";

// Handler when the chrome extension save is clicked
chrome.runtime.onMessage.addListener((request) => {
  if (request === "updateStrap") {
    updateConfig();
  }
});

const initAppCommon = () => {
  initJoinSpaceArrowButton();
};

// buttonElementLoaded関数でbutton DOMが描画されたらinit開始させる
const initFactory = () => {
  switch (getPageType()) {
    case PAGES.BOARD:
      initBoard();
      break;
    case PAGES.SPACE:
      initAppCommon();
      break;
    case PAGES.GENERAL:
      initAppCommon();
      break;
    case PAGES.SPACES:
      initAppCommon();
      break;
    case PAGES.RECENT:
      initAppCommon();
      break;
    case PAGES.TRASH:
      initAppCommon();
      break;
    default:
      break;
  }
};

const updateConfig = () => {
  updateBoard();
  resetArrowBtn();
  buttonElementLoaded(initFactory);
};

const updateStrap = () => {
  updateBoard();
  updateJoinSpaceArrowButton();
  buttonElementLoaded(initFactory);
};

routeObserver({ callback: updateStrap });
buttonElementLoaded(initFactory);
