
import './Button.css';

const Button = ({ children,onClick, ...rest }) => {
    const { className,id } = rest;
    return (
        <button type="button" id={id} onClick={onClick} className={`button ${className}`}>
            {children}
        </button>
    )
}

export default Button;