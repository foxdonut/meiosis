(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.b = factory());
}(this, (function () { 'use strict';

  var pseudos = [
    ':active',
    ':any',
    ':checked',
    ':default',
    ':disabled',
    ':empty',
    ':enabled',
    ':first',
    ':first-child',
    ':first-of-type',
    ':fullscreen',
    ':focus',
    ':hover',
    ':indeterminate',
    ':in-range',
    ':invalid',
    ':last-child',
    ':last-of-type',
    ':left',
    ':link',
    ':only-child',
    ':only-of-type',
    ':optional',
    ':out-of-range',
    ':read-only',
    ':read-write',
    ':required',
    ':right',
    ':root',
    ':scope',
    ':target',
    ':valid',
    ':visited',

    // With value
    ':dir',
    ':lang',
    ':not',
    ':nth-child',
    ':nth-last-child',
    ':nth-last-of-type',
    ':nth-of-type',

    // Elements
    '::after',
    '::before',
    '::first-letter',
    '::first-line',
    '::selection',
    '::backdrop',
    '::placeholder',
    '::marker',
    '::spelling-error',
    '::grammar-error'
  ];

  var popular = {
    ai : 'alignItems',
    b  : 'bottom',
    bc : 'backgroundColor',
    br : 'borderRadius',
    bs : 'boxShadow',
    c  : 'color',
    d  : 'display',
    f  : 'float',
    fd : 'flexDirection',
    ff : 'fontFamily',
    fs : 'fontSize',
    h  : 'height',
    jc : 'justifyContent',
    l  : 'left',
    lh : 'lineHeight',
    ls : 'letterSpacing',
    m  : 'margin',
    mb : 'marginBottom',
    ml : 'marginLeft',
    mr : 'marginRight',
    mt : 'marginTop',
    o  : 'opacity',
    p  : 'padding',
    pb : 'paddingBottom',
    pl : 'paddingLeft',
    pr : 'paddingRight',
    pt : 'paddingTop',
    r  : 'right',
    t  : 'top',
    ta : 'textAlign',
    td : 'textDecoration',
    tt : 'textTransform',
    w  : 'width'
  };

  var cssProperties = ['float'].concat(Object.keys(
    typeof document === 'undefined'
      ? {}
      : findWidth(document.documentElement.style)
  ).filter(function (p) { return p.indexOf('-') === -1 && p !== 'length'; }));

  function findWidth(obj) {
    return obj
      ? obj.hasOwnProperty('width')
        ? obj
        : findWidth(Object.getPrototypeOf(obj))
      : {}
  }

  var memoize = function (fn, cache) {
    if ( cache === void 0 ) cache = {};

    return function (item) { return item in cache
      ? cache[item]
      : cache[item] = fn(item); };
  };

  function add(style, prop, value) {
    if (prop in style)
      { add(style, '!' + prop, value); }
    else
      { style[prop] = value; }
  }

  var vendorMap = Object.create(null, {});
  var vendorValuePrefix = Object.create(null, {});

  var vendorRegex = /^(o|O|ms|MS|Ms|moz|Moz|webkit|Webkit|WebKit)([A-Z])/;

  var appendPx = memoize(function (prop) {
    var el = document.createElement('div');

    try {
      el.style[prop] = '1px';
      el.style.setProperty(prop, '1px');
      return el.style[prop].slice(-3) === '1px' ? 'px' : ''
    } catch (err) {
      return ''
    }
  }, {
    flex: '',
    boxShadow: 'px',
    border: 'px'
  });

  function lowercaseFirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1)
  }

  function sanitize(styles) {
    return Object.keys(styles).reduce(function (acc, key) {
      var value = styles[key];

      if (!value && value !== 0 && value !== '')
        { return acc }

      if (key === 'content' && value.charAt(0) !== '"')
        { acc[key] = '"' + value + '"'; }
      else
        { acc[key] = formatValue(key, value); }

      return acc
    }, {})
  }

  function assign(obj, obj2) {
    for (var key in obj2) {
      if (obj2.hasOwnProperty(key))
        { obj[key] = obj2[key]; }
    }
  }

  function hyphenToCamelCase(hyphen) {
    return hyphen.slice(hyphen.charAt(0) === '-' ? 1 : 0).replace(/-([a-z])/g, function(match) {
      return match[1].toUpperCase()
    })
  }

  function camelCaseToHyphen(camelCase) {
    return camelCase.replace(/(\B[A-Z])/g, '-$1').toLowerCase()
  }

  function initials(camelCase) {
    return camelCase.charAt(0) + (camelCase.match(/([A-Z])/g) || []).join('').toLowerCase()
  }

  function objectToRules(style, selector, suffix, single) {
    if ( suffix === void 0 ) suffix = '';

    var base = {};

    var rules = [];

    Object.keys(style).forEach(function (prop) {
      if (prop.charAt(0) === '@')
        { rules.push(prop + '{' + objectToRules(style[prop], selector, suffix, single) + '}'); }
      else if (typeof style[prop] === 'object')
        { rules = rules.concat(objectToRules(style[prop], selector, suffix + prop, single)); }
      else
        { base[prop] = style[prop]; }
    });

    if (Object.keys(base).length) {
      rules.unshift(
        ((single || (suffix.charAt(0) === ' ') ? '' : '&') + '&' + suffix).replace(/&/g, selector) +
        '{' + stylesToCss(base) + '}'
      );
    }

    return rules
  }

  var selectorSplit = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

  function stylesToCss(style) {
    return Object.keys(style).reduce(function (acc, prop) { return acc + propToString(prop.replace(/!/g, ''), style[prop]); }
    , '')
  }

  function propToString(prop, value) {
    prop = prop in vendorMap ? vendorMap[prop] : prop;
    return (vendorRegex.test(prop) ? '-' : '')
      + (prop.charAt(0) === '-' && prop.charAt(1) === '-'
        ? prop
        : camelCaseToHyphen(prop)
      )
      + ':'
      + value
      + ';'
  }

  function formatValue(key, value) {
    return value in vendorValuePrefix
      ? vendorValuePrefix[value]
      : addPx(key, value)
  }

  function addPx(key, value) {
    return value + (isNaN(value) ? '' : appendPx(key))
  }

  var styleSheet = typeof document === 'object' && document.createElement('style');
  styleSheet && document.head && document.head.appendChild(styleSheet);

  var sheet = styleSheet && styleSheet.sheet;

  var debug = false;
  var classes = Object.create(null, {});
  var rules = [];
  var count = 0;

  var classPrefix = 'b' + ('000' + ((Math.random() * 46656) | 0).toString(36)).slice(-3) +
                      ('000' + ((Math.random() * 46656) | 0).toString(36)).slice(-3);

  function setDebug(d) {
    debug = d;
  }

  function getSheet() {
    var content = rules.join('');
    rules = [];
    classes = Object.create(null, {});
    count = 0;
    return content
  }

  function getRules() {
    return rules
  }

  function insert(rule, index) {
    rules.push(rule);

    if (debug)
      { return styleSheet.textContent = rules.join('\n') }

    sheet && sheet.insertRule(rule, arguments.length > 1
      ? index
      : sheet.cssRules.length
    );
  }

  function createClass(style) {
    var json = JSON.stringify(style);

    if (json in classes)
      { return classes[json] }

    var className = classPrefix + (++count)
        , rules = objectToRules(style, '.' + className);

    for (var i = 0; i < rules.length; i++)
      { insert(rules[i]); }

    classes[json] = className;

    return className
  }

  /* eslint no-invalid-this: 0 */

  var shorts = Object.create(null);

  function bss(input, value) {
    var b = chain(bss);
    input && assign(b.__style, parse.apply(null, arguments));
    return b
  }

  function setProp(prop, value) {
    Object.defineProperty(bss, prop, {
      configurable: true,
      value: value
    });
  }

  Object.defineProperties(bss, {
    __style: {
      configurable: true,
      writable: true,
      value: {}
    },
    valueOf: {
      configurable: true,
      writable: true,
      value: function ValueOf() {
        return '.' + this.class
      }
    }
  });

  setProp('setDebug', setDebug);

  setProp('$keyframes', keyframes);
  setProp('$media', $media);
  setProp('$import', $import);
  setProp('$nest', $nest);
  setProp('getSheet', getSheet);
  setProp('getRules', getRules);
  setProp('helper', helper);
  setProp('css', css);
  setProp('classPrefix', classPrefix);

  function chain(instance) {
    var newInstance = Object.create(bss, {
      __style: {
        value: instance.__style
      },
      style: {
        enumerable: true,
        get: function() {
          var this$1 = this;

          return Object.keys(this.__style).reduce(function (acc, key) {
            if (typeof this$1.__style[key] === 'number' || typeof this$1.__style[key] === 'string')
              { acc[key.replace(/^!/, '')] = this$1.__style[key]; }
            return acc
          }, {})
        }
      }
    });

    if (instance === bss)
      { bss.__style = {}; }

    return newInstance
  }

  cssProperties.forEach(function (prop) {
    var vendor = prop.match(vendorRegex);
    if (vendor) {
      var unprefixed = lowercaseFirst(prop.replace(vendorRegex, '$2'));
      if (cssProperties.indexOf(unprefixed) === -1) {
        if (unprefixed === 'flexDirection')
          { vendorValuePrefix.flex = '-' + vendor[1].toLowerCase() + '-flex'; }

        vendorMap[unprefixed] = prop;
        setProp(unprefixed, setter(prop));
        setProp(short(unprefixed), bss[unprefixed]);
        return
      }
    }

    setProp(prop, setter(prop));
    setProp(short(prop), bss[prop]);
  });

  setProp('content', function Content(arg) {
    this.__style.content = '"' + arg + '"';
    return chain(this)
  });

  Object.defineProperty(bss, 'class', {
    set: function(value) {
      this.__class = value;
    },
    get: function() {
      return this.__class || createClass(this.__style)
    }
  });

  function $media(value, style) {
    if (value)
      { add(this.__style, '@media ' + value, parse(style)); }

    return chain(this)
  }

  function $import(value) {
    if (value)
      { insert('@import ' + value + ';', 0); }

    return chain(this)
  }

  function $nest(selector, properties) {
    var this$1 = this;

    if (arguments.length === 1)
      { Object.keys(selector).forEach(function (x) { return addNest(this$1.__style, x, selector[x]); }); }
    else if (selector)
      { addNest(this.__style, selector, properties); }

    return chain(this)
  }

  function addNest(style, selector, properties) {
    add(
      style,
      selector.split(selectorSplit).map(function (x) {
        x = x.trim();
        return (x.charAt(0) === ':' || x.charAt(0) === '[' ? '' : ' ') + x
      }).join(',&'),
      parse(properties)
    );
  }

  pseudos.forEach(function (name) { return setProp('$' + hyphenToCamelCase(name.replace(/:/g, '')), function Pseudo(value, b) {
      if (value || b)
        { add(this.__style, name + (b ? '(' + value + ')' : ''), parse(b || value)); }
      return chain(this)
    }); }
  );

  function setter(prop) {
    return function CssProperty(value) {
      if (!value && value !== 0) {
        delete this.__style[prop];
      } else if (arguments.length > 0) {
        add(this.__style, prop, arguments.length === 1
          ? formatValue(prop, value)
          : Array.prototype.slice.call(arguments).map(function (v) { return addPx(prop, v); }).join(' ')
        );
      }

      return chain(this)
    }
  }

  function css(selector, style) {
    if (arguments.length === 1)
      { Object.keys(selector).forEach(function (key) { return addCss(key, selector[key]); }); }
    else
      { addCss(selector, style); }

    return chain(this)
  }

  function addCss(selector, style) {
    objectToRules(parse(style), selector, '', true).forEach(insert);
  }

  function helper(name, styling) {
    if (arguments.length === 1)
      { return Object.keys(name).forEach(function (key) { return helper(key, name[key]); }) }

    delete bss[name]; // Needed to avoid weird get calls in chrome

    if (typeof styling === 'function') {
      helper[name] = styling;
      Object.defineProperty(bss, name, {
        configurable: true,
        value: function Helper() {
          var result = styling.apply(null, arguments);
          assign(this.__style, result.__style);
          return chain(this)
        }
      });
    } else {
      helper[name] = parse(styling);
      Object.defineProperty(bss, name, {
        configurable: true,
        get: function() {
          assign(this.__style, parse(styling));
          return chain(this)
        }
      });
    }
  }

  bss.helper('$animate', function (value, props) { return bss.animation(bss.$keyframes(props) + ' ' + value); }
  );

  function short(prop) {
    var acronym = initials(prop)
        , short = popular[acronym] && popular[acronym] !== prop ? prop : acronym;

    shorts[short] = prop;
    return short
  }

  var stringToObject = memoize(function (string) {
    var last = ''
      , prev;

    return string.trim().split(/;|\n/).reduce(function (acc, line) {
      line = last + line.trim();
      last = line.charAt(line.length - 1) === ',' ? line : '';
      if (last)
        { return acc }

      if (line.charAt(0) === ',') {
        acc[prev] += line;
        return acc
      }

      var ref = line.replace(/[ :]+/, ' ').split(' ');
      var key = ref[0];
      var tokens = ref.slice(1);

      if (!key)
        { return acc }

      var cssVar = key.charAt(0) === '-' && key.charAt(1) === '-'
          , prop = cssVar
            ? key
            : hyphenToCamelCase(key);

      prev = shorts[prop] || prop;

      if (prop in helper) {
        typeof helper[prop] === 'function'
          ? assign(acc, helper[prop].apply(helper, tokens).__style)
          : assign(acc, helper[prop]);
      } else if (tokens.length > 0) {
        add(acc, prev, tokens.map(function (t) { return cssVar ? t : addPx(prev, t); }).join(' '));
      }

      return acc
    }, {})
  });

  var count$1 = 0;
  var keyframeCache = {};

  function keyframes(props) {
    var content = Object.keys(props).reduce(function (acc, key) { return acc + key + '{' + stylesToCss(parse(props[key])) + '}'; }
    , '');

    if (content in keyframeCache)
      { return keyframeCache[content] }

    var name = classPrefix + count$1++;
    keyframeCache[content] = name;
    insert('@keyframes ' + name + '{' + content + '}');

    return name
  }

  function parse(input, value) {
    var arguments$1 = arguments;
    var obj;

    if (typeof input === 'string') {
      if (typeof value === 'string' || typeof value === 'number')
        { return (( obj = {}, obj[input] = value, obj )) }

      return stringToObject(input)
    } else if (Array.isArray(input) && typeof input[0] === 'string') {
      var str = '';
      for (var i = 0; i < input.length; i++)
        { str += input[i] + (arguments$1[i + 1] || ''); }
      return stringToObject(str)
    }

    return input.__style || sanitize(input)
  }

  return bss;

})));
//# sourceMappingURL=bss.js.map
