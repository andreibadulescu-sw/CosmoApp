import React from 'react'
import { useState } from 'react';
import { Component2 } from './Component2'
import { Component3 } from './Component3'

export const ComponentContext = React.createContext();

export function Component1() {
    const [clickCount, setClickCount] = useState(0);
    const val = {clickCount, setClickCount};

    return(
        <ComponentContext.Provider value={val}>
            <div>
                <Component2/>
                <Component3/>
            </div>
        </ComponentContext.Provider>
    )
}

export default ComponentContext;