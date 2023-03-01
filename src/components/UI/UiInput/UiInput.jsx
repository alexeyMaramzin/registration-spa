import styles from './UiInput.module.scss';
import cn from 'classnames';
import {ReactComponent as EyeOn} from "../../../images/icons/eye-on.svg";
import {ReactComponent as EyeOff} from "../../../images/icons/eye-off.svg";

export const UiInput = (props) => {

    return (
        <div className={cn(styles.input, props.className)}>
            <div className={styles.input__wrapper}>
                <div className={styles.input__icon}>
                    {props.icon}
                </div>
                <input
                    type={props.type}
                    spellCheck='false'
                    autoComplete='on'
                    className={styles.input__field}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e)=>props.setValue(e.target.value)}
                />
            </div>
            <div className={styles.input__incorrect}>{props.error}</div>
            {props.format === 'password' && (
                <button
                    onClick={()=>props.type==='password'? props.setType('text'):props.setType('password')
                    }
                    type='button'
                >
                    {props.type==='text'?<EyeOn/>:<EyeOff/>}
                </button>
            )}
        </div>
    );
};

