import { useState, useContext } from 'react'
import ComponentContext from './Component1';


export function Component4() {
    const {clickCount, setClickCount} = useContext(ComponentContext);

    return(
        <h3>
            This is a counter, at least that is what we intend: {clickCount}
        </h3>
    )
}