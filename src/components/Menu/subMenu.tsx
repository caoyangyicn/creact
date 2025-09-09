import React, {FC, useRef} from "react";
import classNames from "classnames";
import {MenuContext} from "./menu";
import Icon from "../Icon/icon";
import {CSSTransition} from 'react-transition-group';

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
    const nodeRef = useRef<HTMLUListElement>(null);

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
            <CSSTransition
                in={menuOpen}
                timeout={300}
                classNames="zoom-in-top"
                appear
                unmountOnExit
                nodeRef={nodeRef}
            >
                <ul className="cyy-submenu">
                    {childrenComponent}
                </ul>
            </CSSTransition>
        );
    }
    return (
        <li className={subMenuClasses} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon={{ prefix: 'fas', iconName: 'caret-down' }}/>
            </div>
            {renderChildren()}
        </li>
)
    ;
}
SubMenu.displayName = 'SubMenu';

export default SubMenu;