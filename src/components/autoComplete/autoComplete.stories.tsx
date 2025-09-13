import React from 'react';
// 从框架特定包导入，而不是直接从@storybook/react导入
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {AutoComplete} from './autoComplete';
import { action } from '@storybook/preview-api';

export default {
    title: '第九章：AutoComplete',
    id: 'AutoComplete',
    component: AutoComplete,
    decorators: [
        (Story) => (
            <div style={{width: '350px', padding: '20px'}}>
                <Story/>
            </div>
        ),
    ],
} as Meta<typeof AutoComplete>;

// 定义基础模板
const Template = (args: any) => <AutoComplete {...args} />;

// 默认 AutoComplete
export const ADefault: StoryObj<typeof AutoComplete> = {
    render: () => {
        const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
            'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];

        const handleFetch = (query: string) => {
            return lakers.filter(name => name.includes(query));
        };

        return (
            <AutoComplete
                fetchSuggestions={handleFetch}
                onSelect={action('selected') }
            />
        );
    },
    name: '默认的AutoComplete'
};