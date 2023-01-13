import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.modual.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Button({
    to,
    href,
    text = false,
    primary = false,
    ouline = false,
    small = false,
    large = false,
    disibal = false,
    rounded = false,
    children,
    className,
    rightIcon,
    leftIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const classes = cx('wrapper', {
        primary,
        ouline,
        small,
        large,
        text,
        disibal,
        rounded,
        [className]: className,
        rightIcon,
        leftIcon,
    });
    // truyền ở comp nếu bên file header mà có onclcik thì bên này nó sẽ lấy cái props onclick và truyền vào className bên dưới
    const props = {
        onClick,
        ...passProps,
    };
    if (disibal) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}
Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.bool,
    primary: PropTypes.bool,
    ouline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disibal: PropTypes.bool,
    rounded: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    rightIcon: PropTypes.node,
    leftIcon: PropTypes.node,
    onclick: PropTypes.func,
};

export default Button;
