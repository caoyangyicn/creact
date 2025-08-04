import React, {FC, createContext, useState} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
type MenuMode = 'horizontal' | 'vertical';
type selectCallback = (selectedIndex: number) => void;

export interface MenuProps {
    defaultIndex?: number;
    mode?: MenuMode;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: selectCallback;
    children?: React.ReactNode;
}

interface IMenuContext {
    index: number;
    onselect?: selectCallback;
}
const renderChildren = (children: React.ReactNode) => {
    return React.Children.map(children, (child, index) => {
        const childElement = child as React.FunctionComponentElement<MenuItemProps>;
        if (childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
            return React.cloneElement(childElement, { index });
        } else {
            console.error("Warning: Menu has a child which is not a MenuItem component");
        }
    });
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });
const Menu: FC<MenuProps> = (props) => {
    const {
        defaultIndex = 0,
        mode = 'horizontal',
        className,
        style,
        onSelect,
        children
    } = props;
    const [ currentActive, setActive ] = useState(defaultIndex);
    const classes = classNames('cyy-menu', className, {
        [`menu-${mode}`]: mode
    });

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onselect: (index: number) => {
            setActive(index);
            if(onSelect){
                onSelect(index);
            }
        }
    }
    const handleClick = (index: number) => {
        if (onSelect) {
            onSelect(index);
        }
    };

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren(children)}
            </MenuContext.Provider>
        </ul>
    );
}

export default Menu;