import { PAGES, elmStore } from "./const";
/**
 * URLに"/app/board/"が含まれていたら"/app/board/[乱数]"とそれ以降の"/element/[A-Za-z0-9]"をセパレートする。
 * そして/app/board/側の文字列を返す
 * @param {string} url - URLを指定する。
 * @returns {string} - 整形後のURL文字列
 */
export const urlFormat = (url) => {
  let result = url;
  if (url.includes("/app/board/")) {
    // https://strap.app/app/board/[A-Za-z0-9] を取得しそれ意以降の "/element/[A-Za-z0-9]"を省く
    const formatAry = /(.*\/app\/board\/\w+)\/?/.exec(url) || [];
    result = formatAry[1] ?? url;
  }
  return result;
};

/**
 * URLパスから画面の種類を判別してタイプを返す
 * @returns {string} - PAGESタイプ文字列
 */
export const getPageType = () => {
  const pathName = location.pathname;
  if (/\/app\/board\/.*/.test(pathName)) {
    return PAGES.BOARD;
  } else if (/\/app\/space\/.*/.test(pathName)) {
    return PAGES.SPACE;
  } else if (/\/app\/spaces\/?/.test(pathName)) {
    return PAGES.SPACES;
  } else if (/\/app\/recent\/?/.test(pathName)) {
    return PAGES.RECENT;
  } else if (/\/app\/trash\/?/.test(pathName)) {
    return PAGES.TRASH;
  } else if (/\/app\/?/.test(pathName)) {
    return PAGES.GENERAL;
  } else {
    return "";
  }
};

/**
 * chromeのstorageを取得して返す
 * @param {string} key - 取得したいstorage内key
 * @returns {string} - 取得したstorageデータ
 */
export const getStorage = (key = null) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (item) => {
      key && item ? resolve(item[key]) : resolve(item);
    });
  });
};

/**
 * chromeのstorageにデータを保存する
 * @param {Object} payload - 取得したいstorage内key
 */
export const setStorage = (payload) => {
  return new Promise((resolve) => {
    chrome.storage.local.set(payload, () => resolve());
  });
};

/**
 * ボード画面の「共有」ボタンの親divを取得して返す
 * @returns {Element} - 共有ボタンの親Element
 */
export const getShareBtnContainer = () => {
  if (elmStore.shareBtnContainer) {
    return elmStore.shareBtnContainer;
  }
  // buttonタグかつラベルが"共有"のものを抽出
  const buttonAry = Array.from(document.querySelectorAll("button"));
  const shareButton = buttonAry.filter((el) => el.innerText === "共有");
  const container = shareButton[0]?.parentNode;
  elmStore.shareBtnContainer = container;
  return container;
};
