import React, {AnchorHTMLAttributes, ButtonHTMLAttributes, FC} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu"
export interface MenuItemProps {
    index?: string; // 允许传入数字索引
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const MenuItem: FC<MenuItemProps> = (props) => {
    const context = React.useContext(MenuContext);
    const {
        index,
        disabled,
        className,
        style,
        children
    } = props;

    const classes = classNames('cyy-menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });

    const handleClick = () => {
        if (context.onselect && !disabled && (typeof index === 'string')) {
            context.onselect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    );
}

MenuItem.displayName = "MenuItem";
export default MenuItem;