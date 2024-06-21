import React from 'react'
import { useState, useReducer } from 'react'

const Counter = () => {
    const countReducer = (state, action) => {
        switch (action.type) {
            case "add":
                return state + 1;
            case "subtract":
                return state - 1;
        }
    }

    const [count, dispacth] = useReducer(countReducer, 0)


    return (
        <>
            <div className="div">
                <button onClick={() => dispacth({ type: "add" })}>+</button>
                <h1>{count}</h1>
                <button onClick={() => dispacth({ type: "subtract" })}>-</button>

            </div>
        </>
    )
}

export default Counter