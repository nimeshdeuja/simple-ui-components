import styles from "./Button.module.css";

type Types = 'button' | 'submit' | 'reset'
type Thems = 'default' | 'primary' | 'secondary' | 'disabled' | 'danger';

interface Props {
    className?:string
    theme?:Thems,
    type:Types,
    clicked:(item:any)=>void,
    icon?:React.ReactNode,
    text:string,
    fullWidth?:string,
    style?:any
}

const Button = ({className, theme='default', type, clicked, icon, text,fullWidth,style}: Props) => {
    let classes = `${styles.button} ${styles[theme]}`;
    if(className) classes = `${styles.button} ${styles[theme]} ${className} ${fullWidth?styles.fullWidth:''}`;
    return <button 
                className={classes} 
                type={type} 
                onClick={clicked} 
                disabled={theme==='disabled'}
                data-testid='test'
                style={style}
            >
                {icon}{text}
            </button>
}
export default Button