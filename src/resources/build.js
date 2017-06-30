const fs = require('fs')
const mkdirp = require('mkdirp')

const preprocessors = { sass: { 'comment-syntax': '//', variablePrefix: '$', fileExtension: 'scss' }, less: { variablePrefix: '@', fileExtension: 'less' } }

fs.readFile('./variables.json', 'utf-8', (error, data) => {
    if (error) {
        throw error
    }

    const varCatagories = JSON.parse(data)

    // create less and sass folder
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
                        const fileName = `${varCatagory}.${fileExtension}`
                        const filePath = `${dir}/${fileName}`

                        // console.log(varCatagories[varCatagory])
                        let styleData = ''

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

                        console.log(styleData)

                        fs.writeFile(filePath, styleData, (err) => {
                            if (err) throw err
                        })
                    })
                })
            })
        })
    })
})
