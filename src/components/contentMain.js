import { urlFormat } from "./utils";

/**
 * Observerを使いroot要素配下でDOM更新が行われたかをキャッチし、URLも変わっていたらコールバック関数を実行する。
 * React等ルーターでのhistory変更をDOMとURL変更で判別する。
 * @param {Object.<[key:string]: Function>} {callback} - コールバック用関数を指定する。
 */
export const routeObserver = ({ callback }) => {
  var currentLocation = location.href;
  const target = document.getElementById("root"); // root要素を監視
  const observer = new MutationObserver(() => {
    const formatUrl = urlFormat(location.href);
    if (currentLocation !== formatUrl) {
      currentLocation = formatUrl;
      if (typeof callback === "function") {
        callback();
      }
    }
  });

  // 監視を開始
  observer.observe(target, {
    attributes: true, // 属性変化の監視
    childList: true, // 子ノードの変化を監視
    subtree: true, // 子孫ノードも監視対象に含める
  });
};

/**
 * ページ内にbutton要素が読み込まれるまで2秒ごとに監視する。button要素が読み込まれたらcallback関数を実行する。
 * @param {Function} callback - コールバック用関数を指定する。
 */
export const buttonElementLoaded = (callback) => {
  const elm = document.querySelector("button");
  if (!elm) {
    setTimeout(() => {
      buttonElementLoaded(callback);
    }, 2000);
    return;
  }
  if (typeof callback === "function") {
    callback();
  }
};
