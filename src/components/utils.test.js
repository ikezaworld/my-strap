import mock from "jest-mock";
import { urlFormat, getPageType } from "./utils";
import { PAGES } from "./const";

describe("Format the URL character to split the '/app/board/' character.", () => {
  it("format `/app/xx' to '/app/xx'", () => {
    expect(urlFormat("/app/xx")).toBe("/app/xx");
  });
  it("format `/app/board' to '/app/board'", () => {
    expect(urlFormat("/app/board")).toBe("/app/board");
  });

  it("format `/app/board/' to '/app/board/'", () => {
    expect(urlFormat("/app/board/")).toBe("/app/board/");
  });

  it("format `https://strap.app/app/board/abcDEF123' to 'https://strap.app/app/board/abcDEF123'", () => {
    expect(urlFormat("https://strap.app/app/board/abcDEF123")).toBe(
      "https://strap.app/app/board/abcDEF123"
    );
  });

  it("format `https://strap.app/app/board/abcDEF123/' to 'https://strap.app/app/board/abcDEF123'", () => {
    expect(urlFormat("https://strap.app/app/board/abcDEF123/")).toBe(
      "https://strap.app/app/board/abcDEF123"
    );
  });

  it("format `https://strap.app/app/board/abcDEF123/element/xyzABC456' to 'https://strap.app/app/board/abcDEF123'", () => {
    expect(urlFormat("https://strap.app/app/board/abcDEF123/element/xyzABC456")).toBe(
      "https://strap.app/app/board/abcDEF123"
    );
  });
});

describe("Get page type from URL", () => {
  let assignMock = mock.fn();
  delete window.location;
  window.location = { assign: assignMock };

  afterEach(() => {
    assignMock.mockClear();
  });

  it("Returns an empty string if no argument", () => {
    expect(getPageType()).toBe("");
  });
  it("Returns an 'BOARD' if pathname='/app/board/xxx'", () => {
    location.pathname = "/app/board/xxx";
    expect(getPageType()).toBe(PAGES.BOARD);
  });
  it("Returns an 'RECENT' if pathname='/app/recent'", () => {
    location.pathname = "/app/recent";
    expect(getPageType()).toBe(PAGES.RECENT);
  });
  it("Returns an 'RECENT' if pathname='/app/recent/'", () => {
    location.pathname = "/app/recent/";
    expect(getPageType()).toBe(PAGES.RECENT);
  });
  it("Returns an 'SPACES' if pathname='/app/spaces'", () => {
    location.pathname = "/app/spaces";
    expect(getPageType()).toBe(PAGES.SPACES);
  });
  it("Returns an 'SPACES' if pathname='/app/spaces/'", () => {
    location.pathname = "/app/spaces/";
    expect(getPageType()).toBe(PAGES.SPACES);
  });
  it("Returns an 'TRASH' if pathname='/app/trash'", () => {
    location.pathname = "/app/trash";
    expect(getPageType()).toBe(PAGES.TRASH);
  });
  it("Returns an 'TRASH' if pathname='/app/trash/'", () => {
    location.pathname = "/app/trash/";
    expect(getPageType()).toBe(PAGES.TRASH);
  });
  it("Returns an 'GENERAL' if pathname='/app'", () => {
    location.pathname = "/app";
    expect(getPageType()).toBe(PAGES.GENERAL);
  });
  it("Returns an 'GENERAL' if pathname='/app/'", () => {
    location.pathname = "/app/";
    expect(getPageType()).toBe(PAGES.GENERAL);
  });
  it("Returns an 'SPACE' if pathname='/app/space/xxx'", () => {
    location.pathname = "/app/space/xxx";
    expect(getPageType()).toBe(PAGES.SPACE);
  });
});
