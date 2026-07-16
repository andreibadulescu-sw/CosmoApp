import { useState, useEffect } from 'react'
import { QueryType } from '../model/queryType'
import React from 'react';

export function CosmoQuery() {
    const [queryType, setQueryType] = useState(QueryType.Today);

    function changeQueryType(value: string) {
        setQueryType(value as QueryType);
        console.log(value);
    }

    return(
        <form>
            <label>
                Query type:
                <select name="selectedQueryType" value={queryType} onChange={ev => changeQueryType(ev.target.value)}>
                    <option value={QueryType.Today}>{QueryType.Today}</option>
                    <option value={QueryType.Date}>{QueryType.Date}</option>
                    <option value={QueryType.Interval}>{QueryType.Interval}</option>
                </select>
            </label>
        </form>
    );
}