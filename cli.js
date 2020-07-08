#! /usr/bin/env node
'use strict'
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

const inlinewat = require('./inlinewat')
const template = require('./template')

const defaultType = "decoded";

const templateNames = template.list()
    .map(n => n === defaultType ? `"${defaultType}" (default)` : `"${n}"`)

const optionDefinitions = [
    { name: 'input', type: String, defaultOption: true, typeLabel: 'file', description: 'The .wat file to inline' },
    { name: 'output', alias: 'o', type: String, typeLabel: 'file', description: 'The .js file to create' },
    { name: 'type', alias: 't', type: String, typeLabel: 'typeName', defaultValue: defaultType, description: `The type of JavaScript file to generate - ${templateNames.join(', ')}` },
    { name: 'help', alias: 'h', type: Boolean, description: 'Show this Help page' }
]

const options = commandLineArgs(optionDefinitions)

if (options.help) {
    const sections = [
        {
          header: 'js-inline-wat',
          content: 'A tool for bundling a WebAssembly .wat file into a .js ES6 library file with async loading.'
        },
        {
            header: 'Usage',
            content: '$ inlinewat sample.wat [--output sample.js] [--type fetch]'
        },
        {
          header: 'Options',
          optionList: optionDefinitions
        }
      ]
    console.log(commandLineUsage(sections))
} else {
    inlinewat(options)
}
