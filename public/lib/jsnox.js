;(function(global) {       // IIFE for legacy non-module usage
'use strict'

var tagNameRegex = /^([a-z1-6]+)(?:\:([a-z]+))?/    // matches 'input' or 'input:text'
var propsRegex = /((?:#|\.|@)[\w-]+)|(\[.*?\])/g    // matches all further properties
var attrRegex = /\[([\w-]+)(?:=([^\]]+))?\]/        // matches '[foo=bar]' or '[foo]'
var autoKeyGenRegex = /\^$/                         // matches 'anything^'
var protoSlice = Array.prototype.slice

// Error subclass to throw for parsing errors
function ParseError(input) {
    this.message = input
    this.stack = new Error().stack
}
ParseError.prototype = Object.create(Error.prototype)
ParseError.prototype.name = 'JSnoXParseError'


// A simple module-level cache for parseTagSpec().
// Subsequent re-parsing of the same input string will be pulled
// from this cache for an increase in performance.
var specCache = {}

// Convert a tag specification string into an object
// eg. 'input:checkbox#foo.bar[name=asdf]' produces the output:
// {
//   tagName: 'input',
//   props: {
//     type: 'checkbox',
//     id: 'foo',
//     className: 'bar',
//     name: 'asdf'
//   }
// }
function parseTagSpec(specString) {
    if (!specString || !specString.match) throw new ParseError(specString)
    if (specCache[specString]) return specCache[specString]

    // Parse tagName, and optional type attribute
    var tagMatch = specString.match(tagNameRegex)
    if (!tagMatch) {
        if (specString.match(propsRegex)) tagMatch = ['div', 'div'] // create <div> if tagname omitted
        else throw new ParseError(specString)
    }
    var tagName = tagMatch[1]
    var props = {}
    var classes = []

    if (specString.match(autoKeyGenRegex)) props.key = specString
    if (tagMatch[2]) props.type = tagMatch[2]
    else if (tagName === 'button') props.type = 'button' // Saner default for <button>

    var matches = specString.match(propsRegex)
    matches && matches.forEach(function getRegexMatches(str) {
        if (!str) return
        else if (str[0] === '#') props.id = str.slice(1)
        else if (str[0] === '@') props.ref = str.slice(1)
        else if (str[0] === '.') classes.push(str.slice(1))
        else if (str[0] === '[') {
            var match = str.match(attrRegex)
            if (match) props[match[1]] = match[2] || true    // If no attr value given, use true
        }
    })
    if (classes.length) props.className = classes.join(' ')

    var spec = {
        tagName: tagName,
        props: props
    }

    specCache[specString] = spec
    return spec
}

// Merge two objects, producing a new object with their properties
//
// Note:
// * the className property is treated as a special case and is merged
// * arguments are assumed to be object literals, which is why there are
//   no hasOwnProperty() checks (see af/JSnoX/issues/3)
function extend(obj1, obj2) {
    var output = {}
    obj1 = obj1 || {}
    obj2 = obj2 || {}

    for (var k in obj1) output[k] = obj1[k]
    for (var l in obj2) output[l] = obj2[l]

    // className is a special case: we want to return the combination
    // of strings if both objects contain className
    var combinedClass = (typeof obj1.className === 'string') &&
                        (typeof obj2.className === 'string') &&
                        [obj1.className, obj2.className].join(' ')
    output.className = combinedClass || obj1.className || obj2.className

    return output
}

// Main exported function.
// Returns a "client", which is a function that can be used to compose
// ReactElement trees directly.
function jsnox(React) {
    var client = function jsnoxClient(componentType, props, children) {
        // Special $renderIf prop allows you to conditionally render an element:
        //if (props && typeof props.$renderIf !== 'undefined') {
        if (props && typeof props === 'object' && props.hasOwnProperty('$renderIf')) {
            if (props.$renderIf) delete props.$renderIf     // Don't pass down to components
            else return null
        }

        // Handle case where an array of children is given as the second argument:
        if (Array.isArray(props) || typeof props !== 'object') {
            children = props
            props = null
        }

        // Handle case where props object (second arg) is omitted
        var arg2IsReactElement = props && React.isValidElement(props)

        var finalProps = props
        if (typeof componentType === 'string' || !componentType) {
            // Parse the provided string into a hash of props
            // If componentType is invalid (undefined, empty string, etc),
            // parseTagSpec should throw.
            var spec = parseTagSpec(componentType)
            componentType = spec.tagName
            finalProps = arg2IsReactElement ? spec.props : extend(spec.props, props)
        }

        // If more than three args are given, assume args 3..n are ReactElement
        // children. You can also pass an array of children as the 3rd argument,
        // but in that case each child should have a unique key to avoid warnings.
        var args = protoSlice.call(arguments)
        if (args.length > 3 || arg2IsReactElement) {
            args[0] = componentType
            if (arg2IsReactElement) {
                args.splice(1, 0, finalProps || null)
            } else {
                args[1] = finalProps
            }
            return React.createElement.apply(React, args)
        } else {
            return React.createElement(componentType, finalProps, children)
        }
    }
    client.ParseError = ParseError
    return client
}

// Export for CommonJS, or else add a global jsnox variable:
if (typeof(module) !== 'undefined') module.exports = jsnox
else if (typeof global.define === 'function' && global.define.amd) {
    global.define([], function() { return jsnox })      // AMD Support
} else global.jsnox = jsnox

}(this))
