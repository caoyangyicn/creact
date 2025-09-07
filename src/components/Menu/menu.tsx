import React, {createContext, FC, useState} from "react";
import classNames from "classnames";
import {MenuItemProps} from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';
type selectCallback = (selectedIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string;
    mode?: MenuMode;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: selectCallback;
    children?: React.ReactNode;
}

interface IMenuContext {
    index: string;
    onselect?: selectCallback;
    mode: MenuMode;

}
const renderChildren = (children: React.ReactNode) => {
    return React.Children.map(children, (child, index) => {
        const childElement = child as React.FunctionComponentElement<MenuItemProps>;
        if (childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
            return React.cloneElement(childElement, { index: `${index}` });
        } else {
            console.error("Warning: Menu has a child which is not a MenuItem component");
        }
    });
}

export const MenuContext = createContext<IMenuContext>({ index: '0', mode: 'horizontal' });
const Menu: FC<MenuProps> = (props) => {
    const {
        defaultIndex = '0',
        mode = 'vertical',
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
        index: currentActive ? currentActive : '0',
        onselect: (index: string) => {
            setActive(index);
            console.log(index,"index");
            if(onSelect){
                onSelect(index);
            }
        },
        mode: mode
    }
    const handleClick = (index: string) => {
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