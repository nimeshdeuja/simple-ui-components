import React from 'react';
import styles from "./Button.module.css";

type Types = 'button' | 'submit' | 'reset'
type Themes = 'default' | 'primary' | 'secondary' | 'disabled' | 'danger';

interface Props {
    text:string,
    clicked:(item:any)=>void,
    className?:string
    theme?:Themes,
    type:Types,
    icon?:any,
    fullWidth?:string,
    style?:any,
    children?:React.ReactNode
}

const Button = React.forwardRef(({className, theme='default', type, clicked, icon, text,fullWidth,style, children}: Props, ref:any) => {
    let classes = `${styles.button} ${styles[theme]}`;
    if(className) classes = `${styles.button} ${styles[theme]} ${className} ${fullWidth?styles.fullWidth:''}`;
    return <button 
                className={classes} 
                type={type} 
                onClick={clicked} 
                disabled={theme==='disabled'}
                data-testid='test'
                style={style}
                ref={ref}
            >
                {children ? children : <>{icon}{text}</>}
            </button>
})
export default Button