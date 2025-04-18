// ** Style
import style from '../../style/components/ui/inputElement.module.css'
// ** Interfaces
import { IInputElement } from './../../interfaces/index';






export default function InputElement({id,name,type,value,placeholder,img,error,onChange}:IInputElement) {
    return (
        <>
            <div className={style.form_input}>
                <label htmlFor={id}>{name}</label>
                <div className={style.input_element}>
                    <input type={type} placeholder={placeholder} id={id} value={value} onChange={(e)=>{onChange(e)}}/>
                    <img src={img.src} alt={img.alt} />
                </div>
                <span className={style.error}>{error}</span>
            </div>
        </>
    )
}
