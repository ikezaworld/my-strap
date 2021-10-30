import { elmStore, timerStatus } from "../const";
import { getShareBtnContainer } from "../utils";

export const initTimer = () => {
  createTimerNumber();
  const selectBox = createTimerSelectBox();
  if (selectBox) {
    selectBox.addEventListener("change", onChangeTimerHandler);
  }
};

export const updateTimer = () => {
  stopTimer();
  elmStore.timerSelectBox?.removeEventListener("change", onChangeTimerHandler);
  elmStore.timerNumber?.parentNode.removeChild(elmStore.timerNumber);
  elmStore.timerSelectBox?.parentNode.removeChild(elmStore.timerSelectBox);
  elmStore.timerNumber = null;
  elmStore.timerSelectBox = null;
};

const createTimerSelectBox = () => {
  if (elmStore.timerSelectBox) {
    return elmStore.timerSelectBox;
  }
  const container = getShareBtnContainer();
  if (!container) {
    return;
  }
  const selectElm = document.createElement("select");
  selectElm.id = "mystarp-timer-selectbox";
  const timerOptions = [
    [0, "timer"],
    [1800, "30\u5206"],
    [1500, "25\u5206"],
    [1200, "20\u5206"],
    [900, "15\u5206"],
    [600, "10\u5206"],
    [540, "9\u5206"],
    [480, "8\u5206"],
    [420, "7\u5206"],
    [360, "6\u5206"],
    [300, "5\u5206"],
    [240, "4\u5206"],
    [180, "3\u5206"],
    [120, "2\u5206"],
    [60, "1\u5206"],
    [30, "30\u79D2"],
    [10, "10\u79D2"],
  ];
  for (const value of timerOptions) {
    const elm = document.createElement("option");
    elm.setAttribute("value", value[0]);
    elm.innerText = value[1];
    selectElm.appendChild(elm);
  }
  container.appendChild(selectElm);
  elmStore.timerSelectBox = selectElm;
  return selectElm;
};

const createTimerNumber = () => {
  if (elmStore.timerNumber) {
    return elmStore.timerNumber;
  }
  const container = getShareBtnContainer();
  if (!container) {
    return;
  }
  const elm = document.createElement("div");
  elm.id = "mystarp-timer";
  container.appendChild(elm);
  elmStore.timerNumber = elm;
  return elm;
};

const onChangeTimerHandler = (e) => {
  const value = parseInt(e.target.value, 10);
  if (!value) {
    stopTimer();
    setTimeText("stop");
    return;
  }
  clearTimeout(timerStatus.timerId);
  timerStatus.selectUnixTime = new Date().getTime();
  timerStatus.selectValue = value;
  playTimer();
};

const playTimer = () => {
  const unixTime = new Date().getTime();
  const passTime = Math.floor((unixTime - timerStatus.selectUnixTime) / 1000);
  const remainTime = timerStatus.selectValue - passTime;
  if (remainTime < 0) {
    stopTimer();
    setTimeText("timeover");
    return;
  }
  // 注意アニメーション表示
  if (remainTime <= timerStatus.secondToStartAttention) {
    setTimerAnimation(true);
  } else {
    setTimerAnimation(false);
  }
  const { minute, second } = convertSecondTommss(remainTime);
  setTimeText(`${minute}:${second}`);
  timerStatus.timerId = setTimeout(playTimer, 1000);
};

export const convertSecondTommss = (time) => {
  var minute = Math.floor(time / 60) % 60;
  var second = time % 60;
  minute = ("00" + minute).slice(-2);
  second = ("00" + second).slice(-2);
  return { minute, second };
};

const stopTimer = () => {
  clearTimeout(timerStatus.timerId);
  setTimerAnimation(false);
  resetTimerSelectBox();
};

const setTimeText = (data) => {
  if (!elmStore?.timerNumber) {
    return;
  }
  switch (data) {
    case "stop":
      elmStore.timerNumber.innerText = ``;
      break;
    case "timeover":
      elmStore.timerNumber.innerText = `🎶~⏰`;
      break;
    default:
      elmStore.timerNumber.innerText = data;
      break;
  }
};

const setTimerAnimation = (isStart) => {
  const classList = elmStore?.timerNumber?.classList;
  if (!classList) {
    return;
  }
  switch (isStart) {
    case true:
      if (!classList.contains(timerStatus.cssAnimationClassName)) {
        classList.add(timerStatus.cssAnimationClassName);
      }
      break;
    default:
      classList.remove(timerStatus.cssAnimationClassName);
      break;
  }
};

const resetTimerSelectBox = () => {
  elmStore?.timerSelectBox?.options && (elmStore.timerSelectBox.options[0].selected = true);
};
