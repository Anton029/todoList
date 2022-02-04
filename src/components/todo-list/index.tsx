import React,  { useContext }  from 'react'
import { ListItem } from './todo-item'
import style from './style.module.css'
import { globalStateContext } from '../../globalState'

export interface AllProps {
    list: [{title: string, checked: boolean, description: string, id: boolean}]
}

export const TodoList = (props: AllProps) => {
    const [ todoList, setTodoList ] = useContext(globalStateContext)

    return (
        <div className={style.listContainerWrapper}>
            <div className={style.listContainer}>
                <div className={style.listWrapper}>
                    {todoList.length === 0 ?
                        <div className={style.emptyList}>Пока что список задач пустой</div>
                        :
                        <div className={style.list}>
                            {todoList.map((item) => 
                                <ListItem 
                                    title={item.title} 
                                    checked={item.checked}
                                    description={item.description}
                                    key={item.id}
                                    id={item.id}
                                />
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
