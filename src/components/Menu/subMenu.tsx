import React, {FC} from "react";
import classNames from "classnames";
import {MenuContext} from "./menu";

export interface SubMenuProps {
    index?: number; // 允许传入数字索引
    title: string;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const SubMenu: FC<SubMenuProps> = ({index, title, children, className}) => {
    const context = React.useContext(MenuContext);
    const classes = classNames('cyy-submenu-item', className, {
        'is-active': context.index === index
    });
    const subMenuClasses = classNames('cyy-submenu', {
        'is-open': context.index === index
    });


    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<SubMenuProps>;
            if (childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: i
                });
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }

        });
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        );
    }
    return (
        <li className={classes}>
            <div className="submenu-title">
                {title}
            </div>
            {renderChildren()}
        </li>
)
    ;
}
SubMenu.displayName = 'SubMenu';

export default SubMenu;