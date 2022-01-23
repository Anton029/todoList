import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import style from './style.module.css'
import { globalStateContext } from '../../../globalState'

export const ListItem = (props) => {

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
                    <label
                        className={classNames(`${style.itemTitle}`, todoTitleMod)}
                        htmlFor={`todo_` + props.id}
                    >
                        {props.title}
                    </label>
                </div>
                <div className={style.itemOptions}>
                    <div 
                        className={style.deleteItem}
                        onClick={() => removeTodoHandler(props.id)}
                    ></div>
                    {props.description &&
                        <div className={classNames(`${style.descriptionToggler}`, togglerMod)} onClick={descriptionHandler}></div>
                    }
                </div>
            </div>
            {props.description &&
                <div className={classNames(`${style.itemDescription}`, descriptionMod)}>
                    {props.description}
                </div>
            }
        </div>
    )
}