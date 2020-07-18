/* eslint-env jest */

import { createGetUrl, createGetPath } from "../src/index";

const prefix = "#!";
const rootPath = "/root/path";
const appPath = "/test";
const search = "?foo=bar";
const decodeURI = uri => uri;

const testWindow = {
  decodeURI,
  location: {
    pathname: rootPath + appPath,
    search
  }
};

const createWindowWithHash = hash => {
  const wdw = Object.assign({}, testWindow);
  wdw.location.hash = hash;
  return wdw;
};

describe("getUrl", () => {
  describe("hash mode", () => {
    test("returns the hash if it exists", () => {
      const hash = prefix + "/test";
      const getUrl = createGetUrl(prefix, false, createWindowWithHash(hash));
      expect(getUrl()).toEqual(hash);
    });

    test("returns the prefix and root if hash does not exist", () => {
      const getUrl = createGetUrl(prefix, false, createWindowWithHash(null));
      expect(getUrl()).toEqual(prefix + "/");
    });
  });

  describe("history mode", () => {
    test("returns the pathname and search", () => {
      const getUrl = createGetUrl(rootPath, true, testWindow);
      expect(getUrl()).toEqual(testWindow.location.pathname + testWindow.location.search);
    });
  });
});

describe("getPath", () => {
  describe("returns the URL without the prefix", () => {
    test("hash mode", () => {
      const path = "/test";
      const hash = prefix + path;
      const getUrl = createGetUrl(prefix, false, createWindowWithHash(hash));
      const getPath = createGetPath(prefix, getUrl);
      expect(getPath()).toEqual(path);
    });

    test("history mode", () => {
      const getUrl = createGetUrl(rootPath, true, testWindow);
      const getPath = createGetPath(rootPath, getUrl);
      expect(getPath()).toEqual(appPath + search);
    });
  });
});
