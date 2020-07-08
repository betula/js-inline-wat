## js-inline-wat [![npm version](https://img.shields.io/npm/v/js-inline-wat?style=flat-square)](https://www.npmjs.com/package/js-inline-wat)

A tool for bundling a WebAssembly .wat file into a .js ES6 library file.

### Installation

```
npm install -D js-inline-wat
```

### Usage

```
$ inlinewat sample.wat [-o sample.wat.js] [-t decoded]
```

In `package.json`

```json
scripts: {
    "inlinewat": "inlinewat wat/sample.wat -o build/sample.js"
}
```

### Options

* --input file          The .wat file to inline

* -o, --output file     The .js file to create

* -t, --type typeName   The type of JavaScript file to generate - "decoded" (default),
                        "encoded", "fetch"

* -h, --help            Show this Help page

### Types

Each type outputs a different variant of JavaScript file

#### -type fetch

Creates a JavaScript file with a default export function that can be used anywhere you could use `fetch()`. e.g.

```javascript
import fetchSample from 'sample'; // sample.js contains the bundled .wat

WebAssembly.instantiateStreaming(fetchSample)
    .then(obj => obj.instance.exports.exported_func());
```

#### -type decoded

Creates a JavaScript file with a default export byte array containing the decoded .wat content

**Note:** You'll probably want to use [`WebAssembly.instantiateStreaming()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiateStreaming) in most cases, as it is more efficient than `instantiate()`.

```javascript
import decodedSample from 'sample'; // sample.js contains the bundled .wat

WebAssembly.instantiate(decodedSample)
    .then(obj => obj.instance.exports.exported_func());
```

#### -type encoded

Creates a JavaScript file with a default export string value containing the base64 encoded .wat file

```javascript
import encodedSample from 'sample'; // sample.js contains the bundled .wat

// Decode the base64 string then compile...
```
