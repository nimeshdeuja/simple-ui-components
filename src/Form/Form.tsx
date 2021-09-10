import React from 'react';
import './simpleForm.css'
import './simpleForm-default.css'
import './simpleForm-outline.css'
import Autocomplete from '../Autocomplete/Autocomplete';
import File from '../File/File';

const showHidePassword = (event:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    let elementId = event.currentTarget.id
    let element = document.getElementById(elementId)

    let targetId = elementId.slice(0,-8);
    let targetElement = document.getElementById(targetId);
    if(targetElement && element){
      let eyeIcon = element.getElementsByClassName( 'showHide' )[0];
      let types = targetElement.getAttribute('type');
      targetElement.setAttribute('type', types==='password'?'text':'password')
      if(eyeIcon){
        if (types === "text") {
          eyeIcon.classList.remove('slash');
        } else {
          eyeIcon.classList.add('slash');
        }
      }
    }
  }

export const SimplePreventAlphabet = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.keyCode === 69) e.preventDefault()
}

export const SimpleOnBlur = (event:React.FocusEvent<HTMLInputElement>)=>{
  if (event.target.value.length > 0) {
    event.target.classList.add("focused");
  } else {
    event.target.classList.remove("focused");
  }
}

interface MessageProps {
  errors:any,
  name?:string,
}
export const Message = ({errors,name}:MessageProps) => {
  if(!name || !errors || !errors[name]) return null;
  return <span className={`error`}>{errors[name].message}</span>
}

type layout = 'default'|'outline';
type size = 'lg'|'md'|'sm';
interface FormProps {
  layout:layout,
  size:size,
  onSubmit:(e:React.FormEvent<HTMLFormElement>)=>void,
  children:React.ReactNode,
  className?:string
}
export const Form = ({className='',layout,size,onSubmit,children}:FormProps) => <form autoComplete="off" onSubmit={onSubmit} className={`${layout} ${size} ${className}`}>{children}</form>

interface InputGroupProps {
  className?:string,
  type:'autocomplete'|'checkbox'|'date'|'password'|'radio'|'radio-row'|'select'|'textarea'|'file'|'input',
  name?:string,
  icon?:any,
  placeholder?:string,
  errors?:any,
  inputElement?:any,
  children?:React.ReactNode
}
export const InputGroup = React.forwardRef(({className='', type, name,icon, placeholder, errors,inputElement, children}:InputGroupProps, ref:any)=>{
  let MessageElement = <Message errors={errors} name={name} />;

  let labelClass = 'placeholder'
  if(type === 'textarea'){
    labelClass = 'placeholder-textarea'
  } else if(type === 'select'){
    labelClass = 'placeholder-select'
  }
  let labelElement = placeholder && <label htmlFor={name} className={labelClass}>{placeholder}</label>

  let eClass = 'radio-col'
  if(type === 'radio-row'){
    eClass = 'radio-row'
  } else if(type === 'checkbox'){
    eClass = 'check'
  }
  let errorClass = `${errors && name && errors[name]?'error':''} ${eClass}`;

  switch (type) {
    case 'textarea':
      let textAreaElement = children;
      if(inputElement) textAreaElement = <textarea {...inputElement} ref={ref} onKeyUp={inputElement.onKeyUp?inputElement.onKeyUp:SimpleOnBlur}></textarea>;

      return  <div className={`inputField ${className}`}>
                {textAreaElement}
                {labelElement}
                {MessageElement}
              </div>

    case 'date':
      return <div className={`inputField ${className}`}>
              <div className="focused holder withIcon">
                {children}
                <div className="buttonBg">
                  <i className="simple-calendar"></i>
                </div>
              </div>
              {labelElement}
              {MessageElement}
            </div>

    case 'password':
      return <div className={`inputField ${className}`}>
                  <div className={`holder withIcon`}>      
                    <div
                      className={`buttonBgNoEvent`}
                      id={inputElement.id + "showHide"}
                      onClick={showHidePassword}
                    >
                    <div className={`showHide eye`}>
                      <div></div>
                    </div>
                  </div>
                  <input type='password' {...inputElement} ref={ref} onBlur={inputElement.onBlur?inputElement.onBlur:SimpleOnBlur} />
                  {labelElement}
                  </div>
                  {MessageElement}
                </div>
    case 'select':
      let selectElement = children;
      if(inputElement){
        let selectOptions = inputElement.options && inputElement.options.map((item:any,index:any)=><option key={index} value={item.value}>{item.label}</option>);
        selectElement = <select name={name} ref={ref} {...inputElement}>{selectOptions}</select>
      }
      return <div className={`inputField ${className}`}>
                <div className={`holder`}>
                  <span className={`arrow`}></span>
                  {selectElement}
                </div>
                  {labelElement}
                  {MessageElement}
              </div>
    case 'radio': case 'radio-row':
      let radioElement = children;
      if(inputElement){
        radioElement = inputElement.options && inputElement.options.map((item:any,index:any)=><label key={index}><input name={name} type="radio"  ref={ref} {...inputElement} value={item.value} />{item.label}</label>);
      }
      return  <div className={`inputField ${className}`}>
                {placeholder && <span className='title'>{placeholder}</span>}
                <div className={errorClass}>
                  {radioElement}
                </div>
              </div>
    
    case 'checkbox':
      let checkBoxElement = children;
      if(inputElement) {
        checkBoxElement = <label><input name={name} type={type} ref={ref} {...inputElement} />{inputElement.label}</label>
      }
      return  <div className={`inputField ${className}`}>
                {placeholder && <span className='title'>{placeholder}</span>}
                <div className={errorClass}>
                  {checkBoxElement}
                </div>
              </div>

    case 'autocomplete':
      let autocompleteElement = children
      if(inputElement){
        autocompleteElement = <Autocomplete {...inputElement} ref={ref} />
      }
      return <div className={`inputField ${className}`}>
              <div className="focused holder autocomplete">
                {autocompleteElement}
                <span className={`arrow`}></span>
              </div>
              {labelElement}
              {MessageElement}
            </div>
  
  case 'file':
    let file = children
    if(inputElement){
      file = <File {...inputElement} ref={ref} />
    }
    return <div className={`inputField ${className}`}>
            {placeholder && <span className='title'>{placeholder}</span>}
            <div className="holder file">
              {file}
            </div>
            {MessageElement}
          </div>
    default:
      let element = children
      if(inputElement) {
        element = <input {...inputElement} ref={ref} onBlur={inputElement.onBlur?inputElement.onBlur:SimpleOnBlur} />
        if(inputElement.type && inputElement.type === 'number') element = <input {...inputElement} step={inputElement.step?inputElement.step:"any"} ref={ref} onBlur={inputElement.onBlur?inputElement.onBlur:SimpleOnBlur} onKeyDown={inputElement.onKeyDown?inputElement.onKeyDown:SimplePreventAlphabet} />
      }

      let toReturn = <div className={`inputField ${className}`}>
                      {element}
                      {labelElement}
                      {MessageElement}
                    </div>
      if(icon){
        toReturn =<div className={`inputField ${className}`}>
                  <div className={`holder withIcon`}>      
                    <div
                      className={`buttonBg`}
                    >
                    {icon}
                  </div>
                  {element}
                  {labelElement}
                  </div>
                  {MessageElement}
                </div>
      }

      return toReturn
  }
})