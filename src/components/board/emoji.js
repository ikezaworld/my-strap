import { elmStore, boardConst } from "../const";
import { getShareBtnContainer } from "../utils";
import { EmojiButton } from "@joeattardi/emoji-button";

export const initEmoji = () => {
  createEmojiButton();
};

export const updateEmojiButton = () => {
  document.getElementById(boardConst.idNameEmojiButton)?.remove();
  document.getElementById(boardConst.idNameEmojiButtonContainer)?.remove();
  document.getElementsByClassName(boardConst.classNameEmojiModalContainer)[0]?.remove();
  elmStore.emojiBtnContainer = null;
  elmStore.emojiBtn = null;
};

const getEmojiModal = () => {
  return document.getElementsByClassName(boardConst.classNameEmojiModalContainer)[0];
};

function createEmojiButton() {
  if (elmStore.emojiBtnContainer) {
    return;
  }
  const container = getShareBtnContainer();
  if (!container) {
    return;
  }
  const wrapElm = document.createElement("div");
  const btnElm = document.createElement("button");
  btnElm.id = boardConst.idNameEmojiButton;
  btnElm.innerText = "絵";
  wrapElm.id = boardConst.idNameEmojiButtonContainer;
  wrapElm.appendChild(btnElm);
  container.appendChild(wrapElm);
  elmStore.emojiBtnContainer = container;

  const picker = new EmojiButton();
  picker.on("emoji", (selection) => {
    // handle the selected emoji
    navigator.clipboard.writeText(selection.emoji);
  });
  btnElm.removeEventListener("click", arguments.callee);
  btnElm.addEventListener("click", () => picker.togglePicker(btnElm));
  setStopWheelHandler();
  elmStore.emojiBtn = btnElm;
}

// emoji-buttonでピッカーモーダル上でマウスホイール操作したら下へイベント電波させない。canvasスクロール防止の為。
function setStopWheelHandler() {
  const elm = getEmojiModal();
  if (!elm) {
    return;
  }
  elm?.removeEventListener("wheel", arguments.callee);
  elm?.addEventListener("wheel", (e) => {
    e.stopPropagation();
  });
}
