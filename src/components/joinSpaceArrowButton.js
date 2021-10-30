import { elmSpace, spaceConst, storage } from "./const";
import { setStorage, getStorage } from "./utils";

export const initJoinSpaceArrowButton = async () => {
  const data = await getStorage();
  if (!data[storage.joinSpaceArrowButton?.active]) {
    return;
  }

  // labelとbuttonが隣接している箇所を探す
  const tagAry = Array.from(document.querySelectorAll("label+button"));
  const labelElm = tagAry[0]?.previousElementSibling;
  // labelかつテキスト「参加スペース」のnodeを探す
  if (labelElm?.innerText === "参加スペース") {
    elmSpace.joinSpaceLabel = labelElm;
    elmSpace.joinSpaceList = labelElm?.parentNode?.nextElementSibling;
  }
  createArrowBtnInJoinSpace();
};

export const updateJoinSpaceArrowButton = () => {
  initJoinSpaceArrowButton();
};

export const resetArrowBtn = () => {
  arrowBtnShouldClose(false);
  joinSpaceListShouldClose(false);
  setHandler(false);
  elmSpace.joinSpaceLabel?.removeAttribute("id");
  elmSpace.joinSpaceList?.removeAttribute("id");
  elmSpace.arrowBtnInJoinSpace?.remove();
  elmSpace.joinSpaceLabel = null;
  elmSpace.joinSpaceList = null;
  elmSpace.arrowBtnInJoinSpace = null;
};

const createArrowBtnInJoinSpace = async () => {
  if (!elmSpace.joinSpaceList || !elmSpace.joinSpaceLabel) {
    return;
  }
  if (!elmSpace.joinSpaceList?.getAttribute("id", spaceConst.idNameJoinSpaceList)) {
    elmSpace.joinSpaceList.setAttribute("id", spaceConst.idNameJoinSpaceList);
  }
  if (!elmSpace.joinSpaceLabel?.getAttribute("id", spaceConst.idNameJoinSpaceLabel)) {
    elmSpace.joinSpaceLabel.setAttribute("id", spaceConst.idNameJoinSpaceLabel);
    const pElm = document.createElement("p");
    pElm.setAttribute("id", spaceConst.idNameJoinSpaceArrowBtn);
    pElm.innerText = "＞";
    elmSpace.joinSpaceLabel.prepend(pElm);
    elmSpace.arrowBtnInJoinSpace = pElm;
  }
  const storageData = await getStorage();
  // chrome.storageから前回のアコーディオン開閉状態を取得し同じ状態にする
  if (storageData[storage.joinSpaceArrowButton.close]) {
    arrowBtnShouldClose(true);
    joinSpaceListShouldClose(true);
  }
  setHandler();
};

const setHandler = (shouldAdd = true) => {
  if (!elmSpace?.joinSpaceLabel) {
    return;
  }
  if (shouldAdd) {
    elmSpace.joinSpaceLabel.addEventListener("click", onClickArrowBtnHandler);
  } else {
    elmSpace.joinSpaceLabel.removeEventListener("click", onClickArrowBtnHandler);
  }
};

const onClickArrowBtnHandler = () => {
  if (!elmSpace?.arrowBtnInJoinSpace) {
    return;
  }
  const closing = elmSpace.arrowBtnInJoinSpace?.classList?.contains(
    spaceConst.classNameArrowBtnClose
  );
  if (closing) {
    // Change show list
    arrowBtnShouldClose(false);
    joinSpaceListShouldClose(false);
    saveStorageArrowClosed(false);
  } else {
    // Change hide list
    arrowBtnShouldClose(true);
    joinSpaceListShouldClose(true);
    saveStorageArrowClosed(true);
  }
};

const saveStorageArrowClosed = async (closed = true) => {
  const data = { [storage.joinSpaceArrowButton.close]: closed };
  await setStorage(data);
};

const joinSpaceListShouldClose = (shouldClose = true) => {
  if (!elmSpace?.joinSpaceList) {
    return;
  }
  const classList = elmSpace.joinSpaceList?.classList;
  const className = spaceConst.classNameJoinSpaceListClose;
  const closing = classList?.contains(spaceConst.classNameJoinSpaceListClose);
  if (shouldClose) {
    if (!closing) {
      classList.add(className);
    }
  } else {
    if (closing) {
      classList.remove(className);
    }
  }
};

const arrowBtnShouldClose = (shouldClose = true) => {
  if (!elmSpace?.arrowBtnInJoinSpace) {
    return;
  }
  const classList = elmSpace.arrowBtnInJoinSpace?.classList;
  const className = spaceConst.classNameArrowBtnClose;
  const closing = classList?.contains(className);
  if (shouldClose) {
    if (!closing) {
      classList.add(className);
    }
  } else {
    if (closing) {
      classList.remove(className);
    }
  }
};
