import React, {FC} from "react";
import classNames from "classnames";
import {MenuContext} from "./menu";

export interface SubMenuProps {
    index?: String; // 允许传入数字索引
    title: string;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const SubMenu: FC<SubMenuProps> = ({index, title, children, className}) => {
    const context = React.useContext(MenuContext);
    const [ menuOpen, setMenuOpen] = React.useState(false);
    const subMenuClasses = classNames('cyy-menu-item submenu', {
        'menu-open': menuOpen
    });
    const handleClick = (e: React.MouseEvent) => {
        setMenuOpen(!menuOpen);
    };
    let timer: any;
    const handleMouse = (e: React.MouseEvent, open: boolean) => {
        e.preventDefault();
        clearTimeout(timer);
        timer = setTimeout(() => {
            setMenuOpen(open);
        }, 300);
    };

    const clickEvents = context.mode === 'horizontal' ? {
        onClick: handleClick
    } : {}

    const hoverEvents = context.mode === 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
        }
    } : {}

    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<SubMenuProps>;
            if (childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                });
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }

        });
        return (
            <ul className="cyy-submenu" >
                {childrenComponent}
            </ul>
        );
    }
    return (
        <li className={subMenuClasses} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
)
    ;
}
SubMenu.displayName = 'SubMenu';

export default SubMenu;