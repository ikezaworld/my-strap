import { getStorage } from "../utils";
import { storage, keyPressCodeDefault, handStatus } from "../const";
import { initHandButton, updateHandButton } from "./handButton";
import { initTimer, updateTimer } from "./timer";
import { initEmoji, updateEmojiButton } from "./emoji";

export const initBoard = async () => {
  const data = await getStorage();
  if (data[storage.timer?.active]) {
    initTimer();
  }
  if (data[storage.emoji?.active]) {
    initEmoji();
  }

  if (data[storage.hand?.active]) {
    if (data[storage.hand?.useDefault]) {
      handStatus.keyPressCode = keyPressCodeDefault;
    } else {
      handStatus.keyPressCode = data[storage.hand?.code];
    }
    initHandButton();
  }
};

export const updateBoard = () => {
  updateTimer();
  updateHandButton();
  updateEmojiButton();
};
