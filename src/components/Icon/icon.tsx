import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react';
import classNames from 'classnames';

type themeType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'light';
export interface IconProps extends FontAwesomeIconProps {
    className?: string;
    style?: React.CSSProperties;
    theme?: themeType;
}

const Icon: FC<IconProps> = (props) => {
    const { className, theme, style, ...restProps } = props;
    const classes = classNames('cyy-icon', className, {
        [`icon-${theme}`]: theme
    });
    return (
        <FontAwesomeIcon
            className={classes}
            style={style}
            {...restProps}
        />
    );
};

export default Icon;