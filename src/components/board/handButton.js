import { elmStore, handStatus } from "../const";

export const initHandButton = () => {
  selectHandBtn();
  // テキスト編集モード以外で指定キーを押したらで手のひらボタンをクリック動作します
  document.body.addEventListener("keydown", onKeyDownHandler);
};

// buttonタグかつツールチップのラベルが「手のひらモード」のelementからClass名を抽出
export const selectHandBtn = () => {
  if (elmStore.handButton) {
    return elmStore.handButton;
  }
  const divAry = Array.from(document.querySelectorAll("button+div"));
  const handToolTip = divAry.filter((el) => el.innerText === "手のひらモード\nSpace");
  const handBtn = handToolTip[0]?.previousElementSibling;
  const handBtnAllClassAry = handBtn ? Array.from(handBtn?.classList) : [];
  // styled-componentでのクラス名のみ抽出。ONOFFトグルclassは不要のため
  const handBtnClass = handBtnAllClassAry?.filter((el) => el?.includes("sc-"));
  const searchClassName = handBtnClass?.length ? `.${handBtnClass.join(".")}` : "";
  elmStore.handButton = searchClassName ? document.querySelectorAll(searchClassName)[0] : null;
};

export const onKeyDownHandler = (e) => {
  if (ignoreAction()) {
    return;
  }
  if (e.code === handStatus.keyPressCode) {
    const click = new MouseEvent("click", { bubbles: true });
    elmStore.handButton?.dispatchEvent(click);
  }
};

export const updateHandButton = () => {
  elmStore.shareBtnContainer = null;
  elmStore.handButton = null;
  document.body.removeEventListener("keydown", onKeyDownHandler);
};

const ignoreAction = () => {
  // フォーカス中のelementのcontenteditable属性がtrue（編集中）
  if (document.activeElement.getAttribute("contenteditable")) {
    return true;
  }
  // フォーカスがボード内検索フォーム
  if (document.activeElement?.placeholder === "ボード内検索") {
    return true;
  }
  // フォーカスが絵文字ピッカーの検索フォーム
  if (document.getElementsByClassName("emoji-picker__search")[0]) {
    return true;
  }
  return false;
};
