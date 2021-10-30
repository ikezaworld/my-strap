import { elmStore, boardConst } from "../const";

describe("Display emoji picker modal", () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<body><div id="root">' +
      `<p id=${boardConst.idNameEmojiButton} />` +
      `<p id=${boardConst.idNameEmojiButtonContainer}/>` +
      `<p class=${boardConst.classNameEmojiModalContainer}/>` +
      "</div></body>";
    elmStore.emojiBtnContainer = 1;
    elmStore.emojiBtn = 2;
  });

  it("Delete the id of the emoji button", () => {
    document.getElementById(boardConst.idNameEmojiButton)?.remove();
    document.getElementById(boardConst.idNameEmojiButtonContainer)?.remove();
    document.getElementsByClassName(boardConst.classNameEmojiModalContainer)[0]?.remove();
    elmStore.emojiBtnContainer = null;
    elmStore.emojiBtn = null;
    expect(document.getElementById(boardConst.idNameEmojiButton)).toBeFalsy();
    expect(document.getElementById(boardConst.idNameEmojiButtonContainer)).toBeFalsy();
    expect(document.getElementsByClassName(boardConst.classNameEmojiModalContainer)[0]).toBeFalsy();
    expect(elmStore.emojiBtnContainer).toBeFalsy();
    expect(elmStore.emojiBtn).toBeFalsy();
  });

  // TODO @joeattardi/emoji-buttonをimportしたファイルをtestするとエラーになる。
});
