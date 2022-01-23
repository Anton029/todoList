import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { TodoList } from '../todo-list'
import { globalStateContext } from '../../globalState'
import style from './style.module.css'

export const Header = () => {


    const [ removeTodo, addTodo, isAddItemPopupOpen, setAddItemPopupState ] = useContext(globalStateContext)

    const popupHandler = () => {
        setAddItemPopupState(!isAddItemPopupOpen)
    }

    const iconMod = isAddItemPopupOpen ? `${style.addItemIconActive}` : ''

    return (
        <div className={style.headerWrapper}>
            <div 
                className={style.addItemButton}
                onClick={() => popupHandler()}
            >
                <div 
                    className={classNames(`${style.addItemIcon}`, iconMod)}
                >
                    &#10010;
                </div>
            </div>
            <div className={style.headerTitle}>
                Todo list React
            </div>
            <div className={style.reactLogo}></div>
        </div>
    )
}