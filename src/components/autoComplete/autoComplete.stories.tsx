import React from 'react';
// 从框架特定包导入，而不是直接从@storybook/react导入
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {AutoComplete, DataSourceType} from './autoComplete';

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
const handleSelect = (value: DataSourceType) => {
    console.log('选项被选中:', value);
};
// 默认 AutoComplete
export const ADefault: StoryObj<typeof AutoComplete> = {
    render: () => {
        // const lakersWithNumber = [
        //     {value: 'bradley', number: 11},
        //     {value: 'pope', number: 1},
        //     {value: 'caruso', number: 4},
        //     {value: 'cook', number: 2},
        //     {value: 'cousins', number: 15},
        //     {value: 'james', number: 23},
        //     {value: 'AD', number: 3},
        //     {value: 'green', number: 14},
        //     {value: 'howard', number: 39},
        //     {value: 'kuzma', number: 0},
        // ]

        // const handleFetch = (query: string) => {
        //     return lakersWithNumber.filter(laker => laker.value.includes(query));
        // };

        const handleFetch = (query: string) => {
            return fetch(`https://api.github.com/search/users?q=${query}`)
                .then(res => res.json())
                .then(({items}) => {
                    return items?.slice(0, 10)?.map((item: any) => ({value: item.login, ...item}))
                })
        }
        return (
            <AutoComplete
                fetchSuggestions={handleFetch}
                onSelect={handleSelect}
            />
        );
    },
    name: '默认的AutoComplete'
};