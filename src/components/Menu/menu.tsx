import React, {FC, createContext, useState} from "react";
import classNames from "classnames";

type MenuMode = 'horizontal' | 'vertical';
type selectCallback = (selectedIndex: number) => void;

interface MenuProps {
    defaultIndex?: number;
    mode?: MenuMode;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: selectCallback;
    children: React.ReactNode;
}

interface IMenuContext {
    index: number;
    onselect?: selectCallback;
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
    const classes = classNames('menu', className, {
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
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    );
}

export default Menu;