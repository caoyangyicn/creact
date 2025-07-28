import React, {AnchorHTMLAttributes, ButtonHTMLAttributes, FC} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu"
interface MenuItemProps {
    index: number;
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

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });

    const handleClick = () => {
        if (context.onselect && !disabled) {
            context.onselect(index);
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    );
}

export default MenuItem;