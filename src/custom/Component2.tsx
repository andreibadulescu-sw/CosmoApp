import { useState, useContext } from 'react'
import ComponentContext from './Component1';

export function Component2() {
    const {clickCount, setClickCount} = useContext(ComponentContext);

    function incrementClickCount() {
        setClickCount(clickCount + 1);
    }

    return(
        <div>
            <button onClick={incrementClickCount}>
                Click me! :D
            </button>
        </div>
    );
}