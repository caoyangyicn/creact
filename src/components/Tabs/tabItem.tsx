import React, { forwardRef } from "react";
import classNames from "classnames";
import MenuItem from "../Menu/menuItem";
import { TabsContext } from "./tabs";
export interface TabItemProps {
    index?: number; // 允许传入数字索引
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    label?: string;
}

const TabItem = forwardRef<HTMLDivElement, TabItemProps>((props, ref) => {
    const context = React.useContext(TabsContext);
    const {
        index,
        disabled,
        className,
        style,
        label,
        children
    } = props;

    const classes = classNames('cyy-tab-item-title',className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });

    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index)
        }
    }

    return (
        <div className={classes}  ref={ref} {...props} style={style} onClick={handleClick}>
            <div className="tab-title">{label}</div>
        </div>
    );
});
TabItem.displayName = "TabItem";

export default TabItem;