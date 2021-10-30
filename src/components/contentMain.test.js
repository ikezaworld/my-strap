import mock from "jest-mock";
import { routeObserver, buttonElementLoaded } from "./contentMain";

// The location.href changed by React router cannot be caught by event. Therefore, it is caught by MutationObserver.
describe("Catching url changes", () => {
  const changeDom = () => {
    const messageElm = document.getElementById("message");
    messageElm?.classList?.replace("test", "test2");
  };

  const changeUrl = () => {
    // location is not supported by jest-dom except for location.hash.
    location.href = location.href + "#test";
  };

  beforeEach(() => {
    document.body.innerHTML =
      '<body><div id="root">' + '<div><p id="message" class="test"></p></div>' + "</div></body>";
  });

  it("The function is called when the dom and url are changed", (done) => {
    const callback = mock.fn(() => {
      done();
    });
    routeObserver({ callback });
    changeDom();
    changeUrl();
  });
});

describe("Catch that the button has been loaded.", () => {
  const addButton = () => {
    setTimeout(() => {
      const elm = document.getElementById("wrap");
      const btnElm = document.createElement("button");
      elm.appendChild(btnElm);
    }, 500);
  };

  beforeEach(() => {
    document.body.innerHTML = '<body><div id="wrap"></div></body>';
  });

  it("The function is called when button added after 500ms", (done) => {
    const callback = mock.fn(() => {
      done();
    });
    buttonElementLoaded(callback);
    addButton();
  });
});
