const fs = require('fs-extra')
const { red } = require('chalk')
const config = require('./build.config')
const _ = require('lodash')

if (config.input.endsWith('/')) config.input = config.input.slice(0, -1)

/**
 * Delete Files from a directory
 * @param {string} path - path to directory to remove files
 * @param {string} endWithRule (optional) - filter deleted files
*/
const deleteFilesFrom = (path, endWithRule = '') => {
    fs.readdirSync(path).forEach((file) => {
        if (file.endsWith(endWithRule)) {
            const filePath = `${path}${file}`
            fs.unlinkSync(filePath)
        }
    })
}

/**
 * Returns array of variable file paths in specified directory
 * @param {string} directory - directory path to return variable file path
 */
const getVariableFilesFrom = directory => _.flattenDeep(fs.readdirSync(directory)
    .filter((entry) => {
        if (!fs.statSync(`${directory}/${entry}`).isDirectory()) {
            return entry.endsWith('.json')
        }
        return entry
    }).map((entry) => {
        const entryPath = `${directory}/${entry}`
        if (fs.statSync(entryPath).isDirectory()) {
            return getVariableFilesFrom(`${entryPath}`)
        }
        return entryPath.endsWith('.json') ? entryPath : undefined
    }))

/**
 * Determine if string is a variable
 */
const varCheck = (name) => {
    if (typeof name === 'string') {
        return name.startsWith(config.prefix)
    }
    return false
}

/**
 * Returns string of formatted variables
 * @param { Object } variables - variables to format
 * @param { String } preprocessor - name of preprocessor
 */
const format = (variables, preprocessor) => _.flattenDeep((Object.keys(variables).map((varName) => {
    if (varCheck(varName)) {
        const preprocessorInfo = config.preprocessors[preprocessor]
        const varPrefix = preprocessorInfo.variable.prefix
        const separator = preprocessorInfo.variable.separator || ':'
        const varKey = `${varPrefix}${varName}`
        const valPrefix = varCheck(variables[varName]) ? varPrefix : ''
        const varVal = typeof variables[varName] === 'string'
            ? `${valPrefix}${variables[varName]}`
            : variables[varName][preprocessor] || variables[varName].default
                ? `${valPrefix}${variables[varName][preprocessor] || variables[varName].default}`
                : undefined


        if (typeof varVal !== 'undefined') {
            return `${varKey}${separator} ${varVal};`
        }

        return null
    }
    return [`\n /* ${varName} */ `, format(variables[varName], preprocessor)]
}))).join('\n')

const varFiles = getVariableFilesFrom(config.input)

const variables = {}

config.importOrder.reverse().forEach((filePath) => {
    if (!filePath.endsWith('.json')) filePath += '.json'
    if (filePath.startsWith('/')) filePath = filePath.slice(1, filePath.length)

    const importPath = `${config.input}/${filePath}`

    if (!fs.existsSync(importPath)) {
        console.log(red(`invalid file path provided to input order: \n \t ${importPath}`))
    } else {
        const removedFile = varFiles.splice(varFiles.indexOf(importPath), 1)
        varFiles.unshift(removedFile[0])
    }
})

/**
* Merge variables
*/
varFiles.forEach((filePath) => {
    const varCatagory = _.last(filePath.split('/')).split('.')[0]
    variables[varCatagory] = {}

    const vars = JSON.parse(fs.readFileSync(filePath))

    Object.assign(variables[varCatagory], vars)
})

/**
* Generate preprocessor Variables
*/
Object.keys(config.preprocessors).forEach((preprocessor) => {
    const preprocessorInfo = config.preprocessors[preprocessor]
    const filePrefix = preprocessorInfo.file.prefix ? `${preprocessorInfo.file.prefix}` : ''
    const outputDir = `${config.output}${preprocessor}/variables/`
    const allVarFileName = `${filePrefix}all.${preprocessorInfo.file.extension}`
    const allVarFilePath = `${outputDir}${allVarFileName}`
    let allVarData = ''

    if (!fs.existsSync(outputDir)) {
        fs.ensureDirSync(outputDir)
    } else {
        deleteFilesFrom(outputDir)
    }

    Object.keys(variables).forEach((varCatagory) => {
        const fileName = `${filePrefix}${varCatagory}.${preprocessorInfo.file.extension}`
        const filePath = `${outputDir}${fileName}`
        const additions = varCatagory in config.additions
            ? config.additions[varCatagory]
            : undefined
        let fileData = ''

        if (additions) {
            if (preprocessor in additions) {
                additions[preprocessor].forEach((addition) => {
                    fileData += `${addition} \n`
                })
            }
        }

        fileData += `${format(variables[varCatagory], preprocessor)}\n`

        allVarData += `\n/*===${varCatagory.toUpperCase()}===*/\n${fileData}`

        if (allVarData.includes(config.prefix)) {
            fs.writeFileSync(allVarFilePath, allVarData)
        }

        if (fileData.includes(config.prefix)) {
            fs.writeFileSync(filePath, fileData)
        }
    })
})

/**
*   Generate sass maps
*/
deleteFilesFrom(config.output, 'Map.scss')

Object.keys(variables).forEach((catagory) => {
    if (config.sassMaps.inclusions.indexOf(catagory) >= 0) {
        const varPrefix = config.preprocessors.sass.variable.prefix
        const fileName = `${catagory}Map.scss`
        const fileDir = `${config.output}${fileName}`
        let mapData = `$${catagory}Map: (\n`

        Object.keys(variables[catagory]).forEach((subCat) => {
            if (varCheck(subCat)) {
                const varKey = subCat
                const value = variables[catagory][varKey]
                const varVal = varCheck(value)
                    ? `${varPrefix}${value}, `
                    : `${varPrefix}${varKey}, `

                mapData += `\t${varKey}: ${varVal}\n`
            } else {
                mapData += `\t'${subCat}': (\n`

                Object.keys(variables[catagory][subCat]).forEach((variable) => {
                    const value = variables[catagory][subCat][variable]
                    mapData += `\t\t'${variable}': `

                    mapData += varCheck(value)
                        ? `${varPrefix}${value}, \n`
                        : `${varPrefix}${variable}, \n`
                })

                mapData = mapData.slice(0, -3)
                mapData += '\n\t),\n'
            }
        })

        mapData = mapData.slice(0, -2)
        mapData += '\n);\n'
        fs.writeFileSync(fileDir, mapData)
    }
})
