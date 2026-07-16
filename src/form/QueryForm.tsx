import { useState, useEffect } from 'react'
import { QueryType } from '../model/queryType'
import React from 'react';
import DatePicker from 'react-datepicker';

export function CosmoQuery() {
    const [queryType, setQueryType] = useState(QueryType.Today);
    const [startDate, setStardDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [count, setCount] = useState(0);

    function changeQueryType(value: string) {
        setQueryType(value as QueryType);
        console.log(value);
    }

    function decreaseCount() {
        setCount(count - 1);
    }

    function increaseCount() {
        setCount(count + 1);
    }

    function Fields() {
        switch (queryType) {
        case QueryType.Date:
            return (
                <div>
                    <label>
                        Querying for
                        <DatePicker selected={startDate} onChange={(newStartDate) => setStardDate(newStartDate)} />
                    </label>
                </div>
            );
        case QueryType.Interval:
            return (
                <div>
                    <label>
                        Query interval starts
                        <DatePicker selected={startDate} onChange={(newStartDate) => setStardDate(newStartDate)} />
                    </label>
                    <label>
                        Query interval ends
                        <DatePicker selected={endDate} onChange={(newEndDate) => setEndDate(newEndDate)} />
                    </label>
                </div>
            );
        case QueryType.Random:
            return (
                <div>
                    <button type="button" onClick={decreaseCount}>-</button>
                    <button type="button" onClick={increaseCount}>+</button>
                    <label>{count} random elements</label>
                </div>
            );
        default:
            return null;
        }
    }

    return(
        <form>
            <label>
                Query type
                <select name="selectedQueryType" value={queryType} onChange={ev => changeQueryType(ev.target.value)}>
                    <option value={QueryType.Today}>{QueryType.Today}</option>
                    <option value={QueryType.Date}>{QueryType.Date}</option>
                    <option value={QueryType.Interval}>{QueryType.Interval}</option>
                    <option value={QueryType.Random}>{QueryType.Random}</option>
                </select>
            </label>
            <Fields/>
        </form>
    );
}