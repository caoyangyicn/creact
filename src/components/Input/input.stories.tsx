import React from 'react';
// 从框架特定包导入，而不是直接从@storybook/react导入
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {Input} from './input';

export default {
    title: '第九章：Input',
    id: 'Input',
    component: Input,
    decorators: [
        (Story) => (
            <div style={{width: '350px', padding: '20px'}}>
                <Story/>
            </div>
        ),
    ],
} as Meta<typeof Input>;

// 定义基础模板
const Template = (args: any) => <Input {...args} />;

// 默认 Input
export const ADefault: StoryObj<typeof Input> = {
    args: {
        placeholder: '漂亮的 Input'
    },
    name: '默认的 Input' // 使用name替代storyName
};

// 被禁用的 Input
export const BDisabled: StoryObj<typeof Input> = {
    args: {
        placeholder: 'disabled input',
        disabled: true
    },
    name: '被禁用的 Input' // 使用name替代storyName
};

// 带图标的 Input
export const CIcon: StoryObj<typeof Input> = {
    args: {
        placeholder: 'input with icon',
        icon: 'search'
    },
    name: '带图标的 Input' // 使用name替代storyName
};

// 大小不同的 Input
export const DSizeInput: StoryObj<typeof Input> = {
    render: () => (
        <>
            <Input
                defaultValue="large size"
                size="lg"
                style={{marginBottom: '10px'}}
            />
            <Input
                placeholder="small size"
                size="sm"
            />
        </>
    ),
    name: '大小不同的 Input' // 使用name替代storyName
};

// 带前后缀的 Input
export const EPandInput: StoryObj<typeof Input> = {
    render: () => (
        <>
            <Input
                defaultValue="prepend text"
                prepend="https://"
                style={{marginBottom: '10px'}}
            />
            <Input
                defaultValue="google"
                append=".com"
            />
        </>
    ),
    name: '带前后缀的 Input' // 使用name替代storyName
};
