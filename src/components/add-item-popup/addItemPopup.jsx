import React, { memo, useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { globalStateContext } from '../../globalState'
import style from './style.module.css'

export const AddItemPopup = () => {

    const [titleInput, setTitleInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')

    const descriptionInputHandler = (text) => {
        setDescriptionInput(text)
    }

    const titleInputHandler = (text) => {
        setTitleInput(text)
    }

    const [ todoList, setTodoList, isAddItemPopupOpen ] = useContext(globalStateContext)

    const addTodoHandler = () => {
        if(titleInput !== ''){
			let newList = [...todoList]

            let id = "";
            const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
            for (var i = 0; i < 5; i++){
                id += symbols.charAt(Math.floor(Math.random() * symbols.length));     
            }

			newList.push({title: titleInput, checked: false, description: descriptionInput, id: id})

			localStorage.setItem('todolist', JSON.stringify(newList))
			setTodoList(newList)
            
            descriptionInputHandler('')
            titleInputHandler('')
		}
    }

    useEffect(() => {
        setTimeout(() => {
            descriptionInputHandler('')
            titleInputHandler('')
        }, 150)
    }, [isAddItemPopupOpen])

    const popupOpenMod = isAddItemPopupOpen === true ? `${style.openPopup}` : ''

    return (
        <div className={classNames(`${style.popupWrapper}`, popupOpenMod)}>
            <div className={style.popupInnerWrapper}>
                <div className={style.additemWrapper}>
                    <input 
                        className={style.addItemTitle} 
                        type="text" 
                        placeholder='Заголовок'
                        value={titleInput}
                        onChange={(e) => titleInputHandler(e.target.value)}
                    />
                    <textarea 
                        className={style.addItemDescription} 
                        type="text" 
                        placeholder='Описание' 
                        value={descriptionInput}
                        onChange={(e) => descriptionInputHandler(e.target.value)}
                    />
                    <div
                        className={style.addItemButton}
                        onClick={() => addTodoHandler()}
                    >Добавить</div>
                </div>
            </div>
        </div>
    )
}