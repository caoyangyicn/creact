import React, {AnchorHTMLAttributes, ButtonHTMLAttributes, FC} from "react";
import classNames from "classnames";

export enum ButtonSize {
    Large = 'lg',
    small = 'sm',
}


export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link',
}

interface BaseButtonProps {
    className?: string;
    /**设置 Alert 的禁用 */
    disabled?: boolean;
    /**设置 Alert 的尺寸 */
    size?: ButtonSize;
    /**设置 Alert 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props;
    const classes = classNames('cyy-btn',className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    });

    if(btnType === ButtonType.Link) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        );
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        );
    }
}

// Alert.defaultProps = {
//     disabled: false,
//     btnType: 'default'
// }

export default Button;