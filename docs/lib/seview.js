(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.seview = {})));
}(this, (function (exports) { 'use strict';

  var isString = function (x) { return typeof x === "string"; };
  var isNumber = function (x) { return typeof x === "number"; };
  var isBoolean = function (x) { return typeof x === "boolean"; };
  var isArray = function (x) { return Array.isArray(x); };
  var isIterable = function (x) { return x != null && typeof x[Symbol.iterator] === "function" && !isString(x); };
  var isObject = function (x) { return x != null && typeof x === "object" && !isArray(x) && !isIterable(x); };

  var getString = function (value) {
    var result = undefined;

    if (isString(value) && value.length > 0) {
      result = value;
    }
    else if (isNumber(value)) {
      result = String(value);
    }
    else if (isBoolean(value) && value) {
      result = String(value);
    }
    return result
  };

  var get = function (object, path) { return object == null
      ? undefined
      : path.length === 1
        ? object[path[0]]
        : get(object[path[0]], path.slice(1)); };

  var set = function (object, path, value) {
    if (path.length === 1) {
      if (isObject(object[path[0]])) {
        Object.assign(object[path[0]], value);
      }
      else {
        object[path[0]] = value;
      }
    }
    else {
      if (object[[path[0]]] == null) {
        object[[path[0]]] = {};
      }
      set(object[path[0]], path.slice(1), value);
    }
    return object
  };

  // Credit: JSnoX https://github.com/af/JSnoX/blob/master/jsnox.js

  // matches "input", "input:text"
  var tagTypeRegex = /^([A-Za-z0-9-]+)(?::([a-z]+))?/;

  // matches "#id", ".class", "[name=value]", "[required]"
  var propsRegex = /((?:#|\.|@)[\w-]+)|(\[.*?\])/g;

  // matches "[name=value]" or "[required]"
  var attrRegex = /\[([\w-]+)(?:=([^\]]+))?\]/;

  /*
  returns tag properties: for example, "input:password#duck.quack.yellow[name=pwd][required]"
  {
    tag: "input",
    className: "quack yellow",
    attrs: { type: "password", id: "duck", name: "pwd", required: true }
  }
  */
  var getTagProperties = function (selector, className) {
    if ( className === void 0 ) className = "className";

    var result = {};

    var tagType = selector.match(tagTypeRegex);

    // Use div by default
    if (!tagType) {
      tagType = ["div", "div"];
    }
    result.tag = tagType[1];

    if (tagType[2]) {
      result.attrs = { type: tagType[2] };
    }

    var tagProps = selector.match(propsRegex);

    if (tagProps) {
      var classes =[];

      tagProps.forEach(function (tagProp) {
        var ch = tagProp[0];
        var prop = tagProp.slice(1);

        if (ch === "#") {
          set(result, ["attrs", "id"], prop);
        }
        else if (ch === ".") {
          classes.push(prop);
        }
        else if (ch === "[") {
          var attrs = tagProp.match(attrRegex);
          set(result, ["attrs", attrs[1]], (attrs[2] || true));
        }
      });

      if (classes.length > 0) {
        set(result, ["attrs", className], classes.join(" "));
      }
    }

    return result
  };

  /*
  returns node definition, expanding on the above tag properties and adding to obtain:
  {
    tag: "input",
    className: "quack yellow",
    attrs: { type: "password", id: "duck", name: "pwd", required: true, onClick: ... },
    children: [ { tag: ... }, "text", ... ]
  }
  */
  var processChildren = function (rest, result) {
    if ( result === void 0 ) result = [];

    rest.forEach(function (child) {
      if (isIterable(child)) {
        child = Array.from(child);
      }
      // Text node
      if (getString(child)) {
        result.push(getString(child));
      }
      else if (isArray(child)) {
        // Nested array
        if (isArray(child[0]) || isIterable(child[0])) {
          processChildren(child, result);
        }
        // Regular node
        else if (child.length > 0) {
          result.push(nodeDef(child));
        }
      }
    });
    return result
  };

  var nodeDef = function (node, options) {
    if ( options === void 0 ) options = { className: "className" };

    // Tag
    var rest = node[2];
    var varArgsLimit = 3;

    // Process tag
    var result = isString(node[0])
      ? getTagProperties(node[0], options.className)
      : { tag: node[0] };

    // Process attrs
    if (isObject(node[1])) {
      var attrs = node[1];

      // Process className
      if (attrs[options.className] !== undefined) {
        var classAttr = attrs[options.className];
        delete attrs[options.className];

        var addClasses = [];
        if (isString(classAttr)) {
          addClasses = classAttr.split(" ");
        }
        else if (isObject(classAttr)) {
          Object.keys(classAttr).forEach(function (key) {
            if (classAttr[key]) {
              addClasses.push(key);
            }
          });
        }
        if (addClasses.length > 0) {
          var existingClassName = get(result, ["attrs", options.className]);
          var addClassName = addClasses.join(" ");
          set(result, ["attrs", options.className],
            (existingClassName ? existingClassName + " " : "")
            + addClassName
          );
        }
      }

      // Add remaining attributes
      if (Object.keys(attrs).length > 0) {
        if (result.attrs === undefined) {
          result.attrs = attrs;
        }
        else {
          result.attrs = Object.assign(result.attrs, attrs);
        }
      }
    }
    // No attrs, use second argument as rest
    else {
      rest = node[1];
      varArgsLimit = 2;
    }

    // Process children: varargs
    if (node.length > varArgsLimit) {
      result.children = processChildren(node.slice(varArgsLimit - 1));
    }
    // Process children: one child arg
    else {
      // Text node
      if (getString(rest)) {
        result.children = [ getString(rest) ];
      }

      if (isIterable(rest)) {
        rest = Array.from(rest);
      }
      if (isArray(rest)) {
        // Array of children vs One child node
        result.children = processChildren( isArray(rest[0]) ? rest : [ rest ] );
      }
    }
    return result
  };

  var transformNodeDef = function (transform, def) {
    if (isArray(def.children) || isIterable(def.children)) {
      var result = [];
      def.children.forEach(function (child) {
        result.push(isString(child) ? transform(child) : transformNodeDef(transform, child));
      });
      def.children = result;
    }
    return transform(def)
  };

  var sv = function (transform, options) { return function (node) {
    var def = nodeDef(node, options);
    return transformNodeDef(transform, def)
  }; };

  exports.sv = sv;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
