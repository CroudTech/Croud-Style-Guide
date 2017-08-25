// eslint-disable
import React from 'react'
import logo from '../../../static/croud-logo.svg'

export default function LogoRenderer() {
    return React.createElement('img', {
        src: logo,
        style: {
            width: '50%',
            display: 'block',
            margin: '2em auto',
        },
    }, null)
}
