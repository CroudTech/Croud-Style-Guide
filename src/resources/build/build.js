const fs = require('fs')
const mkdirp = require('mkdirp')

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

const config = require('./build.config')

const varFiles = fs.readdirSync(config.input)
const variables = {}

/**
* Merge variables
*/
varFiles.forEach((file) => {
    const filePath = `${config.input}${file}`
    const varCatagory = file.split('.')[0]
    variables[varCatagory] = {}

    const vars = JSON.parse(fs.readFileSync(filePath))

    Object.assign(variables[varCatagory], vars)
})

/**
* Generate preprocessor Variables
*/
Object.keys(config.preprocessors).forEach((preprocessor) => {
    const preprocessorInfo = config.preprocessors[preprocessor]
    const outputDir = `${config.output}${preprocessor}/variables/`

    if (!fs.existsSync(outputDir)) mkdirp(outputDir)

    deleteFilesFrom(outputDir)

    Object.keys(variables).forEach((varCatagory) => {
        const filePrefix = preprocessorInfo.file.prefix ? `${preprocessorInfo.file.prefix}` : ''
        const fileName = `${filePrefix}${varCatagory}.${preprocessorInfo.file.extension}`
        const filePath = `${outputDir}${fileName}`
        let fileData = ''

        const vars = variables[varCatagory]

        Object.keys(vars).forEach((varSubCatagory) => {
            const subCats = variables[varCatagory][varSubCatagory]
            fileData += `\n${preprocessorInfo.comment.syntax}${varSubCatagory}\n`

            Object.keys(subCats).forEach((variable) => {
                const varValue = subCats[variable]
                fileData += `${preprocessorInfo.variable.prefix}${variable}: `

                fileData += varValue.startsWith('croud')
                ? `${preprocessorInfo.variable.prefix}${varValue};\n`
                : `${varValue};\n`
            })
        })

        fs.writeFileSync(filePath, fileData)
    })
})

/**
*   Generate sass maps
*/
deleteFilesFrom(config.output, 'Map.scss')

Object.keys(variables).forEach((catagory) => {
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
    mapData += '\n);'
    fs.writeFileSync(fileDir, mapData)
})
