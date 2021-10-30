const elm = {
  timerSwitchElm: null,
  handSwitchElm: null,
  handSettingElm: null,
  inputPressCcodeElm: null,
  shortcutCodeElm: null,
  addCodeButton: null,
  handRadioH: null,
  handRadioAny: null,
  saveButton: null,
};

elm.timerSwitchElm = document.getElementById("timer");
elm.emojiButtonSwitchElm = document.getElementById("emoji-button");
elm.joinSpaceArrowButtonSwitchElm = document.getElementById("join-space-arrow-button");
elm.handSwitchElm = document.getElementById("shortcut-hand");
elm.handSettingElm = document.getElementById("shortcut-hand-setting");
elm.inputPressCcodeElm = document.getElementById("input-press-code");
elm.shortcutCodeElm = document.getElementById("shortcut-code");
elm.addCodeButton = document.getElementById("add-code");
elm.handRadioH = document.getElementById("hand-h");
elm.handRadioAny = document.getElementById("hand-any");
elm.saveButton = document.getElementById("save-button");

const DEFAULT_CODE = "KeyH";
const toggleSwitchAnimeCSSClassName = "anime";
const storage = {
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
  },
};

const setStorage = (payload) => {
  return new Promise((resolve) => {
    chrome.storage.local.set(payload, () => resolve());
  });
};

const getStorage = (key = null) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (item) => {
      key ? resolve(item[key]) : resolve(item);
    });
  });
};

const applyStrageState = (data) => {
  // タイマースイッチ
  elm.timerSwitchElm.checked = !!data[storage.timer.active];
  // 絵文字ボタン
  elm.emojiButtonSwitchElm.checked = !!data[storage.emoji.active];
  // 参加スペース矢印ボタン
  elm.joinSpaceArrowButtonSwitchElm.checked = !!data[storage.joinSpaceArrowButton.active];
  // 手のひらモードスイッチ
  elm.handSwitchElm.checked = !!data[storage.hand.active];
  // 手のひらラジオボタン デフォルト/カスタム
  const handRadio_default = !!data[storage.hand.useDefault];
  elm.handRadioH.checked = handRadio_default;
  elm.handRadioAny.checked = !handRadio_default;
  // ショートカットキーがデフォルト以外ならstorage内codeを表示
  if (!handRadio_default) {
    elm.shortcutCodeElm.value = data[storage.hand.code];
  } else {
    elm.shortcutCodeElm.value = "";
  }
};

// 手のひらモードがOFFだったらショートカットキー選択欄を非表示
const displayHandSettingBox = () => {
  const classList = elm.handSettingElm.classList;
  var shown = false;
  if (elm.handSwitchElm.checked) {
    shown = true;
    classList.remove("hide");
  } else {
    if (!classList.contains("hide")) {
      classList.add("hide");
    }
  }
  return shown;
};

const setKeypressHander = (shown) => {
  document.body.removeEventListener("keydown", getKeyPressCode);
  if (shown) {
    document.body.addEventListener("keydown", getKeyPressCode);
  }
};

const getKeyPressCode = (e) => {
  elm.inputPressCcodeElm.value = e.code;
};

// 選択条件に応じた手のひらショートカット用keydownのcodeを返す
const getShortCutHandCode = () => {
  var result = "";
  const activation = elm.handSwitchElm.checked;
  if (!activation) {
    return result;
  }
  if (elm.handRadioH.checked) {
    return DEFAULT_CODE;
  }
  if (elm.handRadioAny.checked) {
    result = elm.shortcutCodeElm.value;
  }
  return result;
};

// Chrome storage
const saveStorage = async () => {
  var data = await getStorage();
  data[storage.timer.active] = elm.timerSwitchElm.checked;
  data[storage.emoji.active] = elm.emojiButtonSwitchElm.checked;
  data[storage.joinSpaceArrowButton.active] = elm.joinSpaceArrowButtonSwitchElm.checked;
  data[storage.hand.active] = elm.handSwitchElm.checked;
  const handRadio_default = elm.handRadioH.checked;
  data[storage.hand.useDefault] = handRadio_default;
  if (handRadio_default) {
    data[storage.hand.code] = DEFAULT_CODE;
  } else {
    data[storage.hand.code] = getShortCutHandCode();
  }
  await setStorage(data);
};

const init = async () => {
  const storageData = await getStorage();
  applyStrageState(storageData);
  setKeypressHander(true);
  displayHandSettingBox();

  // 手のひらモードスイッチハンドラ
  elm.handSwitchElm.addEventListener("change", () => {
    const shown = displayHandSettingBox();
    setKeypressHander(shown);
  });

  // 現在選択キー反映ボタンハンドラ
  elm.addCodeButton.addEventListener("click", () => {
    if (elm.inputPressCcodeElm.value) {
      elm.shortcutCodeElm.value = elm.inputPressCcodeElm.value;
    }
  });
  // 保存ボタンハンドラ
  elm.saveButton.addEventListener("click", () => {
    saveStorage();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "updateStrap");
    });
  });

  // 初期表示ではトグルスイッチアニメ非表示
  setTimeout(() => {
    const switchLabels = Array.from(document.querySelectorAll(".toggle-label"));
    switchLabels.forEach((elm) => {
      elm?.classList?.add(toggleSwitchAnimeCSSClassName);
    });
  }, 1000);
};

init();
