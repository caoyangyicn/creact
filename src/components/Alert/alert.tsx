import React, {FC, HTMLAttributes, useState} from "react";
import classNames from "classnames";

export enum AlertType {
    Success = 'success',
    Info = 'info',
    Danger = 'danger',
    Warning = 'warning',
}

interface BaseAlertProps {
    className?: string;
    type?: AlertType;
    href?: string;
    desc?: string;
    children: React.ReactNode;
    onClose?: () => void;
    hasClose: boolean;
}
type NativeDivProps = BaseAlertProps & HTMLAttributes<HTMLElement>
export type AlertProps = Partial<NativeDivProps>
const Alert: FC<AlertProps> = (props) => {
    const {
        type,
        className,
        desc,
        hasClose = false,
        children,
        onClose,
        ...restProps
    } = props;
    const [showFlag, setShowFlag] = useState(true);
    const classes = classNames('alert',className, {
        [`alert-${type}`]: type,
        [`alert-desc`]: desc
    });
    const handleClose = (e: React.MouseEvent) => {
        if (onClose) {
            onClose()
        }
        setShowFlag(false);
    }
    if (!showFlag) return null;
    return (
        <div
            className={classes}
            {...restProps}
        >
            <div className="title">{children}</div>
            { desc && <div className="desc">{desc}</div> }
            { hasClose && <div className="close-icon" onClick={handleClose}>关闭</div> }
        </div>
    );



}

export default Alert;