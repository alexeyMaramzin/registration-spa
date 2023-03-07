import styles from './UiButton.module.scss';
import cn from 'classnames';
export const UiButton = (children) => {
    return (
        <button
            style={{backgroundColor: children.color, padding: children.padding}}
            className={cn(styles.loginButton, children.className)}
            onClick={children.onClick}
            disabled={children.disable}
        >
            <div className={styles.loginButton__icon}>
                {children.icon}
            </div>
            {children.name}
        </button>
    );
};

