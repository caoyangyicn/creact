import React, { createContext, FC, useState, useRef, useEffect } from "react";
import classNames from "classnames";
import TabItem, {TabItemProps} from "./tabItem";

type selectCallback = (selectedIndex: number) => void;
type TabType = 'normal' | 'special';

interface TabProps {
    className?: string;
    tabType?: TabType;
    children: React.ReactNode;
    style?: React.CSSProperties;
    index: number;
    defaultIndex?:number;
    onSelect?: selectCallback;
}
interface ITabsContext {
    index: number;
    onSelect?: selectCallback;
    type: TabType;
    setContent?: (children: React.ReactNode) => void;
}
export const TabsContext = createContext<ITabsContext>({ index: 0, type: 'normal' });

const Tabs: FC<TabProps> = (props) => {
    const {
        defaultIndex = 0,
        tabType = "normal",
        className,
        children,
        style,
        index,
        onSelect,
        ...restProps
    } = props;

    const [ currentActive, setActive ] = useState(defaultIndex);
    const [content, setContent] = useState<React.ReactNode>(null);
    const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

    const passedContext: ITabsContext = {
        index: currentActive ? currentActive : defaultIndex,
        onSelect: (index: number) => {
            setActive(index);
            if(onSelect){
                onSelect(index);
            }
        },
        setContent(children: any) {
            setContent(children);
        },
        type: tabType
    }
    // 将 currentChild 声明为带有 props 的 React 元素
    const classes = classNames('cyy-tabs',className, {
        [`tabs-${tabType}`]: tabType,
    });
    let length = 0;
    const rederChildren = React.Children.map(children, (child, index) => {
        if (
            React.isValidElement(child) &&
            (child.type as any).displayName === "TabItem"
        ) {
            length++;
            return React.cloneElement(child as any, {
                ref: (el: HTMLDivElement | null) => (tabRefs.current[index] = el),
                index: index,
            });
        } else {
            console.error("Warning: Tabs has a child which is not a TabItem component");
        }
    });

    let bottomWidth, left;
    if(children && length > 0) {
        bottomWidth = (100 / length) + '%';
    } else{
        bottomWidth = '0px';
    }
    if(tabRefs.current[currentActive]) {
        left = tabRefs.current[currentActive]?.offsetLeft + 'px';
    } else {
        left = '0px';
    }
    const bottomStyle = {
        left: left,
        width: bottomWidth
    };


    useEffect(() => {
        const firstTab = React.Children.toArray(children).find((child, idx) =>
            React.isValidElement(child) && (child.type as any).displayName === "TabItem" && idx === currentActive
        ) as React.ReactElement<TabItemProps> | undefined;
        if (firstTab) {
            setContent(firstTab.props.children);
        }
    }, [children, currentActive]);
    return (
        <div className={classes}>
            <TabsContext.Provider value={passedContext}>
            <div className="tabs-top">
                {rederChildren}
                <div className="bottom-line" style={bottomStyle}></div>
            </div>
            </TabsContext.Provider>
            <div className="tabs-content">
                {content}
            </div>
        </div>
    );
}

export default Tabs;