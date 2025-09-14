import Button, {BaseButtonProps} from './button'
import type {Meta} from '@storybook/react-webpack5';
import React from "react";

import '../../styles/index.scss';
import {fas} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'

library.add(fas)

const buttonMeta: Meta<typeof Button> = {
    title: 'Button组件',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
}
export default buttonMeta
export const DefaultButton = () => {
    return (
        <Button>默认按钮</Button>
    )
}
DefaultButton.storyName = '默认按钮';
