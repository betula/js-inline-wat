'use strict'
const fs = require('fs')
const path = require('path')
const template = require('./template')
const wabtFactory = require("wabt")

const getOutput = options => {
    return options.output || `${options.input}.js`
}

const checkDirectory = fileName => {
    const dirName = path.dirname(fileName)
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName)
    }
}

module.exports = async options => {
    const { input, type } = options

    const wabt = await wabtFactory()
    const module = wabt.parseWat(input, fs.readFileSync(input, "utf8"))
    const buff = Buffer.from(module.toBinary({}).buffer)

    const base64data = buff.toString('base64')
    const templateContent = template.get(type)

    const jsContent = templateContent.replace(/\$\{base64data\}/, base64data)
    const outputFile = getOutput(options)

    checkDirectory(outputFile)
    fs.writeFileSync(outputFile, jsContent)

    console.info(`Inlined ${input} in ${outputFile}`)
}
