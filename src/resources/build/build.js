const fs = require('fs')
const mkdirp = require('mkdirp')
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
const getVariableFilesFrom = directory => fs.readdirSync(directory)
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
    })

/**
 * Determine if string is a variable
 */
const varCheck = name => name.startsWith(config.prefix)

const varFiles = _.flattenDeep(getVariableFilesFrom(config.input))

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
        mkdirp(outputDir)
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

        allVarData += `\n/*===${varCatagory.toUpperCase()}===*/\n`

        const vars = variables[varCatagory]

        if (!varCheck(Object.keys(vars)[0])) {
            Object.keys(vars).forEach((varSubCatagory) => {
                const subCats = variables[varCatagory][varSubCatagory]
                fileData += `\n /* ${varSubCatagory} */ \n`

                Object.keys(subCats).forEach((variable) => {
                    const varValue = subCats[variable]
                    fileData += `${preprocessorInfo.variable.prefix}${variable}: `

                    fileData += varCheck(varValue)
                    ? `${preprocessorInfo.variable.prefix}${varValue};\n`
                    : `${varValue};\n`
                })
            })
        } else {
            Object.keys(vars).forEach((directVar) => {
                const propValue = variables[varCatagory][directVar]
                fileData += `${preprocessorInfo.variable.prefix}${directVar}: `

                const varValue = typeof propValue !== 'string'
                ? propValue[preprocessor] || ''
                : propValue

                fileData += varCheck(varValue)
                ? `${preprocessorInfo.variable.prefix}${varValue};\n`
                : `${varValue};\n`
            })
        }
        allVarData += fileData

        fs.writeFileSync(allVarFilePath, allVarData)
        fs.writeFileSync(filePath, fileData)
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
            mapData += `\t'${subCat}': (\n`

            Object.keys(variables[catagory][subCat]).forEach((variable) => {
                const value = variables[catagory][subCat][variable]
                mapData += `\t\t'${variable}': `

                mapData += value.startsWith('croud')
                ? `${varPrefix}${value}, \n`
                : `${varPrefix}${variable}, \n`
            })

            mapData = mapData.slice(0, -3)
            mapData += '\n\t),\n'
        })

        mapData = mapData.slice(0, -2)
        mapData += '\n);\n'
        fs.writeFileSync(fileDir, mapData)
    }
})

