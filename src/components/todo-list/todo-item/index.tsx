import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import style from './style.module.css'
import { globalStateContext } from '../../../globalState'

export interface AllProps {
    title : string;
    checked : boolean;
    description : string;
    id : string;
}

export const ListItem = (props: AllProps) => {

    const [ todoList, setTodoList ] = useContext(globalStateContext)

    const [ isCheck, setCheck ] = useState(props.checked)

    const checkboxHandler = e => {
        
        const targetChecked = e.target.checked

        
        setCheck(targetChecked)

        let newList = [...todoList].map(e => {
            if(e.id === props.id) {
                return {...e, ...{checked: targetChecked}}
            } 
            else return e
        })
        localStorage.setItem('todolist', JSON.stringify(newList))
        setTodoList(newList)
    }

    const [isOpen, setOpen] = useState(false)

    const descriptionHandler = () => {
        setOpen(!isOpen)
    }

    const descriptionMod = isOpen ? `${style.openDescription}` : ''
    const inputDescriptionMod = isOpen ? `${style.inputDescriptionActive}` : ''
    const togglerMod = isOpen ? `${style.togglerOpen}` : ''
    const todoTitleMod = isCheck ? `${style.lineThrough}` : ''

    const removeTodoHandler = (id) => {
        let newList = [...todoList].filter(e => {
            if(e.id != id){
                return e
            }
        })
        
        localStorage.setItem('todolist', JSON.stringify(newList))
        setTodoList(newList)
    }

    const [ isEditMod, setEditMod ] = useState(false)
    const editIconMod = isEditMod ? `${style.editCheckMark}` : ''

    const [ titleText, setTitleText ] = useState(props.title)
    const [ descriptionText, setDescriptionText ] = useState(props.description)

    const editTodoHandler = (id) => {
        if(isEditMod){
            let newList = [...todoList].map(e => {
                if(e.id === id) {
                    return {...e, title: titleText, description: descriptionText}
                } 
                else return e
            })

            setOpen(false)

            localStorage.setItem('todolist', JSON.stringify(newList))
            setTodoList(newList)
        } 
        else setOpen(true)

        setEditMod(!isEditMod)
    }

    const inputTitleHandler = (text) => {
        setTitleText(text)
    }

    const inputDescriptionHandler = (text) => {
        setDescriptionText(text)
    }

    return (
        <div className={style.itemWrapper}>
            <div className={style.itemTitleWrapper}>
                <div className={style.itemCheckboxWrapper}>
                    <input
                        className={style.checkbox}
                        type="checkbox"
                        checked={isCheck}
                        onChange={checkboxHandler}
                        id={`todo_` + props.id}
                    />
                    <div className={style.customCheckbox}></div>
                    {isEditMod ? 
                        <input
                            className={style.inputTitle}
                            type={'text'}
                            value={titleText}
                            onChange={(e) => inputTitleHandler(e.target.value)}
                        />
                        :                     
                        <label
                            className={classNames(`${style.itemTitle}`, todoTitleMod)}
                            htmlFor={`todo_` + props.id}
                        >
                            {titleText}
                        </label>
                    }
                </div>
                <div className={style.itemOptions}>
                    <div 
                        className={classNames(`${style.editTodo}`, editIconMod)}
                        onClick={() => editTodoHandler(props.id)}
                    ></div>
                    <div 
                        className={style.deleteItem}
                        onClick={() => removeTodoHandler(props.id)}
                    ></div>
                    {(props.description || isEditMod) &&
                        <div className={classNames(`${style.descriptionToggler}`, togglerMod)} onClick={descriptionHandler}></div>
                    }
                </div>
            </div>
            {props.description &&
                !isEditMod &&
                <div className={classNames(`${style.itemDescription}`, descriptionMod)}>
                    {descriptionText}
                </div>
            }
            {
                isEditMod &&
                <textarea
                    className={classNames(`${style.inputDescription}`, inputDescriptionMod)}
                    value={descriptionText}
                    onChange={(e) => inputDescriptionHandler(e.target.value)}
                /> 
            }
        </div>
    )
}