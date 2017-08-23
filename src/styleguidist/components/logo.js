// eslint-disable
import React from 'react'

export default function LogoRenderer() {
    return React.createElement('img', {
        src: '../../../static/croud-logo.svg',
        style: {
            width: '70%',
            display: 'block',
            margin: '.5em auto',
        },
    }, null)
}
