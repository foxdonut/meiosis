/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisSnabbdom, runapp) {
	      return root.snabbdomApp = factory(meiosisSnabbdom, runapp);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.snabbdomApp = factory(require("meiosis-snabbdom"), require("./runapp"));
	  } else {
	    root.snabbdomApp = factory(root.meiosisSnabbdom, root.runapp);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisSnabbdom, runapp) {
	  runapp(meiosisSnabbdom);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _meiosisSnabbdom = __webpack_require__(1);
	
		Object.keys(_meiosisSnabbdom).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _meiosisSnabbdom[key];
		    }
		  });
		});
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.renderer = undefined;
	
		var _snabbdom = __webpack_require__(2);
	
		var _snabbdom2 = _interopRequireDefault(_snabbdom);
	
		var _h = __webpack_require__(6);
	
		var _h2 = _interopRequireDefault(_h);
	
		var _meiosisRender = __webpack_require__(7);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var patch = _snabbdom2.default.init([__webpack_require__(9), __webpack_require__(10), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13)]);
	
		var vnode = null;
	
		var intoElement = function intoElement(element) {
		  vnode = element;
		  return function (model, rootComponent) {
		    vnode = patch(vnode, rootComponent(model));
		    return vnode;
		  };
		};
	
		var renderer = function renderer() {
		  return (0, _meiosisRender.meiosisRender)(intoElement);
		};
		renderer.h = _h2.default;
	
		exports.renderer = renderer;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		// jshint newcap: false
		/* global require, module, document, Node */
		'use strict';
	
		var VNode = __webpack_require__(3);
		var is = __webpack_require__(4);
		var domApi = __webpack_require__(5);
	
		function isUndef(s) { return s === undefined; }
		function isDef(s) { return s !== undefined; }
	
		var emptyNode = VNode('', {}, [], undefined, undefined);
	
		function sameVnode(vnode1, vnode2) {
		  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
		}
	
		function createKeyToOldIdx(children, beginIdx, endIdx) {
		  var i, map = {}, key;
		  for (i = beginIdx; i <= endIdx; ++i) {
		    key = children[i].key;
		    if (isDef(key)) map[key] = i;
		  }
		  return map;
		}
	
		var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
	
		function init(modules, api) {
		  var i, j, cbs = {};
	
		  if (isUndef(api)) api = domApi;
	
		  for (i = 0; i < hooks.length; ++i) {
		    cbs[hooks[i]] = [];
		    for (j = 0; j < modules.length; ++j) {
		      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
		    }
		  }
	
		  function emptyNodeAt(elm) {
		    var id = elm.id ? '#' + elm.id : '';
		    var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
		    return VNode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
		  }
	
		  function createRmCb(childElm, listeners) {
		    return function() {
		      if (--listeners === 0) {
		        var parent = api.parentNode(childElm);
		        api.removeChild(parent, childElm);
		      }
		    };
		  }
	
		  function createElm(vnode, insertedVnodeQueue) {
		    var i, data = vnode.data;
		    if (isDef(data)) {
		      if (isDef(i = data.hook) && isDef(i = i.init)) {
		        i(vnode);
		        data = vnode.data;
		      }
		    }
		    var elm, children = vnode.children, sel = vnode.sel;
		    if (isDef(sel)) {
		      // Parse selector
		      var hashIdx = sel.indexOf('#');
		      var dotIdx = sel.indexOf('.', hashIdx);
		      var hash = hashIdx > 0 ? hashIdx : sel.length;
		      var dot = dotIdx > 0 ? dotIdx : sel.length;
		      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
		      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
		                                                          : api.createElement(tag);
		      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
		      if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
		      if (is.array(children)) {
		        for (i = 0; i < children.length; ++i) {
		          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
		        }
		      } else if (is.primitive(vnode.text)) {
		        api.appendChild(elm, api.createTextNode(vnode.text));
		      }
		      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
		      i = vnode.data.hook; // Reuse variable
		      if (isDef(i)) {
		        if (i.create) i.create(emptyNode, vnode);
		        if (i.insert) insertedVnodeQueue.push(vnode);
		      }
		    } else {
		      elm = vnode.elm = api.createTextNode(vnode.text);
		    }
		    return vnode.elm;
		  }
	
		  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
		    for (; startIdx <= endIdx; ++startIdx) {
		      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
		    }
		  }
	
		  function invokeDestroyHook(vnode) {
		    var i, j, data = vnode.data;
		    if (isDef(data)) {
		      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
		      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
		      if (isDef(i = vnode.children)) {
		        for (j = 0; j < vnode.children.length; ++j) {
		          invokeDestroyHook(vnode.children[j]);
		        }
		      }
		    }
		  }
	
		  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
		    for (; startIdx <= endIdx; ++startIdx) {
		      var i, listeners, rm, ch = vnodes[startIdx];
		      if (isDef(ch)) {
		        if (isDef(ch.sel)) {
		          invokeDestroyHook(ch);
		          listeners = cbs.remove.length + 1;
		          rm = createRmCb(ch.elm, listeners);
		          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
		          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
		            i(ch, rm);
		          } else {
		            rm();
		          }
		        } else { // Text node
		          api.removeChild(parentElm, ch.elm);
		        }
		      }
		    }
		  }
	
		  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
		    var oldStartIdx = 0, newStartIdx = 0;
		    var oldEndIdx = oldCh.length - 1;
		    var oldStartVnode = oldCh[0];
		    var oldEndVnode = oldCh[oldEndIdx];
		    var newEndIdx = newCh.length - 1;
		    var newStartVnode = newCh[0];
		    var newEndVnode = newCh[newEndIdx];
		    var oldKeyToIdx, idxInOld, elmToMove, before;
	
		    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
		      if (isUndef(oldStartVnode)) {
		        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
		      } else if (isUndef(oldEndVnode)) {
		        oldEndVnode = oldCh[--oldEndIdx];
		      } else if (sameVnode(oldStartVnode, newStartVnode)) {
		        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
		        oldStartVnode = oldCh[++oldStartIdx];
		        newStartVnode = newCh[++newStartIdx];
		      } else if (sameVnode(oldEndVnode, newEndVnode)) {
		        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
		        oldEndVnode = oldCh[--oldEndIdx];
		        newEndVnode = newCh[--newEndIdx];
		      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
		        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
		        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
		        oldStartVnode = oldCh[++oldStartIdx];
		        newEndVnode = newCh[--newEndIdx];
		      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
		        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
		        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
		        oldEndVnode = oldCh[--oldEndIdx];
		        newStartVnode = newCh[++newStartIdx];
		      } else {
		        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
		        idxInOld = oldKeyToIdx[newStartVnode.key];
		        if (isUndef(idxInOld)) { // New element
		          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
		          newStartVnode = newCh[++newStartIdx];
		        } else {
		          elmToMove = oldCh[idxInOld];
		          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
		          oldCh[idxInOld] = undefined;
		          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
		          newStartVnode = newCh[++newStartIdx];
		        }
		      }
		    }
		    if (oldStartIdx > oldEndIdx) {
		      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
		      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
		    } else if (newStartIdx > newEndIdx) {
		      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
		    }
		  }
	
		  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
		    var i, hook;
		    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
		      i(oldVnode, vnode);
		    }
		    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
		    if (oldVnode === vnode) return;
		    if (!sameVnode(oldVnode, vnode)) {
		      var parentElm = api.parentNode(oldVnode.elm);
		      elm = createElm(vnode, insertedVnodeQueue);
		      api.insertBefore(parentElm, elm, oldVnode.elm);
		      removeVnodes(parentElm, [oldVnode], 0, 0);
		      return;
		    }
		    if (isDef(vnode.data)) {
		      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
		      i = vnode.data.hook;
		      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
		    }
		    if (isUndef(vnode.text)) {
		      if (isDef(oldCh) && isDef(ch)) {
		        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
		      } else if (isDef(ch)) {
		        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
		        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
		      } else if (isDef(oldCh)) {
		        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
		      } else if (isDef(oldVnode.text)) {
		        api.setTextContent(elm, '');
		      }
		    } else if (oldVnode.text !== vnode.text) {
		      api.setTextContent(elm, vnode.text);
		    }
		    if (isDef(hook) && isDef(i = hook.postpatch)) {
		      i(oldVnode, vnode);
		    }
		  }
	
		  return function(oldVnode, vnode) {
		    var i, elm, parent;
		    var insertedVnodeQueue = [];
		    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
	
		    if (isUndef(oldVnode.sel)) {
		      oldVnode = emptyNodeAt(oldVnode);
		    }
	
		    if (sameVnode(oldVnode, vnode)) {
		      patchVnode(oldVnode, vnode, insertedVnodeQueue);
		    } else {
		      elm = oldVnode.elm;
		      parent = api.parentNode(elm);
	
		      createElm(vnode, insertedVnodeQueue);
	
		      if (parent !== null) {
		        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
		        removeVnodes(parent, [oldVnode], 0, 0);
		      }
		    }
	
		    for (i = 0; i < insertedVnodeQueue.length; ++i) {
		      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
		    }
		    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
		    return vnode;
		  };
		}
	
		module.exports = {init: init};
	
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		module.exports = function(sel, data, children, text, elm) {
		  var key = data === undefined ? undefined : data.key;
		  return {sel: sel, data: data, children: children,
		          text: text, elm: elm, key: key};
		};
	
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		module.exports = {
		  array: Array.isArray,
		  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
		};
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		function createElement(tagName){
		  return document.createElement(tagName);
		}
	
		function createElementNS(namespaceURI, qualifiedName){
		  return document.createElementNS(namespaceURI, qualifiedName);
		}
	
		function createTextNode(text){
		  return document.createTextNode(text);
		}
	
	
		function insertBefore(parentNode, newNode, referenceNode){
		  parentNode.insertBefore(newNode, referenceNode);
		}
	
	
		function removeChild(node, child){
		  node.removeChild(child);
		}
	
		function appendChild(node, child){
		  node.appendChild(child);
		}
	
		function parentNode(node){
		  return node.parentElement;
		}
	
		function nextSibling(node){
		  return node.nextSibling;
		}
	
		function tagName(node){
		  return node.tagName;
		}
	
		function setTextContent(node, text){
		  node.textContent = text;
		}
	
		module.exports = {
		  createElement: createElement,
		  createElementNS: createElementNS,
		  createTextNode: createTextNode,
		  appendChild: appendChild,
		  removeChild: removeChild,
		  insertBefore: insertBefore,
		  parentNode: parentNode,
		  nextSibling: nextSibling,
		  tagName: tagName,
		  setTextContent: setTextContent
		};
	
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		var VNode = __webpack_require__(3);
		var is = __webpack_require__(4);
	
		function addNS(data, children, sel) {
		  data.ns = 'http://www.w3.org/2000/svg';
	
		  if (sel !== 'foreignObject' && children !== undefined) {
		    for (var i = 0; i < children.length; ++i) {
		      addNS(children[i].data, children[i].children, children[i].sel);
		    }
		  }
		}
	
		module.exports = function h(sel, b, c) {
		  var data = {}, children, text, i;
		  if (c !== undefined) {
		    data = b;
		    if (is.array(c)) { children = c; }
		    else if (is.primitive(c)) { text = c; }
		  } else if (b !== undefined) {
		    if (is.array(b)) { children = b; }
		    else if (is.primitive(b)) { text = b; }
		    else { data = b; }
		  }
		  if (is.array(children)) {
		    for (i = 0; i < children.length; ++i) {
		      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
		    }
		  }
		  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
		    addNS(data, children, sel);
		  }
		  return VNode(sel, data, children, text, undefined);
		};
	
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		function __export(m) {
		    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
		}
		__export(__webpack_require__(8));
		//# sourceMappingURL=index.js.map
	
	/***/ },
	/* 8 */
	/***/ function(module, exports) {
	
		"use strict";
		function meiosisRender(intoElement) {
		    var intoId = function (doc, id) {
		        return intoElement(doc.getElementById(id));
		    };
		    var intoSelector = function (doc, selector) {
		        return intoElement(doc.querySelector(selector));
		    };
		    var intoViewIds = function (doc) { return function (model, rootComponent) {
		        var views = rootComponent(model);
		        var _loop_1 = function(id) {
		            var component = function (model) { return views[id]; };
		            intoElement(doc.getElementById(id))(model, component);
		        };
		        for (var id in views) {
		            _loop_1(id);
		        }
		    }; };
		    return {
		        intoElement: intoElement,
		        intoId: intoId,
		        intoSelector: intoSelector,
		        intoViewIds: intoViewIds
		    };
		}
		exports.meiosisRender = meiosisRender;
		//# sourceMappingURL=meiosis-render.js.map
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
		var NamespaceURIs = {
		  "xlink": "http://www.w3.org/1999/xlink"
		};
	
		var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare",
		                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable",
		                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple",
		                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly",
		                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate",
		                "truespeed", "typemustmatch", "visible"];
	
		var booleanAttrsDict = Object.create(null);
		for(var i=0, len = booleanAttrs.length; i < len; i++) {
		  booleanAttrsDict[booleanAttrs[i]] = true;
		}
	
		function updateAttrs(oldVnode, vnode) {
		  var key, cur, old, elm = vnode.elm,
		      oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs, namespaceSplit;
	
		  if (!oldAttrs && !attrs) return;
		  oldAttrs = oldAttrs || {};
		  attrs = attrs || {};
	
		  // update modified attributes, add new attributes
		  for (key in attrs) {
		    cur = attrs[key];
		    old = oldAttrs[key];
		    if (old !== cur) {
		      if(!cur && booleanAttrsDict[key])
		        elm.removeAttribute(key);
		      else {
		        namespaceSplit = key.split(":");
		        if(namespaceSplit.length > 1 && NamespaceURIs.hasOwnProperty(namespaceSplit[0]))
		          elm.setAttributeNS(NamespaceURIs[namespaceSplit[0]], key, cur);
		        else
		          elm.setAttribute(key, cur);
		      }
		    }
		  }
		  //remove removed attributes
		  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
		  // the other option is to remove all attributes with value == undefined
		  for (key in oldAttrs) {
		    if (!(key in attrs)) {
		      elm.removeAttribute(key);
		    }
		  }
		}
	
		module.exports = {create: updateAttrs, update: updateAttrs};
	
	
	/***/ },
	/* 10 */
	/***/ function(module, exports) {
	
		function updateClass(oldVnode, vnode) {
		  var cur, name, elm = vnode.elm,
		      oldClass = oldVnode.data.class,
		      klass = vnode.data.class;
	
		  if (!oldClass && !klass) return;
		  oldClass = oldClass || {};
		  klass = klass || {};
	
		  for (name in oldClass) {
		    if (!klass[name]) {
		      elm.classList.remove(name);
		    }
		  }
		  for (name in klass) {
		    cur = klass[name];
		    if (cur !== oldClass[name]) {
		      elm.classList[cur ? 'add' : 'remove'](name);
		    }
		  }
		}
	
		module.exports = {create: updateClass, update: updateClass};
	
	
	/***/ },
	/* 11 */
	/***/ function(module, exports) {
	
		function invokeHandler(handler, vnode, event) {
		  if (typeof handler === "function") {
		    // call function handler
		    handler.call(vnode, event, vnode);
		  } else if (typeof handler === "object") {
		    // call handler with arguments
		    if (typeof handler[0] === "function") {
		      // special case for single argument for performance
		      if (handler.length === 2) {
		        handler[0].call(vnode, handler[1], event, vnode);
		      } else {
		        var args = handler.slice(1);
		        args.push(event);
		        args.push(vnode);
		        handler[0].apply(vnode, args);
		      }
		    } else {
		      // call multiple handlers
		      for (var i = 0; i < handler.length; i++) {
		        invokeHandler(handler[i]);
		      }
		    }
		  }
		}
	
		function handleEvent(event, vnode) {
		  var name = event.type,
		      on = vnode.data.on;
	
		  // call event handler(s) if exists
		  if (on && on[name]) {
		    invokeHandler(on[name], vnode, event);
		  }
		}
	
		function createListener() {
		  return function handler(event) {
		    handleEvent(event, handler.vnode);
		  }
		}
	
		function updateEventListeners(oldVnode, vnode) {
		  var oldOn = oldVnode.data.on,
		      oldListener = oldVnode.listener,
		      oldElm = oldVnode.elm,
		      on = vnode && vnode.data.on,
		      elm = vnode && vnode.elm,
		      name;
	
		  // optimization for reused immutable handlers
		  if (oldOn === on) {
		    return;
		  }
	
		  // remove existing listeners which no longer used
		  if (oldOn && oldListener) {
		    // if element changed or deleted we remove all existing listeners unconditionally
		    if (!on) {
		      for (name in oldOn) {
		        // remove listener if element was changed or existing listeners removed
		        oldElm.removeEventListener(name, oldListener, false);
		      }
		    } else {
		      for (name in oldOn) {
		        // remove listener if existing listener removed
		        if (!on[name]) {
		          oldElm.removeEventListener(name, oldListener, false);
		        }
		      }
		    }
		  }
	
		  // add new listeners which has not already attached
		  if (on) {
		    // reuse existing listener or create new
		    var listener = vnode.listener = oldVnode.listener || createListener();
		    // update vnode for listener
		    listener.vnode = vnode;
	
		    // if element changed or added we add all needed listeners unconditionally
		    if (!oldOn) {
		      for (name in on) {
		        // add listener if element was changed or new listeners added
		        elm.addEventListener(name, listener, false);
		      }
		    } else {
		      for (name in on) {
		        // add listener if new listener added
		        if (!oldOn[name]) {
		          elm.addEventListener(name, listener, false);
		        }
		      }
		    }
		  }
		}
	
		module.exports = {
		  create: updateEventListeners,
		  update: updateEventListeners,
		  destroy: updateEventListeners
		};
	
	
	/***/ },
	/* 12 */
	/***/ function(module, exports) {
	
		function updateProps(oldVnode, vnode) {
		  var key, cur, old, elm = vnode.elm,
		      oldProps = oldVnode.data.props, props = vnode.data.props;
	
		  if (!oldProps && !props) return;
		  oldProps = oldProps || {};
		  props = props || {};
	
		  for (key in oldProps) {
		    if (!props[key]) {
		      delete elm[key];
		    }
		  }
		  for (key in props) {
		    cur = props[key];
		    old = oldProps[key];
		    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
		      elm[key] = cur;
		    }
		  }
		}
	
		module.exports = {create: updateProps, update: updateProps};
	
	
	/***/ },
	/* 13 */
	/***/ function(module, exports) {
	
		var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
		var nextFrame = function(fn) { raf(function() { raf(fn); }); };
	
		function setNextFrame(obj, prop, val) {
		  nextFrame(function() { obj[prop] = val; });
		}
	
		function updateStyle(oldVnode, vnode) {
		  var cur, name, elm = vnode.elm,
		      oldStyle = oldVnode.data.style,
		      style = vnode.data.style;
	
		  if (!oldStyle && !style) return;
		  oldStyle = oldStyle || {};
		  style = style || {};
		  var oldHasDel = 'delayed' in oldStyle;
	
		  for (name in oldStyle) {
		    if (!style[name]) {
		      elm.style[name] = '';
		    }
		  }
		  for (name in style) {
		    cur = style[name];
		    if (name === 'delayed') {
		      for (name in style.delayed) {
		        cur = style.delayed[name];
		        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
		          setNextFrame(elm.style, name, cur);
		        }
		      }
		    } else if (name !== 'remove' && cur !== oldStyle[name]) {
		      elm.style[name] = cur;
		    }
		  }
		}
	
		function applyDestroyStyle(vnode) {
		  var style, name, elm = vnode.elm, s = vnode.data.style;
		  if (!s || !(style = s.destroy)) return;
		  for (name in style) {
		    elm.style[name] = style[name];
		  }
		}
	
		function applyRemoveStyle(vnode, rm) {
		  var s = vnode.data.style;
		  if (!s || !s.remove) {
		    rm();
		    return;
		  }
		  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
		      compStyle, style = s.remove, amount = 0, applied = [];
		  for (name in style) {
		    applied.push(name);
		    elm.style[name] = style[name];
		  }
		  compStyle = getComputedStyle(elm);
		  var props = compStyle['transition-property'].split(', ');
		  for (; i < props.length; ++i) {
		    if(applied.indexOf(props[i]) !== -1) amount++;
		  }
		  elm.addEventListener('transitionend', function(ev) {
		    if (ev.target === elm) --amount;
		    if (amount === 0) rm();
		  });
		}
	
		module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};
	
	
	/***/ }
	/******/ ]);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(6), __webpack_require__(7), __webpack_require__(30), __webpack_require__(79)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, meiosisTracer, Type, rootComponent, todoStorage) {
	      return root.runapp = factory(meiosis, meiosisTracer, Type, rootComponent, todoStorage);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.runapp = factory(require("meiosis"), require("meiosis-tracer"), require("union-type"), require("./root/component"), require("../common/store"));
	  } else {
	    root.runapp = factory(root.meiosis, root.meiosisTracer, root.unionType, root.rootComponent, root.todoStorage);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, meiosisTracer, Type, rootComponent, todoStorage) {
	  return function (meiosisRender) {
	    Type.check = false;
	
	    var root = rootComponent(todoStorage);
	    var renderRoot = meiosis.run({ renderer: meiosisRender.renderer().intoId(document, "app"), rootComponent: root });
	    meiosisTracer(meiosis.createComponent, renderRoot, "#tracer");
	  };
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));
	//# sourceMappingURL=index.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var wire_1 = __webpack_require__(5);
	var REFUSE_PROPOSAL = {};
	exports.REFUSE_PROPOSAL = REFUSE_PROPOSAL;
	var nextId = 1;
	var copy = function (obj) { return JSON.parse(JSON.stringify(obj)); };
	function newInstance() {
	    var allInitialModels = [];
	    var allReceives = [];
	    var allReadies = [];
	    var allPostRenders = [];
	    var allNextActions = [];
	    var createRootWire = wire_1.defaultWireCreator();
	    var createComponentWire = wire_1.defaultWireCreator();
	    var rootWire = createRootWire("meiosis_" + (nextId++));
	    var componentWire = createComponentWire();
	    var propose = componentWire.emit;
	    function createComponent(config) {
	        if (!config || (!config.actions &&
	            !config.nextAction &&
	            !config.initialModel &&
	            !config.ready &&
	            !config.receive &&
	            !config.view &&
	            !config.postRender)) {
	            throw new Error("Please specify a config when calling createComponent.");
	        }
	        var initialModel = config.initialModel;
	        if (initialModel) {
	            if (typeof initialModel !== "function") {
	                throw new Error("initialModel in createComponent must be a function. You can pass the root initialModel object to the run function.");
	            }
	            allInitialModels.push(initialModel);
	        }
	        var actions = config.actions ? config.actions(propose) : propose;
	        var receive = config.receive;
	        if (receive) {
	            allReceives.push(receive);
	        }
	        var ready = config.ready;
	        if (ready) {
	            allReadies.push(function () { return ready(actions); });
	        }
	        var postRender = config.postRender;
	        if (postRender) {
	            allPostRenders.push(postRender);
	        }
	        var nextAction = config.nextAction;
	        if (nextAction) {
	            allNextActions.push(function (model, proposal) { return nextAction(model, proposal, actions); });
	        }
	        return function (model) {
	            return config.view ? config.view(model, actions) : undefined;
	        };
	    }
	    ;
	    var run = function (runConfig) {
	        var rootModel = runConfig.initialModel || {};
	        allInitialModels.forEach(function (initialModel) { return rootModel = initialModel(rootModel); });
	        componentWire.listen(function (proposal) {
	            var accepted = true;
	            for (var i = 0; i < allReceives.length; i++) {
	                var receive = allReceives[i];
	                var received = receive(rootModel, proposal);
	                if (received === REFUSE_PROPOSAL) {
	                    accepted = false;
	                    break;
	                }
	                else {
	                    rootModel = received;
	                }
	            }
	            ;
	            if (accepted) {
	                rootWire.emit(rootModel);
	                allNextActions.forEach(function (nextAction) { return nextAction(rootModel, proposal); });
	            }
	        });
	        var renderRoot_ = function (model) {
	            var result = runConfig.renderer(model, runConfig.rootComponent);
	            allPostRenders.forEach(function (postRender) { return postRender(model); });
	            return result;
	        };
	        renderRoot_.initialModel = rootModel;
	        var renderRoot = renderRoot_;
	        rootWire.listen(renderRoot);
	        rootWire.emit(rootModel);
	        allReadies.forEach(function (ready) { return ready(); });
	        var devtool = window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"];
	        if (devtool) {
	            var initialModel_1 = copy(rootModel);
	            var bufferedReceives_1 = [];
	            var devtoolInitialized_1 = false;
	            createComponent({
	                receive: function (model, proposal) {
	                    if (devtoolInitialized_1) {
	                        window.postMessage({ type: "MEIOSIS_RECEIVE", model: model, proposal: proposal }, "*");
	                    }
	                    else {
	                        bufferedReceives_1.push({ model: copy(model), proposal: proposal });
	                    }
	                    return model;
	                }
	            });
	            window.addEventListener("message", function (evt) {
	                if (evt.data.type === "MEIOSIS_RENDER_ROOT") {
	                    renderRoot(evt.data.model);
	                }
	                else if (evt.data.type === "MEIOSIS_REQUEST_INITIAL_MODEL") {
	                    window.postMessage({ type: "MEIOSIS_INITIAL_MODEL", model: initialModel_1 }, "*");
	                    devtoolInitialized_1 = true;
	                    for (var i = 0; i < bufferedReceives_1.length; i++) {
	                        var _a = bufferedReceives_1[i], model = _a.model, proposal = _a.proposal;
	                        window.postMessage({ type: "MEIOSIS_RECEIVE", model: model, proposal: proposal }, "*");
	                    }
	                }
	            });
	        }
	        return renderRoot;
	    };
	    return {
	        createComponent: createComponent,
	        run: run
	    };
	}
	exports.newInstance = newInstance;
	var instance = newInstance();
	var createComponent = instance.createComponent;
	exports.createComponent = createComponent;
	var run = instance.run;
	exports.run = run;
	//# sourceMappingURL=meiosis.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var wires = {};
	var nextWireId = 1;
	function defaultWireCreator() {
	    var createWire = function () {
	        var listener = null;
	        var listen = function (lstnr) { return listener = lstnr; };
	        var emit = function (proposal) { return listener(proposal); };
	        return { emit: emit, listen: listen };
	    };
	    return function (wireName) {
	        var name = wireName;
	        if (!name) {
	            name = "wire_" + nextWireId;
	            nextWireId++;
	        }
	        var theWire = wires[name];
	        if (!theWire) {
	            theWire = createWire();
	            wires[name] = theWire;
	        }
	        return theWire;
	    };
	}
	exports.defaultWireCreator = defaultWireCreator;
	;
	//# sourceMappingURL=wire.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		var _meiosisTracer = __webpack_require__(1);
		
		module.exports = _meiosisTracer.meiosisTracer;
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.meiosisTracer = undefined;
		
		var _model = __webpack_require__(2);
		
		var _view = __webpack_require__(3);
		
		var _receive = __webpack_require__(5);
		
		var _receive2 = _interopRequireDefault(_receive);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var tracerModel = _model.initialModel;
		
		var meiosisTracer = function meiosisTracer(createComponent, renderRoot, selector, horizontal) {
		  var receiver = (0, _receive2.default)(tracerModel, (0, _view.proposalView)(renderRoot));
		  createComponent({ receive: receiver });
		  (0, _view.initialView)(selector, renderRoot, tracerModel, horizontal);
		  receiver(renderRoot.initialModel, "initialModel");
		
		  return { reset: function reset() {
		      return (0, _view.reset)(renderRoot, tracerModel);
		    } };
		};
		
		exports.meiosisTracer = meiosisTracer;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var initialModel = {
		  tracerStates: [],
		  tracerIndex: 0
		};
		
		exports.initialModel = initialModel;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.reset = exports.proposalView = exports.initialView = undefined;
		
		var _jsonFormat = __webpack_require__(4);
		
		var _jsonFormat2 = _interopRequireDefault(_jsonFormat);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var jsonFormatConfig = {
		  type: "space",
		  size: 2
		};
		
		var tracerContainerId = "tracerContainer";
		var tracerId = "tracerSlider";
		var tracerToggleId = "tracerToggle";
		var tracerResetId = "tracerReset";
		var tracerIndexId = "tracerIndex";
		var tracerModelId = "tracerModel";
		var tracerStateId = "tracerState";
		var tracerProposalId = "tracerProposal";
		
		var stateFunction = function stateFunction(renderRoot, model, callback) {
		  var stateResult = renderRoot.state(model);
		
		  if (typeof stateResult.then === "function") {
		    stateResult.then(function (state) {
		      callback(state);
		    });
		  } else {
		    callback(stateResult);
		  }
		};
		
		var proposalView = function proposalView(renderRoot) {
		  return function (_ref, tracerModel) {
		    var model = _ref.model,
		        proposal = _ref.proposal;
		
		    var tracer = document.getElementById(tracerId);
		    tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
		    tracer.value = String(tracerModel.tracerIndex);
		
		    var tracerIndex = document.getElementById(tracerIndexId);
		    tracerIndex.innerHTML = String(tracerModel.tracerIndex);
		
		    var tracerProposalEl = document.getElementById(tracerProposalId);
		    tracerProposalEl.value = (0, _jsonFormat2.default)(proposal, jsonFormatConfig);
		
		    var tracerModelEl = document.getElementById(tracerModelId);
		    tracerModelEl.value = (0, _jsonFormat2.default)(model, jsonFormatConfig);
		
		    var tracerStateEl = document.getElementById(tracerStateId);
		    stateFunction(renderRoot, model, function (state) {
		      return tracerStateEl.value = (0, _jsonFormat2.default)(state, jsonFormatConfig);
		    });
		  };
		};
		
		var onSliderChange = function onSliderChange(renderRoot, tracerModel) {
		  return function (evt) {
		    var index = parseInt(evt.target.value, 10);
		    var snapshot = tracerModel.tracerStates[index];
		    stateFunction(renderRoot, snapshot.model, renderRoot);
		    tracerModel.tracerIndex = index;
		    proposalView(renderRoot)(snapshot, tracerModel);
		  };
		};
		
		var onModelChange = function onModelChange(renderRoot) {
		  return function (evt) {
		    try {
		      var model = JSON.parse(evt.target.value);
		      stateFunction(renderRoot, model, function (state) {
		        var tracerStateEl = document.getElementById(tracerStateId);
		        tracerStateEl.value = (0, _jsonFormat2.default)(state, jsonFormatConfig);
		
		        renderRoot(state);
		      });
		    } catch (err) {
		      // ignore invalid JSON
		    }
		  };
		};
		
		var onToggle = function onToggle(tracerContainer) {
		  return function (evt) {
		    var button = evt.target;
		
		    if (tracerContainer.style.display === "none") {
		      tracerContainer.style.display = "block";
		      button.innerHTML = "Hide";
		    } else {
		      tracerContainer.style.display = "none";
		      button.innerHTML = "Show";
		    }
		  };
		};
		
		var onReset = function onReset(renderRoot, tracerModel) {
		  return function () {
		    reset(renderRoot, tracerModel);
		  };
		};
		
		var reset = function reset(renderRoot, tracerModel) {
		  var snapshot = tracerModel.tracerStates[0];
		  if (snapshot) {
		    stateFunction(renderRoot, snapshot.model, renderRoot);
		    proposalView(renderRoot)(snapshot, tracerModel);
		  }
		
		  tracerModel.tracerStates.length = 0;
		  tracerModel.tracerIndex = 0;
		};
		
		var initialView = function initialView(selector, renderRoot, tracerModel, horizontal) {
		  var target = document.querySelector(selector);
		
		  if (target) {
		    var divStyle = horizontal ? " style='float: left'" : "";
		
		    var viewHtml = "<div style='text-align: right'><button id='" + tracerToggleId + "'>Hide</button></div>" + "<div id='" + tracerContainerId + "'>" + "<div style='text-align: right'><button id='" + tracerResetId + "'>Reset</button></div>" + "<input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) + "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" + "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" + "<div" + divStyle + "><div>Proposal:</div>" + "<textarea id='" + tracerProposalId + "' rows='5' cols='40'></textarea></div>" + "<div" + divStyle + "><div>Model: (you can type into this box)</div>" + "<textarea id='" + tracerModelId + "' rows='5' cols='40'></textarea></div>" + "<div" + divStyle + "><div>State:</div>" + "<textarea id='" + tracerStateId + "' rows='5' cols='40'></textarea></div></div>";
		
		    target.innerHTML = viewHtml;
		
		    var tracerContainer = document.getElementById(tracerContainerId);
		
		    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderRoot, tracerModel));
		    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderRoot));
		    document.getElementById(tracerToggleId).addEventListener("click", onToggle(tracerContainer));
		    document.getElementById(tracerResetId).addEventListener("click", onReset(renderRoot, tracerModel));
		  }
		};
		
		exports.initialView = initialView;
		exports.proposalView = proposalView;
		exports.reset = reset;
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		/*
		  change for npm modules.
		  by Luiz Estácio.
		
		  json-format v.1.1
		  http://github.com/phoboslab/json-format
		
		  Released under MIT license:
		  http://www.opensource.org/licenses/mit-license.php
		*/
		var p = [],
		  indentConfig = {
		    tab: { char: '\t', size: 1 },
		    space: { char: ' ', size: 4 }
		  },
		  configDefault = {
		    type: 'tab'
		  },
		  push = function( m ) { return '\\' + p.push( m ) + '\\'; },
		  pop = function( m, i ) { return p[i-1] },
		  tabs = function( count, indentType) { return new Array( count + 1 ).join( indentType ); };
		
		function JSONFormat ( json, indentType ) {
		  p = [];
		  var out = "",
		      indent = 0;
		
		  // Extract backslashes and strings
		  json = json
		    .replace( /\\./g, push )
		    .replace( /(".*?"|'.*?')/g, push )
		    .replace( /\s+/, '' );    
		
		  // Indent and insert newlines
		  for( var i = 0; i < json.length; i++ ) {
		    var c = json.charAt(i);
		
		    switch(c) {
		      case '{':
		      case '[':
		        out += c + "\n" + tabs(++indent, indentType);
		        break;
		      case '}':
		      case ']':
		        out += "\n" + tabs(--indent, indentType) + c;
		        break;
		      case ',':
		        out += ",\n" + tabs(indent, indentType);
		        break;
		      case ':':
		        out += ": ";
		        break;
		      default:
		        out += c;
		        break;      
		    }         
		  }
		
		  // Strip whitespace from numeric arrays and put backslashes 
		  // and strings back in
		  out = out
		    .replace( /\[[\d,\s]+?\]/g, function(m){ return m.replace(/\s/g,''); } )
		    .replace( /\\(\d+)\\/g, pop ) // strings
		    .replace( /\\(\d+)\\/g, pop ); // backslashes in strings
		
		  return out;
		};
		
		module.exports = function(json, config){
		  config = config || configDefault;
		  var indent = indentConfig[config.type];
		
		  if ( indent == null ) {
		    throw new Error('Unrecognized ident type: "' + config.type + '"');
		  }
		  var indentType = new Array((config.size || indent.size) + 1).join(indent.char);
		  return JSONFormat(JSON.stringify(json), indentType);
		}
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var receive = function receive(tracerModel, view) {
		  return function (model, proposal) {
		    var modelCopy = JSON.parse(JSON.stringify(model));
		    var modelAndProposal = { model: modelCopy, proposal: proposal };
		    tracerModel.tracerStates.push(modelAndProposal);
		    tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;
		
		    view(modelAndProposal, tracerModel);
		
		    return model;
		  };
		};
		
		exports.default = receive;
	
	/***/ }
	/******/ ]);
	//# sourceMappingURL=meiosis-tracer.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var curryN = __webpack_require__(8);
	var compose = __webpack_require__(14);
	var isString = function(s) { return typeof s === 'string'; };
	var isNumber = function(n) { return typeof n === 'number'; };
	var isBoolean = function(b) { return typeof b === 'boolean'; };
	var isObject = function(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	};
	var isFunction = function(f) { return typeof f === 'function'; };
	var isArray = Array.isArray || function(a) { return 'length' in a; };
	
	var mapConstrToFn = function(group, constr) {
	  return constr === String    ? isString
	       : constr === Number    ? isNumber
	       : constr === Boolean   ? isBoolean
	       : constr === Object    ? isObject
	       : constr === Array     ? isArray
	       : constr === Function  ? isFunction
	       : constr === undefined ? group
	                              : constr;
	};
	
	var numToStr = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
	
	var validate = function(group, validators, name, args) {
	  var validator, v, i;
	  if (args.length > validators.length) {
	    throw new TypeError('too many arguments supplied to constructor ' + name
	      + ' (expected ' + validators.length + ' but got ' + args.length + ')');
	  }
	  for (i = 0; i < args.length; ++i) {
	    v = args[i];
	    validator = mapConstrToFn(group, validators[i]);
	    if (Type.check === true &&
	        (validator.prototype === undefined || !validator.prototype.isPrototypeOf(v)) &&
	        (typeof validator !== 'function' || !validator(v))) {
	      var strVal = typeof v === 'string' ? "'" + v + "'" : v; // put the value in quotes if it's a string
	      throw new TypeError('wrong value ' + strVal + ' passed as ' + numToStr[i] + ' argument to constructor ' + name);
	    }
	  }
	};
	
	function valueToArray(value) {
	  var i, arr = [];
	  for (i = 0; i < value._keys.length; ++i) {
	    arr.push(value[value._keys[i]]);
	  }
	  return arr;
	}
	
	function extractValues(keys, obj) {
	  var arr = [], i;
	  for (i = 0; i < keys.length; ++i) arr[i] = obj[keys[i]];
	  return arr;
	}
	
	function constructor(group, name, fields) {
	  var validators, keys = Object.keys(fields), i;
	  if (isArray(fields)) {
	    validators = fields;
	  } else {
	    validators = extractValues(keys, fields);
	  }
	  function construct() {
	    var val = Object.create(group.prototype), i;
	    val._keys = keys;
	    val._name = name;
	    if (Type.check === true) {
	      validate(group, validators, name, arguments);
	    }
	    for (i = 0; i < arguments.length; ++i) {
	      val[keys[i]] = arguments[i];
	    }
	    return val;
	  }
	  group[name] = curryN(keys.length, construct);
	  if (keys !== undefined) {
	    group[name+'Of'] = function(obj) {
	      return construct.apply(undefined, extractValues(keys, obj));
	    };
	  }
	}
	
	function rawCase(type, cases, value, arg) {
	  var wildcard = false;
	  var handler = cases[value._name];
	  if (handler === undefined) {
	    handler = cases['_'];
	    wildcard = true;
	  }
	  if (Type.check === true) {
	    if (!type.prototype.isPrototypeOf(value)) {
	      throw new TypeError('wrong type passed to case');
	    } else if (handler === undefined) {
	      throw new Error('non-exhaustive patterns in a function');
	    }
	  }
	  if (handler !== undefined) {
	    var args = wildcard === true ? [arg]
	             : arg !== undefined ? valueToArray(value).concat([arg])
	             : valueToArray(value);
	    return handler.apply(undefined, args);
	  }
	}
	
	var typeCase = curryN(3, rawCase);
	var caseOn = curryN(4, rawCase);
	
	function createIterator() {
	  return {
	    idx: 0,
	    val: this,
	    next: function() {
	      var keys = this.val._keys;
	      return this.idx === keys.length
	        ? {done: true}
	        : {value: this.val[keys[this.idx++]]};
	    }
	  };
	}
	
	function Type(desc) {
	  var key, res, obj = {};
	  obj.case = typeCase(obj);
	  obj.caseOn = caseOn(obj);
	  
	  obj.prototype = {};
	  obj.prototype[Symbol ? Symbol.iterator : '@@iterator'] = createIterator;
	  obj.prototype.case = function (cases) { return obj.case(cases, this); };
	  obj.prototype.caseOn = function (cases) { return obj.caseOn(cases, this); };
	  
	  for (key in desc) {
	    res = constructor(obj, key, desc[key]);
	  }
	  return obj;
	}
	
	Type.check = true;
	
	Type.ListOf = function (T) {
	  var List = Type({List:[Array]});
	  var innerType = Type({T: [T]}).T;
	  var validate = List.case({
	    List: function (array) {
	      try {
	        for(var n = 0; n < array.length; n++) {
	          innerType(array[n]);
	        }
	      } catch (e) {
	        throw new TypeError('wrong value '+ array[n] + ' passed to location ' + numToStr[n] + ' in List');
	      }
	      return true;
	    }
	  });
	  return compose(validate, List.List);
	};
	
	module.exports = Type;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(9);
	var _curry1 = __webpack_require__(10);
	var _curry2 = __webpack_require__(12);
	var _curryN = __webpack_require__(13);
	
	
	/**
	 * Returns a curried equivalent of the provided function, with the specified
	 * arity. The curried function has two unusual capabilities. First, its
	 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	 * following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	 * following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var sumArgs = (...args) => R.sum(args);
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function _arity(n, fn) {
	  /* eslint-disable no-unused-vars */
	  switch (n) {
	    case 0: return function() { return fn.apply(this, arguments); };
	    case 1: return function(a0) { return fn.apply(this, arguments); };
	    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
	    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
	    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
	    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
	    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
	    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _isPlaceholder = __webpack_require__(11);
	
	
	/**
	 * Optimized internal one-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0 || _isPlaceholder(a)) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function _isPlaceholder(a) {
	  return a != null &&
	         typeof a === 'object' &&
	         a['@@functional/placeholder'] === true;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(10);
	var _isPlaceholder = __webpack_require__(11);
	
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    switch (arguments.length) {
	      case 0:
	        return f2;
	      case 1:
	        return _isPlaceholder(a) ? f2
	             : _curry1(function(_b) { return fn(a, _b); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
	             : fn(a, b);
	    }
	  };
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(9);
	var _isPlaceholder = __webpack_require__(11);
	
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @param {Array} received An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (!_isPlaceholder(received[combinedIdx]) ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (!_isPlaceholder(result)) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined)
	                     : _arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var pipe = __webpack_require__(15);
	var reverse = __webpack_require__(28);
	
	
	/**
	 * Performs right-to-left function composition. The rightmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.pipe
	 * @example
	 *
	 *      var f = R.compose(R.inc, R.negate, Math.pow);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function compose() {
	  if (arguments.length === 0) {
	    throw new Error('compose requires at least one argument');
	  }
	  return pipe.apply(this, reverse(arguments));
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(9);
	var _pipe = __webpack_require__(16);
	var reduce = __webpack_require__(17);
	var tail = __webpack_require__(24);
	
	
	/**
	 * Performs left-to-right function composition. The leftmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * In some libraries this function is named `sequence`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.compose
	 * @example
	 *
	 *      var f = R.pipe(Math.pow, R.negate, R.inc);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function pipe() {
	  if (arguments.length === 0) {
	    throw new Error('pipe requires at least one argument');
	  }
	  return _arity(arguments[0].length,
	                reduce(_pipe, arguments[0], tail(arguments)));
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function _pipe(f, g) {
	  return function() {
	    return g.call(this, f.apply(this, arguments));
	  };
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(18);
	var _reduce = __webpack_require__(19);
	
	
	/**
	 * Returns a single item by iterating through the list, successively calling
	 * the iterator function and passing it an accumulator value and the current
	 * value from the array, and then passing the result to the next call.
	 *
	 * The iterator function receives two values: *(acc, value)*. It may use
	 * `R.reduced` to shortcut the iteration.
	 *
	 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
	 * arrays), unlike the native `Array.prototype.reduce` method. For more details
	 * on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	 *
	 * Dispatches to the `reduce` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig ((a, b) -> a) -> a -> [b] -> a
	 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	 *        current element from the array.
	 * @param {*} acc The accumulator value.
	 * @param {Array} list The list to iterate over.
	 * @return {*} The final, accumulated value.
	 * @see R.reduced, R.addIndex
	 * @example
	 *
	 *      var numbers = [1, 2, 3];
	 *      var add = (a, b) => a + b;
	 *
	 *      R.reduce(add, 10, numbers); //=> 16
	 */
	module.exports = _curry3(_reduce);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(10);
	var _curry2 = __webpack_require__(12);
	var _isPlaceholder = __webpack_require__(11);
	
	
	/**
	 * Optimized internal three-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry3(fn) {
	  return function f3(a, b, c) {
	    switch (arguments.length) {
	      case 0:
	        return f3;
	      case 1:
	        return _isPlaceholder(a) ? f3
	             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
	      case 2:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
	             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _curry1(function(_c) { return fn(a, b, _c); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
	             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
	             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
	             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
	             : fn(a, b, c);
	    }
	  };
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _xwrap = __webpack_require__(20);
	var bind = __webpack_require__(21);
	var isArrayLike = __webpack_require__(22);
	
	
	module.exports = (function() {
	  function _arrayReduce(xf, acc, list) {
	    var idx = 0;
	    var len = list.length;
	    while (idx < len) {
	      acc = xf['@@transducer/step'](acc, list[idx]);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      idx += 1;
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _iterableReduce(xf, acc, iter) {
	    var step = iter.next();
	    while (!step.done) {
	      acc = xf['@@transducer/step'](acc, step.value);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      step = iter.next();
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _methodReduce(xf, acc, obj) {
	    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	  }
	
	  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
	  return function _reduce(fn, acc, list) {
	    if (typeof fn === 'function') {
	      fn = _xwrap(fn);
	    }
	    if (isArrayLike(list)) {
	      return _arrayReduce(fn, acc, list);
	    }
	    if (typeof list.reduce === 'function') {
	      return _methodReduce(fn, acc, list);
	    }
	    if (list[symIterator] != null) {
	      return _iterableReduce(fn, acc, list[symIterator]());
	    }
	    if (typeof list.next === 'function') {
	      return _iterableReduce(fn, acc, list);
	    }
	    throw new TypeError('reduce: list must be array or iterable');
	  };
	}());


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = (function() {
	  function XWrap(fn) {
	    this.f = fn;
	  }
	  XWrap.prototype['@@transducer/init'] = function() {
	    throw new Error('init not implemented on XWrap');
	  };
	  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
	  XWrap.prototype['@@transducer/step'] = function(acc, x) {
	    return this.f(acc, x);
	  };
	
	  return function _xwrap(fn) { return new XWrap(fn); };
	}());


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(9);
	var _curry2 = __webpack_require__(12);
	
	
	/**
	 * Creates a function that is bound to a context.
	 * Note: `R.bind` does not provide the additional argument-binding capabilities of
	 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.6.0
	 * @category Function
	 * @category Object
	 * @sig (* -> *) -> {*} -> (* -> *)
	 * @param {Function} fn The function to bind to context
	 * @param {Object} thisObj The context to bind `fn` to
	 * @return {Function} A function that will execute in the context of `thisObj`.
	 * @see R.partial
	 */
	module.exports = _curry2(function bind(fn, thisObj) {
	  return _arity(fn.length, function() {
	    return fn.apply(thisObj, arguments);
	  });
	});


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(10);
	var _isArray = __webpack_require__(23);
	
	
	/**
	 * Tests whether or not an object is similar to an array.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Type
	 * @category List
	 * @sig * -> Boolean
	 * @param {*} x The object to test.
	 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	 * @example
	 *
	 *      R.isArrayLike([]); //=> true
	 *      R.isArrayLike(true); //=> false
	 *      R.isArrayLike({}); //=> false
	 *      R.isArrayLike({length: 10}); //=> false
	 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	 */
	module.exports = _curry1(function isArrayLike(x) {
	  if (_isArray(x)) { return true; }
	  if (!x) { return false; }
	  if (typeof x !== 'object') { return false; }
	  if (x instanceof String) { return false; }
	  if (x.nodeType === 1) { return !!x.length; }
	  if (x.length === 0) { return true; }
	  if (x.length > 0) {
	    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	  }
	  return false;
	});


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Tests whether or not an object is an array.
	 *
	 * @private
	 * @param {*} val The object to test.
	 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	 * @example
	 *
	 *      _isArray([]); //=> true
	 *      _isArray(null); //=> false
	 *      _isArray({}); //=> false
	 */
	module.exports = Array.isArray || function _isArray(val) {
	  return (val != null &&
	          val.length >= 0 &&
	          Object.prototype.toString.call(val) === '[object Array]');
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(25);
	var slice = __webpack_require__(27);
	
	
	/**
	 * Returns all but the first element of the given list or string (or object
	 * with a `tail` method).
	 *
	 * Dispatches to the `slice` method of the first argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {*} list
	 * @return {*}
	 * @see R.head, R.init, R.last
	 * @example
	 *
	 *      R.tail([1, 2, 3]);  //=> [2, 3]
	 *      R.tail([1, 2]);     //=> [2]
	 *      R.tail([1]);        //=> []
	 *      R.tail([]);         //=> []
	 *
	 *      R.tail('abc');  //=> 'bc'
	 *      R.tail('ab');   //=> 'b'
	 *      R.tail('a');    //=> ''
	 *      R.tail('');     //=> ''
	 */
	module.exports = _checkForMethod('tail', slice(1, Infinity));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(23);
	var _slice = __webpack_require__(26);
	
	
	/**
	 * Similar to hasMethod, this checks whether a function has a [methodname]
	 * function. If it isn't an array it will execute that function otherwise it
	 * will default to the ramda implementation.
	 *
	 * @private
	 * @param {Function} fn ramda implemtation
	 * @param {String} methodname property to check for a custom implementation
	 * @return {Object} Whatever the return value of the method is.
	 */
	module.exports = function _checkForMethod(methodname, fn) {
	  return function() {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
	      fn.apply(this, arguments) :
	      obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	  };
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * An optimized, private array `slice` implementation.
	 *
	 * @private
	 * @param {Arguments|Array} args The array or arguments object to consider.
	 * @param {Number} [from=0] The array index to slice from, inclusive.
	 * @param {Number} [to=args.length] The array index to slice to, exclusive.
	 * @return {Array} A new, sliced array.
	 * @example
	 *
	 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	 *
	 *      var firstThreeArgs = function(a, b, c, d) {
	 *        return _slice(arguments, 0, 3);
	 *      };
	 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	 */
	module.exports = function _slice(args, from, to) {
	  switch (arguments.length) {
	    case 1: return _slice(args, 0, args.length);
	    case 2: return _slice(args, from, args.length);
	    default:
	      var list = [];
	      var idx = 0;
	      var len = Math.max(0, Math.min(args.length, to) - from);
	      while (idx < len) {
	        list[idx] = args[from + idx];
	        idx += 1;
	      }
	      return list;
	  }
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(25);
	var _curry3 = __webpack_require__(18);
	
	
	/**
	 * Returns the elements of the given list or string (or object with a `slice`
	 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	 *
	 * Dispatches to the `slice` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.4
	 * @category List
	 * @sig Number -> Number -> [a] -> [a]
	 * @sig Number -> Number -> String -> String
	 * @param {Number} fromIndex The start index (inclusive).
	 * @param {Number} toIndex The end index (exclusive).
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	 */
	module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	  return Array.prototype.slice.call(list, fromIndex, toIndex);
	}));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(10);
	var _isString = __webpack_require__(29);
	var _slice = __webpack_require__(26);
	
	
	/**
	 * Returns a new list or string with the elements or characters in reverse
	 * order.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {Array|String} list
	 * @return {Array|String}
	 * @example
	 *
	 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
	 *      R.reverse([1, 2]);     //=> [2, 1]
	 *      R.reverse([1]);        //=> [1]
	 *      R.reverse([]);         //=> []
	 *
	 *      R.reverse('abc');      //=> 'cba'
	 *      R.reverse('ab');       //=> 'ba'
	 *      R.reverse('a');        //=> 'a'
	 *      R.reverse('');         //=> ''
	 */
	module.exports = _curry1(function reverse(list) {
	  return _isString(list) ? list.split('').reverse().join('') :
	                           _slice(list).reverse();
	});


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function _isString(x) {
	  return Object.prototype.toString.call(x) === '[object String]';
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(31), __webpack_require__(32), __webpack_require__(33), __webpack_require__(34)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoModel, todoState, rootView, todoappComponent) {
	      return root.todoappComponent = factory(meiosis, todoModel, todoState, rootView, todoappComponent);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.rootComponent = factory(require("meiosis"), require("../../common/root/model"), require("../../common/root/state"), require("./view"), require("../todoapp/component"));
	  } else {
	    root.rootComponent = factory(root.meiosis, root.todoModel, root.todoState, root.rootView, root.todoappComponent);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, todoModel, todoState, rootView, todoappComponent) {
	  return function (todoStorage) {
	    var todoapp = todoappComponent(todoStorage);
	
	    return meiosis.createComponent({
	      initialModel: function initialModel() {
	        return todoModel(todoStorage);
	      },
	      state: todoState,
	      view: rootView(todoapp)
	    });
	  };
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoModel = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoModel = factory();
	  } else {
	    root.todoModel = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return function (todoStorage) {
	    return {
	      todos: todoStorage.loadAll(),
	      newTodo: "",
	      editTodo: {},
	      filter: "all"
	    };
	  };
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoState = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoState = factory();
	  } else {
	    root.todoState = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  var allCompleted = function allCompleted(filteredTodos) {
	    var result = true;
	
	    for (var i = 0, t = filteredTodos.length; i < t; i++) {
	      if (!filteredTodos[i].completed) {
	        result = false;
	        break;
	      }
	    }
	    return result;
	  };
	
	  return function (model) {
	    var state = Object.assign({}, model);
	    var by = model.filter;
	    var completed = by === "completed";
	
	    var filterBy = by && by !== "all" ? function (todo) {
	      return !!todo.completed === completed;
	    } : function () {
	      return true;
	    };
	    state.filteredTodos = model.todos.filter(filterBy);
	    state.allCompleted = allCompleted(state.filteredTodos);
	
	    var notCompleted = function notCompleted(todo) {
	      return !todo.completed;
	    };
	    var itemsLeft = state.filteredTodos.filter(notCompleted).length;
	    state.itemsLeftText = state.filteredTodos.length > 0 ? String(itemsLeft) + " item" + (itemsLeft === 1 ? "" : "s") + " left" : "";
	    state.clearCompleted = state.filteredTodos.length - itemsLeft > 0;
	
	    state.allSelected = model.filter === "all";
	    state.activeSelected = model.filter === "active";
	    state.completedSelected = model.filter === "completed";
	
	    return state;
	  };
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisSnabbdom) {
	      return root.iew = factory(meiosisSnabbdom);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.rootView = factory(require("meiosis-snabbdom"));
	  } else {
	    root.rootView = factory(root.meiosisSnabbdom);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisSnabbdom) {
	  var h = meiosisSnabbdom.renderer.h;
	
	  var info = h("footer.info", [h("p", "Double-click to edit a todo"), h("p", [h("span", "Meiosis - Snabbdom - Created by "), h("a", { props: { href: "http://twitter.com/foxdonut00" } }, "foxdonut00")]), h("p", [h("span", "Part of "), h("a", { props: { href: "http://todomvc.com" } }, "TodoMVC")])]);
	
	  return function (todoapp) {
	    return function (model) {
	      return h("div", [todoapp(model), info]);
	    };
	  };
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(35), __webpack_require__(36), __webpack_require__(41), __webpack_require__(60)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoappView, headerComponent, mainComponent, footerComponent) {
	      return root.todoappComponent = factory(meiosis, todoappView, headerComponent, mainComponent, footerComponent);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoappComponent = factory(require("meiosis"), require("./view"), require("../header/component"), require("../main/component"), require("../footer/component"));
	  } else {
	    root.todoappComponent = factory(root.meiosis, root.todoappView, root.headerComponent, root.mainComponent, root.footerComponent);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, todoappView, headerComponent, mainComponent, footerComponent) {
	  return function (todoStorage) {
	    var header = headerComponent(todoStorage);
	    var main = mainComponent(todoStorage);
	    var footer = footerComponent(todoStorage);
	
	    var view = todoappView(header, main, footer);
	
	    return meiosis.createComponent({ view: view });
	  };
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisSnabbdom) {
	      return root.todoappView = factory(meiosisSnabbdom);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoappView = factory(require("meiosis-snabbdom"));
	  } else {
	    root.todoappView = factory(root.meiosisSnabbdom);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisSnabbdom) {
	  return function (header, main, footer) {
	    return function (model) {
	      var h = meiosisSnabbdom.renderer.h;
	      return h("section.todoapp", [header(model), main(model), footer(model)]);
	    };
	  };
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(37), __webpack_require__(39), __webpack_require__(40)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, headerActions, headerReceive, headerView) {
	      return root.headerComponent = factory(meiosis, headerActions, headerReceive, headerView);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerComponent = factory(require("meiosis"), require("../../common/header/actions"), require("../../common/header/receive"), require("./view"));
	  } else {
	    root.headerComponent = factory(root.meiosis, root.headerActions, root.headerReceive, root.headerView);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, headerActions, headerReceive, headerView) {
	  return function (todoStorage) {
	    return meiosis.createComponent({
	      actions: headerActions,
	      view: headerView,
	      receive: headerReceive(todoStorage)
	    });
	  };
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function (headerActionTypes) {
	      return root.headerActions = factory(headerActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerActions = factory(require("./actionTypes"));
	  } else {
	    root.headerActions = factory(root.headerActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (HeaderAction) {
	  return function (propose) {
	    var actions = {
	      newTodo: function newTodo(title) {
	        propose(HeaderAction.NewTodo(title));
	      },
	      saveTodo: function saveTodo(title) {
	        propose(HeaderAction.SaveNewTodo(title));
	      },
	      clearNewTodo: function clearNewTodo() {
	        propose(HeaderAction.ClearNewTodo());
	      }
	    };
	
	    var ENTER_KEY = 13;
	
	    actions.events = {
	      onNewTodoKeyUp: function onNewTodoKeyUp(evt) {
	        if (evt.keyCode === ENTER_KEY) {
	          actions.saveTodo(evt.target.value);
	        } else {
	          actions.newTodo(evt.target.value);
	        }
	      },
	      onNewTodoKeyUpEnterOnly: function onNewTodoKeyUpEnterOnly(evt) {
	        if (evt.keyCode === ENTER_KEY || evt.which === ENTER_KEY) {
	          actions.saveTodo(evt.target.value);
	        }
	      },
	      onNewTodoChange: function onNewTodoChange(evt) {
	        actions.newTodo(evt.target.value);
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.headerActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerActionTypes = factory(require("union-type"));
	  } else {
	    root.headerActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    NewTodo: [String],
	    SaveNewTodo: [String],
	    ClearNewTodo: []
	  });
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, headerActionTypes) {
	      return root.headerReceive = factory(meiosis, headerActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerReceive = factory(require("meiosis"), require("./actionTypes"));
	  } else {
	    root.headerReceive = factory(root.meiosis, root.headerActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, HeaderAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      HeaderAction.case({
	        NewTodo: function NewTodo(title) {
	          model.newTodo = title;
	        },
	        SaveNewTodo: function SaveNewTodo(title) {
	          title = title.trim();
	
	          if (title) {
	            model.todos = todoStorage.saveTodo({ title: title });
	            model.newTodo = "";
	          } else {
	            return meiosis.REFUSE_PROPOSAL;
	          }
	        },
	        ClearNewTodo: function ClearNewTodo() {
	          model.newTodo = "";
	        }
	      }, proposal);
	
	      return model;
	    };
	  };
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisSnabbdom) {
	      return root.headerView = factory(meiosisSnabbdom);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerView = factory(require("meiosis-snabbdom"));
	  } else {
	    root.headerView = factory(root.meiosisSnabbdom);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisSnabbdom) {
	  return function (model, actions) {
	    var h = meiosisSnabbdom.renderer.h;
	
	    return h("header.header", [h("h1", "todos"), h("input.new-todo", { props: { placeholder: "What needs to be done?", autoFocus: true,
	        value: model.newTodo }, on: { keyup: actions.events.onNewTodoKeyUp } })]);
	  };
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(42), __webpack_require__(44), __webpack_require__(45), __webpack_require__(46)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, mainActions, mainReceive, mainView, todoItemComponent) {
	      return root.mainComponent = factory(meiosis, mainActions, mainReceive, mainView, todoItemComponent);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainComponent = factory(require("meiosis"), require("../../common/main/actions"), require("../../common/main/receive"), require("./view"), require("../todoItem/component"));
	  } else {
	    root.mainComponent = factory(root.meiosis, root.mainActions, root.mainReceive, root.mainView, root.todoItemComponent);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, mainActions, mainReceive, mainView, todoItemComponent) {
	  return function (todoStorage) {
	    var todoItem = todoItemComponent(todoStorage);
	
	    return meiosis.createComponent({
	      actions: mainActions,
	      view: mainView(todoItem),
	      receive: mainReceive(todoStorage)
	    });
	  };
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(43)], __WEBPACK_AMD_DEFINE_RESULT__ = function (mainActionTypes) {
	      return root.mainActions = factory(mainActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainActions = factory(require("./actionTypes"));
	  } else {
	    root.mainActions = factory(root.mainActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (MainAction) {
	  return function (propose) {
	    var actions = {
	      setAllCompleted: function setAllCompleted(completed) {
	        propose(MainAction.SetAllCompleted(completed));
	      }
	    };
	
	    actions.events = {
	      onToggleAllTodos: function onToggleAllTodos(evt) {
	        actions.setAllCompleted(evt.target.checked);
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.mainActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainActionTypes = factory(require("union-type"));
	  } else {
	    root.mainActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    SetAllCompleted: [Boolean]
	  });
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(43)], __WEBPACK_AMD_DEFINE_RESULT__ = function (mainActionTypes) {
	      return root.mainReceive = factory(mainActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainReceive = factory(require("./actionTypes"));
	  } else {
	    root.mainReceive = factory(root.mainActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (MainAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      MainAction.case({
	        SetAllCompleted: function SetAllCompleted(completed) {
	          model.todos = todoStorage.setAllCompleted(completed);
	        }
	      }, proposal);
	
	      return model;
	    };
	  };
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisSnabbdom) {
	      return root.mainView = factory(meiosisSnabbdom);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainView = factory(require("meiosis-snabbdom"));
	  } else {
	    root.mainView = factory(root.meiosisSnabbdom);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisSnabbdom) {
	  return function (todoItemComponent) {
	    return function (model, actions) {
	      var h = meiosisSnabbdom.renderer.h;
	
	      return h("section.main", [h("input.toggle-all", {
	        props: { type: "checkbox", checked: model.allCompleted },
	        on: { change: actions.events.onToggleAllTodos }
	      }), h("label", { attrs: { for: "toggle-all" } }, "Mark all as complete"), h("ul.todo-list", model.filteredTodos.map(todoItemComponent(model)))]);
	    };
	  };
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(47), __webpack_require__(49), __webpack_require__(50), __webpack_require__(52), __webpack_require__(53), __webpack_require__(54)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoItemActions, todoItemState, todoItemDisplay, todoItemView, todoItemReceive, todoEditComponent) {
	      return root.todoItemComponent = factory(meiosis, todoItemActions, todoItemState, todoItemDisplay, todoItemView, todoItemReceive, todoEditComponent);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemComponent = factory(require("meiosis"), require("../../common/todoItem/actions"), require("../../common/todoItem/state"), require("../../common/todoItem/display"), require("./view"), require("../../common/todoItem/receive"), require("../todoEdit/component"));
	  } else {
	    root.todoItemComponent = factory(root.meiosis, root.todoItemActions, root.todoItemState, root.todoItemDisplay, root.todoItemView, root.todoItemReceive, root.todoEditComponent);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, todoItemActions, todoItemState, todoItemDisplay, todoItemView, todoItemReceive, todoEditComponent) {
	  return function (todoStorage) {
	    var todoEdit = todoEditComponent(todoStorage);
	
	    return meiosis.createComponent({
	      actions: todoItemActions,
	      view: todoItemDisplay(todoItemState, todoItemView(todoEdit)),
	      receive: todoItemReceive(todoStorage)
	    });
	  };
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(48)], __WEBPACK_AMD_DEFINE_RESULT__ = function (todoItemActionTypes) {
	      return root.todoItemActions = factory(todoItemActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemActions = factory(require("./actionTypes"));
	  } else {
	    root.todoItemActions = factory(root.todoItemActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (ItemAction) {
	  return function (propose) {
	    var actions = {
	      setCompleted: function setCompleted(todoId, completed) {
	        propose(ItemAction.SetCompleted(todoId, completed));
	      },
	      editTodo: function editTodo(todo) {
	        propose(ItemAction.EditTodo(todo));
	      },
	      deleteTodoId: function deleteTodoId(todoId) {
	        propose(ItemAction.DeleteTodo(todoId));
	      }
	    };
	
	    actions.events = {
	      onToggleTodo: function onToggleTodo(todoId) {
	        return function (evt) {
	          actions.setCompleted(todoId, evt.target.checked);
	        };
	      },
	      onEditTodo: function onEditTodo(todo) {
	        return function (_evt) {
	          actions.editTodo(todo);
	        };
	      },
	      onDestroyTodo: function onDestroyTodo(todoId) {
	        return function (_evt) {
	          actions.deleteTodoId(todoId);
	        };
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.todoItemActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemActionTypes = factory(require("union-type"));
	  } else {
	    root.todoItemActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    SetCompleted: [Number, Boolean],
	    EditTodo: [Object],
	    DeleteTodo: [Number]
	  });
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoItemState = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemState = factory();
	  } else {
	    root.todoItemState = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return {
	    editing: function editing(model, todo) {
	      return todo.id === model.editTodo.id;
	    }
	  };
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(51)], __WEBPACK_AMD_DEFINE_RESULT__ = function (classnames) {
	      return root.todoItemDisplay = factory(classnames);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemDisplay = factory(require("classnames"));
	  } else {
	    root.todoItemDisplay = factory(root.classNames);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (classnames) {
	  var getTodoClasses = function getTodoClasses(state, model, todo) {
	    return classnames({
	      "completed": todo.completed,
	      "editing": state.editing(model, todo)
	    });
	  };
	
	  return function (state, view) {
	    return function (model, actions) {
	      return function (todo) {
	        var todoClasses = getTodoClasses(state, model, todo);
	        return view({ model: model, todo: todo, todoClasses: todoClasses }, actions);
	      };
	    };
	  };
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisSnabbdom) {
	      return root.todoItemView = factory(meiosisSnabbdom);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemView = factory(require("meiosis-snabbdom"));
	  } else {
	    root.todoItemView = factory(root.meiosisSnabbdom);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisSnabbdom) {
	  return function (todoEditComponent) {
	    return function (model, actions) {
	      var h = meiosisSnabbdom.renderer.h;
	
	      var todo = model.todo;
	      var events = actions.events;
	
	      return h("li", { attrs: { class: model.todoClasses } }, [h("div.view", [h("input.toggle", { props: { type: "checkbox", checked: todo.completed },
	        on: { change: events.onToggleTodo(todo.id) } }), h("label", { on: { dblclick: events.onEditTodo(todo) } }, todo.title), h("button.destroy", { on: { click: events.onDestroyTodo(todo.id) } })]), todoEditComponent(model)]);
	    };
	  };
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(48)], __WEBPACK_AMD_DEFINE_RESULT__ = function (todoItemActionTypes) {
	      return root.todoItemReceive = factory(todoItemActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemReceive = factory(require("./actionTypes"));
	  } else {
	    root.todoItemReceive = factory(root.todoItemActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (ItemAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      ItemAction.case({
	        SetCompleted: function SetCompleted(todoId, completed) {
	          model.todos = todoStorage.setCompleted(todoId, completed);
	        },
	        EditTodo: function EditTodo(todo) {
	          model.editTodo = todo;
	        },
	        DeleteTodo: function DeleteTodo(todoId) {
	          model.todos = todoStorage.deleteTodoId(todoId);
	        }
	      }, proposal);
	
	      return model;
	    };
	  };
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(55), __webpack_require__(57), __webpack_require__(58), __webpack_require__(59), __webpack_require__(49)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoEditActions, todoEditView, todoEditDisplay, todoEditReceive, todoItemState) {
	      return root.todoEditComponent = factory(meiosis, todoEditActions, todoEditView, todoEditDisplay, todoEditReceive, todoItemState);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditComponent = factory(require("meiosis"), require("../../common/todoEdit/actions"), require("./view"), require("../../common/todoEdit/display"), require("../../common/todoEdit/receive"), require("../../common/todoItem/state"));
	  } else {
	    root.todoEditComponent = factory(root.meiosis, root.todoEditActions, root.todoEditView, root.todoEditDisplay, root.todoEditReceive, root.todoItemState);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, todoEditActions, todoEditView, todoEditDisplay, todoEditReceive, todoItemState) {
	  return function (todoStorage) {
	    return meiosis.createComponent({
	      actions: todoEditActions,
	      view: todoEditDisplay(todoItemState, todoEditView),
	      receive: todoEditReceive(todoStorage)
	    });
	  };
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(56)], __WEBPACK_AMD_DEFINE_RESULT__ = function (todoEditActionTypes) {
	      return root.todoEditActions = factory(todoEditActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditActions = factory(require("./actionTypes"));
	  } else {
	    root.todoEditActions = factory(root.todoEditActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (EditAction) {
	  return function (propose) {
	    var actions = {
	      editingTodo: function editingTodo(title, id) {
	        propose(EditAction.EditingTodo({ title: title, id: id }));
	      },
	      saveTodo: function saveTodo(title, id) {
	        propose(EditAction.SaveTodo({ title: title, id: id }));
	      },
	      clearEdit: function clearEdit() {
	        propose(EditAction.ClearEdit());
	      }
	    };
	
	    var ENTER_KEY = 13;
	    var ESCAPE_KEY = 27;
	
	    actions.events = {
	      onEditKeyUp: function onEditKeyUp(todoId) {
	        return function (evt) {
	          if (evt.keyCode === ESCAPE_KEY || evt.which === ESCAPE_KEY) {
	            actions.clearEdit();
	          } else if (evt.keyCode === ENTER_KEY || evt.which === ENTER_KEY) {
	            actions.saveTodo(evt.target.value, todoId);
	          }
	        };
	      },
	      onEditChange: function onEditChange(todoId) {
	        return function (evt) {
	          actions.editingTodo(evt.target.value, todoId);
	        };
	      },
	      onEditBlur: function onEditBlur(todoId) {
	        return function (evt) {
	          actions.saveTodo(evt.target.value, todoId);
	        };
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.todoEditActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditActionTypes = factory(require("union-type"));
	  } else {
	    root.todoEditActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    EditingTodo: [Object],
	    SaveTodo: [Object],
	    ClearEdit: []
	  });
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisSnabbdom) {
	      return root.todoEditView = factory(meiosisSnabbdom);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditView = factory(require("meiosis-snabbdom"));
	  } else {
	    root.todoEditView = factory(root.meiosisSnabbdom);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisSnabbdom) {
	  var h = meiosisSnabbdom.renderer.h;
	
	  return {
	    todoEdit: function todoEdit(todo, actions) {
	      var events = actions.events;
	
	      return h("input.edit", {
	        props: { type: "text", value: todo.title },
	        on: {
	          keyup: events.onEditKeyUp(todo.id),
	          blur: events.onEditBlur(todo.id)
	        },
	        hook: {
	          insert: function insert(vnode) {
	            var element = vnode.elm;
	            element.focus();
	            element.selectionStart = element.value.length;
	          }
	        }
	      });
	    },
	
	    noTodoInput: function noTodoInput() {
	      return h("span");
	    }
	  };
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoEditDisplay = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditDisplay = factory();
	  } else {
	    root.todoEditDisplay = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return function (state, view) {
	    return function (model, actions) {
	      return state.editing(model.model, model.todo) ? view.todoEdit(model.model.editTodo, actions) : view.noTodoInput();
	    };
	  };
	});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(56)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoEditActionTypes) {
	      return root.todoEditReceive = factory(meiosis, todoEditActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditReceive = factory(require("meiosis"), require("./actionTypes"));
	  } else {
	    root.todoEditReceive = factory(root.meiosis, root.todoEditActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, EditAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      EditAction.case({
	        EditingTodo: function EditingTodo(todo) {
	          model.editTodo = todo;
	        },
	        SaveTodo: function SaveTodo(todo) {
	          var editing = todo.id === model.editTodo.id;
	          todo.title = todo.title.trim();
	
	          if (editing && todo.title) {
	            model.todos = todoStorage.saveTodo(todo);
	            model.editTodo = {};
	          } else {
	            return meiosis.REFUSE_PROPOSAL;
	          }
	        },
	        ClearEdit: function ClearEdit() {
	          model.editTodo = {};
	        }
	      }, proposal);
	
	      return model;
	    };
	  };
	});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(61), __webpack_require__(63), __webpack_require__(64), __webpack_require__(65)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, footerActions, footerView, footerReceive, footerReady) {
	      return root.footerComponent = factory(meiosis, footerActions, footerView, footerReceive, footerReady);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerComponent = factory(require("meiosis"), require("../../common/footer/actions"), require("./view"), require("../../common/footer/receive"), require("../../common/footer/ready"));
	  } else {
	    root.footerComponent = factory(root.meiosis, root.footerActions, root.footerView, root.footerReceive, root.footerReady);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, footerActions, footerView, footerReceive, footerReady) {
	  return function (todoStorage) {
	    return meiosis.createComponent({
	      actions: footerActions,
	      view: footerView,
	      receive: footerReceive(todoStorage),
	      ready: footerReady
	    });
	  };
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62)], __WEBPACK_AMD_DEFINE_RESULT__ = function (footerActionTypes) {
	      return root.footerActions = factory(footerActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerActions = factory(require("./actionTypes"));
	  } else {
	    root.footerActions = factory(root.footerActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (FooterAction) {
	  return function (propose) {
	    var actions = {
	      clearCompleted: function clearCompleted() {
	        propose(FooterAction.ClearCompleted());
	      },
	      filter: function filter(by) {
	        propose(FooterAction.Filter(by));
	      }
	    };
	
	    actions.events = {
	      onClearCompleted: function onClearCompleted(_evt) {
	        actions.clearCompleted();
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.footerActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerActionTypes = factory(require("union-type"));
	  } else {
	    root.footerActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    ClearCompleted: [],
	    Filter: [String]
	  });
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisSnabbdom) {
	      return root.footerView = factory(meiosisSnabbdom);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerView = factory(require("meiosis-snabbdom"));
	  } else {
	    root.footerView = factory(root.meiosisSnabbdom);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisSnabbdom) {
	  return function (model, actions) {
	    var h = meiosisSnabbdom.renderer.h;
	
	    var clearCompleted = model.clearCompleted ? h("button.clear-completed", { on: { click: actions.events.onClearCompleted } }, "Clear completed") : h("span");
	
	    return h("footer.footer", [h("span.todo-count", model.itemsLeftText), h("ul.filters", [h("li", [h("a", { props: { href: "#/" }, class: { selected: model.allSelected } }, "All")]), h("li", [h("a", { props: { href: "#/active" }, class: { selected: model.activeSelected } }, "Active")]), h("li", [h("a", { props: { href: "#/completed" }, class: { selected: model.completedSelected } }, "Completed")])]), clearCompleted]);
	  };
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(62)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, footerActionTypes) {
	      return root.footerReceive = factory(meiosis, footerActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerReceive = factory(require("meiosis"), require("./actionTypes"));
	  } else {
	    root.footerReceive = factory(root.meiosis, root.footerActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, FooterAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      FooterAction.case({
	        ClearCompleted: function ClearCompleted() {
	          model.todos = todoStorage.clearCompleted();
	        },
	        Filter: function Filter(by) {
	          if (by === model.filter) {
	            return meiosis.REFUSE_PROPOSAL;
	          }
	          model.todos = todoStorage.loadAll();
	          model.filter = by;
	        }
	      }, proposal);
	
	      return model;
	    };
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(66)], __WEBPACK_AMD_DEFINE_RESULT__ = function (History) {
	      return root.footerReady = factory(History);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerReady = factory(require("history"));
	  } else {
	    if (!root.footerReady) {
	      root.footerReady = factory(root.History);
	    }
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (History) {
	  return function (actions) {
	    var history = History.createBrowserHistory();
	
	    history.listen(function (location) {
	      var route = location.hash.split("/")[1] || "all";
	      actions.filter(route);
	    });
	  };
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.createPath = exports.parsePath = exports.locationsAreEqual = exports.createLocation = exports.createMemoryHistory = exports.createHashHistory = exports.createBrowserHistory = undefined;
	
	var _LocationUtils = __webpack_require__(67);
	
	Object.defineProperty(exports, 'createLocation', {
	  enumerable: true,
	  get: function get() {
	    return _LocationUtils.createLocation;
	  }
	});
	Object.defineProperty(exports, 'locationsAreEqual', {
	  enumerable: true,
	  get: function get() {
	    return _LocationUtils.locationsAreEqual;
	  }
	});
	
	var _PathUtils = __webpack_require__(69);
	
	Object.defineProperty(exports, 'parsePath', {
	  enumerable: true,
	  get: function get() {
	    return _PathUtils.parsePath;
	  }
	});
	Object.defineProperty(exports, 'createPath', {
	  enumerable: true,
	  get: function get() {
	    return _PathUtils.createPath;
	  }
	});
	
	var _createBrowserHistory2 = __webpack_require__(70);
	
	var _createBrowserHistory3 = _interopRequireDefault(_createBrowserHistory2);
	
	var _createHashHistory2 = __webpack_require__(77);
	
	var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);
	
	var _createMemoryHistory2 = __webpack_require__(78);
	
	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.createBrowserHistory = _createBrowserHistory3.default;
	exports.createHashHistory = _createHashHistory3.default;
	exports.createMemoryHistory = _createMemoryHistory3.default;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.locationsAreEqual = exports.createLocation = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _resolvePathname = __webpack_require__(68);
	
	var _resolvePathname2 = _interopRequireDefault(_resolvePathname);
	
	var _PathUtils = __webpack_require__(69);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
	  var location = void 0;
	  if (typeof path === 'string') {
	    // Two-arg form: push(path, state)
	    location = (0, _PathUtils.parsePath)(path);
	    location.state = state;
	  } else {
	    // One-arg form: push(location)
	    location = _extends({}, path);
	
	    if (location.pathname === undefined) location.pathname = '';
	
	    if (location.search) {
	      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
	    } else {
	      location.search = '';
	    }
	
	    if (location.hash) {
	      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
	    } else {
	      location.hash = '';
	    }
	
	    if (state !== undefined && location.state === undefined) location.state = state;
	  }
	
	  location.key = key;
	
	  if (currentLocation) {
	    // Resolve incomplete/relative pathname relative to current location.
	    if (!location.pathname) {
	      location.pathname = currentLocation.pathname;
	    } else if (location.pathname.charAt(0) !== '/') {
	      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
	    }
	  }
	
	  return location;
	};
	
	var looseEqual = function looseEqual(a, b) {
	  if (a == null) return a == b;
	
	  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);
	
	  if (typeofA !== typeofB) return false;
	
	  if (Array.isArray(a)) {
	    if (!Array.isArray(b) || a.length !== b.length) return false;
	
	    return a.every(function (item, index) {
	      return looseEqual(item, b[index]);
	    });
	  } else if (typeofA === 'object') {
	    var aKeys = Object.keys(a);
	    var bKeys = Object.keys(b);
	
	    if (aKeys.length !== bKeys.length) return false;
	
	    return aKeys.every(function (key) {
	      return looseEqual(a[key], b[key]);
	    });
	  }
	
	  return a === b;
	};
	
	var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && looseEqual(a.state, b.state);
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';
	
	var isAbsolute = function isAbsolute(pathname) {
	  return pathname.charAt(0) === '/';
	};
	
	// About 1.5x faster than the two-arg version of Array#splice()
	var spliceOne = function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
	    list[i] = list[k];
	  }list.pop();
	};
	
	// This implementation is based heavily on node's url.parse
	var resolvePathname = function resolvePathname(to) {
	  var from = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	  var toParts = to && to.split('/') || [];
	  var fromParts = from && from.split('/') || [];
	
	  var isToAbs = to && isAbsolute(to);
	  var isFromAbs = from && isAbsolute(from);
	  var mustEndAbs = isToAbs || isFromAbs;
	
	  if (to && isAbsolute(to)) {
	    // to is absolute
	    fromParts = toParts;
	  } else if (toParts.length) {
	    // to is relative, drop the filename
	    fromParts.pop();
	    fromParts = fromParts.concat(toParts);
	  }
	
	  if (!fromParts.length) return '/';
	
	  var hasTrailingSlash = void 0;
	  if (fromParts.length) {
	    var last = fromParts[fromParts.length - 1];
	    hasTrailingSlash = last === '.' || last === '..' || last === '';
	  } else {
	    hasTrailingSlash = false;
	  }
	
	  var up = 0;
	  for (var i = fromParts.length; i >= 0; i--) {
	    var part = fromParts[i];
	
	    if (part === '.') {
	      spliceOne(fromParts, i);
	    } else if (part === '..') {
	      spliceOne(fromParts, i);
	      up++;
	    } else if (up) {
	      spliceOne(fromParts, i);
	      up--;
	    }
	  }
	
	  if (!mustEndAbs) for (; up--; up) {
	    fromParts.unshift('..');
	  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');
	
	  var result = fromParts.join('/');
	
	  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';
	
	  return result;
	};
	
	module.exports = resolvePathname;

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
	  return path.charAt(0) === '/' ? path : '/' + path;
	};
	
	var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
	  return path.charAt(0) === '/' ? path.substr(1) : path;
	};
	
	var stripPrefix = exports.stripPrefix = function stripPrefix(path, prefix) {
	  return path.indexOf(prefix) === 0 ? path.substr(prefix.length) : path;
	};
	
	var parsePath = exports.parsePath = function parsePath(path) {
	  var pathname = path || '/';
	  var search = '';
	  var hash = '';
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substr(hashIndex);
	    pathname = pathname.substr(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substr(searchIndex);
	    pathname = pathname.substr(0, searchIndex);
	  }
	
	  return {
	    pathname: pathname,
	    search: search === '?' ? '' : search,
	    hash: hash === '#' ? '' : hash
	  };
	};
	
	var createPath = exports.createPath = function createPath(location) {
	  var pathname = location.pathname;
	  var search = location.search;
	  var hash = location.hash;
	
	
	  var path = pathname || '/';
	
	  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;
	
	  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;
	
	  return path;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _warning = __webpack_require__(72);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(73);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _LocationUtils = __webpack_require__(67);
	
	var _PathUtils = __webpack_require__(69);
	
	var _createTransitionManager = __webpack_require__(74);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _ExecutionEnvironment = __webpack_require__(75);
	
	var _DOMUtils = __webpack_require__(76);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PopStateEvent = 'popstate';
	var HashChangeEvent = 'hashchange';
	
	var getHistoryState = function getHistoryState() {
	  try {
	    return window.history.state || {};
	  } catch (e) {
	    // IE 11 sometimes throws when accessing window.history.state
	    // See https://github.com/mjackson/history/pull/289
	    return {};
	  }
	};
	
	/**
	 * Creates a history object that uses the HTML5 history API including
	 * pushState, replaceState, and the popstate event.
	 */
	var createBrowserHistory = function createBrowserHistory() {
	  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;
	
	  var globalHistory = window.history;
	  var canUseHistory = (0, _DOMUtils.supportsHistory)();
	  var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();
	
	  var _props$basename = props.basename;
	  var basename = _props$basename === undefined ? '' : _props$basename;
	  var _props$forceRefresh = props.forceRefresh;
	  var forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh;
	  var _props$getUserConfirm = props.getUserConfirmation;
	  var getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm;
	  var _props$keyLength = props.keyLength;
	  var keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;
	
	
	  var getDOMLocation = function getDOMLocation(historyState) {
	    var _ref = historyState || {};
	
	    var key = _ref.key;
	    var state = _ref.state;
	    var _window$location = window.location;
	    var pathname = _window$location.pathname;
	    var search = _window$location.search;
	    var hash = _window$location.hash;
	
	
	    var path = pathname + search + hash;
	
	    if (basename) path = (0, _PathUtils.stripPrefix)(path, basename);
	
	    return _extends({}, (0, _PathUtils.parsePath)(path), {
	      state: state,
	      key: key
	    });
	  };
	
	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength);
	  };
	
	  var transitionManager = (0, _createTransitionManager2.default)();
	
	  var setState = function setState(nextState) {
	    _extends(history, nextState);
	
	    history.length = globalHistory.length;
	
	    transitionManager.notifyListeners(history.location, history.action);
	  };
	
	  var handlePopState = function handlePopState(event) {
	    if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.
	
	    handlePop(getDOMLocation(event.state));
	  };
	
	  var handleHashChange = function handleHashChange() {
	    handlePop(getDOMLocation(getHistoryState()));
	  };
	
	  var forceNextPop = false;
	
	  var handlePop = function handlePop(location) {
	    if (forceNextPop) {
	      forceNextPop = false;
	      setState();
	    } else {
	      (function () {
	        var action = 'POP';
	
	        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	          if (ok) {
	            setState({ action: action, location: location });
	          } else {
	            revertPop(location);
	          }
	        });
	      })();
	    }
	  };
	
	  var revertPop = function revertPop(fromLocation) {
	    var toLocation = history.location;
	
	    // TODO: We could probably make this more reliable by
	    // keeping a list of keys we've seen in sessionStorage.
	    // Instead, we just default to 0 for keys we don't know.
	
	    var toIndex = allKeys.indexOf(toLocation.key);
	
	    if (toIndex === -1) toIndex = 0;
	
	    var fromIndex = allKeys.indexOf(fromLocation.key);
	
	    if (fromIndex === -1) fromIndex = 0;
	
	    var delta = toIndex - fromIndex;
	
	    if (delta) {
	      forceNextPop = true;
	      go(delta);
	    }
	  };
	
	  var initialLocation = getDOMLocation(getHistoryState());
	  var allKeys = [initialLocation.key];
	
	  // Public interface
	
	  var push = function push(path, state) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
	
	    var action = 'PUSH';
	    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);
	
	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;
	
	      var url = basename + (0, _PathUtils.createPath)(location);
	      var key = location.key;
	      var state = location.state;
	
	
	      if (canUseHistory) {
	        globalHistory.pushState({ key: key, state: state }, null, url);
	
	        if (forceRefresh) {
	          window.location.href = url;
	        } else {
	          var prevIndex = allKeys.indexOf(history.location.key);
	          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
	
	          nextKeys.push(location.key);
	          allKeys = nextKeys;
	
	          setState({ action: action, location: location });
	        }
	      } else {
	        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : void 0;
	
	        window.location.href = url;
	      }
	    });
	  };
	
	  var replace = function replace(path, state) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
	
	    var action = 'REPLACE';
	    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);
	
	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;
	
	      var url = basename + (0, _PathUtils.createPath)(location);
	      var key = location.key;
	      var state = location.state;
	
	
	      if (canUseHistory) {
	        globalHistory.replaceState({ key: key, state: state }, null, url);
	
	        if (forceRefresh) {
	          window.location.replace(url);
	        } else {
	          var prevIndex = allKeys.indexOf(history.location.key);
	
	          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
	
	          setState({ action: action, location: location });
	        }
	      } else {
	        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : void 0;
	
	        window.location.replace(url);
	      }
	    });
	  };
	
	  var go = function go(n) {
	    globalHistory.go(n);
	  };
	
	  var goBack = function goBack() {
	    return go(-1);
	  };
	
	  var goForward = function goForward() {
	    return go(1);
	  };
	
	  var listenerCount = 0;
	
	  var checkDOMListeners = function checkDOMListeners(delta) {
	    listenerCount += delta;
	
	    if (listenerCount === 1) {
	      (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);
	
	      if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
	    } else if (listenerCount === 0) {
	      (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);
	
	      if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
	    }
	  };
	
	  var isBlocked = false;
	
	  var block = function block() {
	    var prompt = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
	    var unblock = transitionManager.setPrompt(prompt);
	
	    if (!isBlocked) {
	      checkDOMListeners(1);
	      isBlocked = true;
	    }
	
	    return function () {
	      if (isBlocked) {
	        isBlocked = false;
	        checkDOMListeners(-1);
	      }
	
	      return unblock();
	    };
	  };
	
	  var listen = function listen(listener) {
	    var unlisten = transitionManager.appendListener(listener);
	    checkDOMListeners(1);
	
	    return function () {
	      checkDOMListeners(-1);
	      return unlisten();
	    };
	  };
	
	  var history = {
	    length: globalHistory.length,
	    action: 'POP',
	    location: initialLocation,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    block: block,
	    listen: listen
	  };
	
	  return history;
	};
	
	exports.default = createBrowserHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ },
/* 71 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _warning = __webpack_require__(72);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createTransitionManager = function createTransitionManager() {
	  var prompt = null;
	
	  var setPrompt = function setPrompt(nextPrompt) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time') : void 0;
	
	    prompt = nextPrompt;
	
	    return function () {
	      if (prompt === nextPrompt) prompt = null;
	    };
	  };
	
	  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
	    // TODO: If another transition starts while we're still confirming
	    // the previous one, we may end up in a weird state. Figure out the
	    // best way to handle this.
	    if (prompt != null) {
	      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;
	
	      if (typeof result === 'string') {
	        if (typeof getUserConfirmation === 'function') {
	          getUserConfirmation(result, callback);
	        } else {
	          process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;
	
	          callback(true);
	        }
	      } else {
	        // Return false from a transition hook to cancel the transition.
	        callback(result !== false);
	      }
	    } else {
	      callback(true);
	    }
	  };
	
	  var listeners = [];
	
	  var appendListener = function appendListener(listener) {
	    listeners.push(listener);
	
	    return function () {
	      listeners = listeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };
	
	  var notifyListeners = function notifyListeners() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return listeners.forEach(function (listener) {
	      return listener.apply(undefined, args);
	    });
	  };
	
	  return {
	    setPrompt: setPrompt,
	    confirmTransitionTo: confirmTransitionTo,
	    appendListener: appendListener,
	    notifyListeners: notifyListeners
	  };
	};
	
	exports.default = createTransitionManager;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
	  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
	};
	
	var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
	  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
	};
	
	var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
	  return callback(window.confirm(message));
	}; // eslint-disable-line no-alert
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
	 */
	var supportsHistory = exports.supportsHistory = function supportsHistory() {
	  var ua = window.navigator.userAgent;
	
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
	
	  return window.history && 'pushState' in window.history;
	};
	
	/**
	 * Returns true if browser fires popstate on hash change.
	 * IE10 and IE11 do not.
	 */
	var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
	  return window.navigator.userAgent.indexOf('Trident') === -1;
	};
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
	  return window.navigator.userAgent.indexOf('Firefox') === -1;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _warning = __webpack_require__(72);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(73);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _LocationUtils = __webpack_require__(67);
	
	var _PathUtils = __webpack_require__(69);
	
	var _createTransitionManager = __webpack_require__(74);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _ExecutionEnvironment = __webpack_require__(75);
	
	var _DOMUtils = __webpack_require__(76);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HashChangeEvent = 'hashchange';
	
	var HashPathCoders = {
	  hashbang: {
	    encodePath: function encodePath(path) {
	      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
	    },
	    decodePath: function decodePath(path) {
	      return path.charAt(0) === '!' ? path.substr(1) : path;
	    }
	  },
	  noslash: {
	    encodePath: _PathUtils.stripLeadingSlash,
	    decodePath: _PathUtils.addLeadingSlash
	  },
	  slash: {
	    encodePath: _PathUtils.addLeadingSlash,
	    decodePath: _PathUtils.addLeadingSlash
	  }
	};
	
	var getHashPath = function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var hashIndex = href.indexOf('#');
	  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
	};
	
	var pushHashPath = function pushHashPath(path) {
	  return window.location.hash = path;
	};
	
	var replaceHashPath = function replaceHashPath(path) {
	  var hashIndex = window.location.href.indexOf('#');
	
	  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
	};
	
	var createHashHistory = function createHashHistory() {
	  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Hash history needs a DOM') : (0, _invariant2.default)(false) : void 0;
	
	  var globalHistory = window.history;
	  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();
	
	  var _props$basename = props.basename;
	  var basename = _props$basename === undefined ? '' : _props$basename;
	  var _props$getUserConfirm = props.getUserConfirmation;
	  var getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm;
	  var _props$hashType = props.hashType;
	  var hashType = _props$hashType === undefined ? 'slash' : _props$hashType;
	  var _HashPathCoders$hashT = HashPathCoders[hashType];
	  var encodePath = _HashPathCoders$hashT.encodePath;
	  var decodePath = _HashPathCoders$hashT.decodePath;
	
	
	  var getDOMLocation = function getDOMLocation() {
	    var path = decodePath(getHashPath());
	
	    if (basename) path = (0, _PathUtils.stripPrefix)(path, basename);
	
	    return (0, _PathUtils.parsePath)(path);
	  };
	
	  var transitionManager = (0, _createTransitionManager2.default)();
	
	  var setState = function setState(nextState) {
	    _extends(history, nextState);
	
	    history.length = globalHistory.length;
	
	    transitionManager.notifyListeners(history.location, history.action);
	  };
	
	  var forceNextPop = false;
	  var ignorePath = null;
	
	  var handleHashChange = function handleHashChange() {
	    var path = getHashPath();
	    var encodedPath = encodePath(path);
	
	    if (path !== encodedPath) {
	      // Ensure we always have a properly-encoded hash.
	      replaceHashPath(encodedPath);
	    } else {
	      var location = getDOMLocation();
	      var prevLocation = history.location;
	
	      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.
	
	      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.
	
	      ignorePath = null;
	
	      handlePop(location);
	    }
	  };
	
	  var handlePop = function handlePop(location) {
	    if (forceNextPop) {
	      forceNextPop = false;
	      setState();
	    } else {
	      (function () {
	        var action = 'POP';
	
	        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	          if (ok) {
	            setState({ action: action, location: location });
	          } else {
	            revertPop(location);
	          }
	        });
	      })();
	    }
	  };
	
	  var revertPop = function revertPop(fromLocation) {
	    var toLocation = history.location;
	
	    // TODO: We could probably make this more reliable by
	    // keeping a list of paths we've seen in sessionStorage.
	    // Instead, we just default to 0 for paths we don't know.
	
	    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));
	
	    if (toIndex === -1) toIndex = 0;
	
	    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));
	
	    if (fromIndex === -1) fromIndex = 0;
	
	    var delta = toIndex - fromIndex;
	
	    if (delta) {
	      forceNextPop = true;
	      go(delta);
	    }
	  };
	
	  // Ensure the hash is encoded properly before doing anything else.
	  var path = getHashPath();
	  var encodedPath = encodePath(path);
	
	  if (path !== encodedPath) replaceHashPath(encodedPath);
	
	  var initialLocation = getDOMLocation();
	  var allPaths = [(0, _PathUtils.createPath)(initialLocation)];
	
	  // Public interface
	
	  var push = function push(path, state) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored') : void 0;
	
	    var action = 'PUSH';
	    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);
	
	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;
	
	      var path = (0, _PathUtils.createPath)(location);
	      var encodedPath = encodePath(basename + path);
	      var hashChanged = getHashPath() !== encodedPath;
	
	      if (hashChanged) {
	        // We cannot tell if a hashchange was caused by a PUSH, so we'd
	        // rather setState here and ignore the hashchange. The caveat here
	        // is that other hash histories in the page will consider it a POP.
	        ignorePath = path;
	        pushHashPath(encodedPath);
	
	        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
	        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
	
	        nextPaths.push(path);
	        allPaths = nextPaths;
	
	        setState({ action: action, location: location });
	      } else {
	        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack') : void 0;
	
	        setState();
	      }
	    });
	  };
	
	  var replace = function replace(path, state) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored') : void 0;
	
	    var action = 'REPLACE';
	    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);
	
	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;
	
	      var path = (0, _PathUtils.createPath)(location);
	      var encodedPath = encodePath(basename + path);
	      var hashChanged = getHashPath() !== encodedPath;
	
	      if (hashChanged) {
	        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
	        // rather setState here and ignore the hashchange. The caveat here
	        // is that other hash histories in the page will consider it a POP.
	        ignorePath = path;
	        replaceHashPath(encodedPath);
	      }
	
	      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));
	
	      if (prevIndex !== -1) allPaths[prevIndex] = path;
	
	      setState({ action: action, location: location });
	    });
	  };
	
	  var go = function go(n) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;
	
	    globalHistory.go(n);
	  };
	
	  var goBack = function goBack() {
	    return go(-1);
	  };
	
	  var goForward = function goForward() {
	    return go(1);
	  };
	
	  var listenerCount = 0;
	
	  var checkDOMListeners = function checkDOMListeners(delta) {
	    listenerCount += delta;
	
	    if (listenerCount === 1) {
	      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
	    } else if (listenerCount === 0) {
	      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
	    }
	  };
	
	  var isBlocked = false;
	
	  var block = function block() {
	    var prompt = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
	    var unblock = transitionManager.setPrompt(prompt);
	
	    if (!isBlocked) {
	      checkDOMListeners(1);
	      isBlocked = true;
	    }
	
	    return function () {
	      if (isBlocked) {
	        isBlocked = false;
	        checkDOMListeners(-1);
	      }
	
	      return unblock();
	    };
	  };
	
	  var listen = function listen(listener) {
	    var unlisten = transitionManager.appendListener(listener);
	    checkDOMListeners(1);
	
	    return function () {
	      checkDOMListeners(-1);
	      return unlisten();
	    };
	  };
	
	  var history = {
	    length: globalHistory.length,
	    action: 'POP',
	    location: initialLocation,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    block: block,
	    listen: listen
	  };
	
	  return history;
	};
	
	exports.default = createHashHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _warning = __webpack_require__(72);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _LocationUtils = __webpack_require__(67);
	
	var _createTransitionManager = __webpack_require__(74);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var clamp = function clamp(n, lowerBound, upperBound) {
	  return Math.min(Math.max(n, lowerBound), upperBound);
	};
	
	/**
	 * Creates a history object that stores locations in memory.
	 */
	var createMemoryHistory = function createMemoryHistory() {
	  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getUserConfirmation = props.getUserConfirmation;
	  var _props$initialEntries = props.initialEntries;
	  var initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries;
	  var _props$initialIndex = props.initialIndex;
	  var initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex;
	  var _props$keyLength = props.keyLength;
	  var keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;
	
	
	  var transitionManager = (0, _createTransitionManager2.default)();
	
	  var setState = function setState(nextState) {
	    _extends(history, nextState);
	
	    history.length = history.entries.length;
	
	    transitionManager.notifyListeners(history.location, history.action);
	  };
	
	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength);
	  };
	
	  var index = clamp(initialIndex, 0, initialEntries.length - 1);
	  var entries = initialEntries.map(function (entry, index) {
	    return typeof entry === 'string' ? (0, _LocationUtils.createLocation)(entry, undefined, index ? createKey() : undefined) : (0, _LocationUtils.createLocation)(entry, undefined, index ? entry.key || createKey() : undefined);
	  });
	
	  // Public interface
	
	  var push = function push(path, state) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
	
	    var action = 'PUSH';
	    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);
	
	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;
	
	      var prevIndex = history.index;
	      var nextIndex = prevIndex + 1;
	
	      var nextEntries = history.entries.slice(0);
	      if (nextEntries.length > nextIndex) {
	        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
	      } else {
	        nextEntries.push(location);
	      }
	
	      setState({
	        action: action,
	        location: location,
	        index: nextIndex,
	        entries: nextEntries
	      });
	    });
	  };
	
	  var replace = function replace(path, state) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
	
	    var action = 'REPLACE';
	    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);
	
	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;
	
	      history.entries[history.index] = location;
	
	      setState({ action: action, location: location });
	    });
	  };
	
	  var go = function go(n) {
	    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
	
	    var action = 'POP';
	    var location = history.entries[nextIndex];
	
	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (ok) {
	        setState({
	          action: action,
	          location: location,
	          index: nextIndex
	        });
	      } else {
	        // Mimic the behavior of DOM histories by
	        // causing a render after a cancelled POP.
	        setState();
	      }
	    });
	  };
	
	  var goBack = function goBack() {
	    return go(-1);
	  };
	
	  var goForward = function goForward() {
	    return go(1);
	  };
	
	  var canGo = function canGo(n) {
	    var nextIndex = history.index + n;
	    return nextIndex >= 0 && nextIndex < history.entries.length;
	  };
	
	  var block = function block() {
	    var prompt = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	    return transitionManager.setPrompt(prompt);
	  };
	
	  var listen = function listen(listener) {
	    return transitionManager.appendListener(listener);
	  };
	
	  var history = {
	    length: entries.length,
	    action: 'POP',
	    location: entries[index],
	    index: index,
	    entries: entries,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    canGo: canGo,
	    block: block,
	    listen: listen
	  };
	
	  return history;
	};
	
	exports.default = createMemoryHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoStorage = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoStorage = factory();
	  } else {
	    root.todoStorage = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  var STORAGE_KEY = "meiosis-todomvc";
	
	  var findIndex = function findIndex(todos, todoId) {
	    var index = -1;
	
	    for (var i = 0, t = todos.length; i < t; i++) {
	      if (todos[i].id === todoId) {
	        index = i;
	        break;
	      }
	    }
	    return index;
	  };
	
	  var replaceTodoAtIndex = function replaceTodoAtIndex(todos, todo, index) {
	    return todos.slice(0, index).concat([todo]).concat(todos.slice(index + 1));
	  };
	
	  var deleteTodoAtIndex = function deleteTodoAtIndex(todos, index) {
	    return todos.slice(0, index).concat(todos.slice(index + 1));
	  };
	
	  var todoStorage = {
	    loadAll: function loadAll() {
	      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
	    },
	    saveAll: function saveAll(todos) {
	      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	      return todos;
	    },
	    saveTodo: function saveTodo(todo) {
	      var todos = this.loadAll();
	      var id = parseInt(todo.id, 10);
	
	      if (id > 0) {
	        var index = findIndex(todos, id);
	        todo.completed = todos[index].completed;
	        todos = replaceTodoAtIndex(todos, todo, index);
	      } else {
	        todos = todos.concat([{ title: todo.title, id: new Date().getTime(), completed: false }]);
	      }
	      return this.saveAll(todos);
	    },
	    deleteTodoId: function deleteTodoId(todoId) {
	      var todos = this.loadAll();
	      var index = findIndex(todos, todoId);
	
	      if (index >= 0) {
	        todos = deleteTodoAtIndex(todos, index);
	        this.saveAll(todos);
	      }
	      return todos;
	    },
	    setCompleted: function setCompleted(id, completed) {
	      var todos = this.loadAll();
	      var index = findIndex(todos, id);
	
	      if (index >= 0) {
	        var todo = todos[index];
	        todo.completed = completed;
	        todos = replaceTodoAtIndex(todos, todo, index);
	        this.saveAll(todos);
	      }
	      return todos;
	    },
	    setAllCompleted: function setAllCompleted(completed) {
	      var todos = this.loadAll();
	      todos.forEach(function (todo) {
	        todo.completed = completed;
	      });
	      this.saveAll(todos);
	      return todos;
	    },
	    clearCompleted: function clearCompleted() {
	      var todos = this.loadAll();
	      var updatedTodos = [];
	
	      for (var i = 0, t = todos.length; i < t; i++) {
	        if (!todos[i].completed) {
	          updatedTodos.push(todos[i]);
	        }
	      }
	      return this.saveAll(updatedTodos);
	    }
	  };
	
	  return todoStorage;
	});

/***/ }
/******/ ]);
//# sourceMappingURL=generated-app.js.map