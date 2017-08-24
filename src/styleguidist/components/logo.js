// eslint-disable
import React from 'react'
import logo from '../../../static/croud-logo.svg'

export default function LogoRenderer() {
    return React.createElement('img', {
        src: logo,
        style: {
            width: '70%',
            display: 'block',
            margin: '.5em auto',
        },
    }, null)
}
