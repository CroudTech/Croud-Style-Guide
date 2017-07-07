const fs = require('fs')
const mkdirp = require('mkdirp')

const preprocessors = { sass: { variablePrefix: '$', fileExtension: 'scss' }, less: { variablePrefix: '@', fileExtension: 'less' } }

fs.readFile('./variables.json', 'utf-8', (error, data) => {
    if (error) {
        throw error
    }

    const varCatagories = JSON.parse(data)

    /**
    *  Remove Sass Map Files
    */
    fs.readdir('./', (error1, files) => {
        files.forEach((file) => {
            const fileName = file.split('.')[0]
            if (fileName.endsWith('Map')) {
                fs.unlink(`./${file}`, (error2) => {
                    if (error2) throw error2

                    Object.getOwnPropertyNames(varCatagories).forEach((varCatagory) => {
                        const filePath = `./${varCatagory}Map.scss`

                        let mapData = `$${varCatagory}Map: (\n`
                        let currentSection = 0

                        Object.getOwnPropertyNames(varCatagories[varCatagory]).forEach((prop) => {
                            if (prop.startsWith('//')) {
                                const section = varCatagories[varCatagory][prop].slice(0, -1).toLowerCase()

                                if (currentSection > 0) {
                                    mapData += '\n\t), \n'
                                }

                                currentSection += 1

                                mapData += `\t'${section}': (\n`
                            } else {
                                mapData += `\n\t\t'${prop}': `
                                if (varCatagories[varCatagory][prop].startsWith('croud-')) {
                                    mapData += `$${varCatagories[varCatagory][prop]},`
                                } else {
                                    mapData += `$${prop},`
                                }
                            }
                        })

                        mapData += '\n\t)\n);'

                        console.log(mapData)

                        fs.writeFile(filePath, mapData, (err3) => {
                            if (err3) throw err3
                        })
                    })
                })
            }
        })
    })

    Object.getOwnPropertyNames(preprocessors).forEach((preprocessor) => {
        const dir = `./${preprocessor}/variables`

        if (!fs.existsSync(dir)) mkdirp(dir)

        /**
        * Clear Directory
        */
        fs.readdir(dir, (err, files) => {
            if (err) throw err

            files.forEach((file) => {
                fs.unlink(`${dir}/${file}`, (err1) => {
                    if (err1) throw err1

                    Object.getOwnPropertyNames(varCatagories).forEach((varCatagory) => {
                        const fileExtension = preprocessors[preprocessor].fileExtension
                        const fileName = preprocessor === 'sass' ? `_${varCatagory}.${fileExtension}` : `${varCatagory}.${fileExtension}`
                        const filePath = `${dir}/${fileName}`

                        let styleData = ''

                        if (varCatagory === 'fonts') {
                            const fontImportPath = './../../fontImports'
                            styleData += preprocessor === 'sass' ? `@import '${fontImportPath}';\n` : `@import '${fontImportPath}.css';\n`
                        }

                        Object.getOwnPropertyNames(varCatagories[varCatagory]).forEach((varName) => {
                            const varValue = varCatagories[varCatagory][varName]
                            const varPrefix = preprocessors[preprocessor].variablePrefix

                            if (!varName.startsWith('//')) {
                                styleData += `${varPrefix}${varName}: `
                                if (varValue.startsWith('croud')) {
                                    styleData += `${varPrefix}${varValue};`
                                } else {
                                    styleData += `${varValue};`
                                }
                            } else {
                                styleData += `\n//${varValue}`
                            }

                            styleData += '\n'
                        })

                        fs.writeFile(filePath, styleData, (err2) => {
                            if (err2) throw err
                        })
                    })
                })
            })
        })
    })
})
