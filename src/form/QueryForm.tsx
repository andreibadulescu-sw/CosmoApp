import { useState, useEffect, useContext } from 'react';
import { QueryType } from '../model/queryType';
import { journalEntry } from "../model/journalEntry";
import DatePicker from 'react-datepicker';
import NASALogo from '../assets/nasa.svg';
import { APIDataContext } from '../App';
import { getMultiple, getSpecific, getRandom } from "../services/dataHandler";

import "react-datepicker/dist/react-datepicker.css";
import './QueryForm.css'

export function CosmoQuery() {
    const [queryType, setQueryType] = useState(QueryType.Today);
    const [startDate, setStardDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [count, setCount] = useState(1);
    const [errorMesg, setErrorMesg] = useState("");
    const {apiData, setAPIData} = useContext(APIDataContext);

    useEffect(() => {
        console.log(errorMesg);
        // TODO: Add error message and submit disable until changes are made
    }, [errorMesg]);

    function changeQueryType(value: string) {
        setQueryType(value as QueryType);
        console.log(value);
    }

    function decreasePossible() {
        return !(count > 1);
    }

    function decreaseCount() {
        setCount(count - 1);
    }

    function increaseCount() {
        setCount(count + 1);
    }

    async function prepareAndSendQuery() {
        if (startDate >= new Date()) {
            setErrorMesg("Invalid Start Date!");
            return;
        }

        if (endDate < startDate || endDate >= new Date()) {
            setErrorMesg("Invalid End Date!");
            return;
        }

        if (count < 1) {
            setErrorMesg("Counter value should be greater than zero!");
            return;
        }

        let data: journalEntry[];

        switch(queryType) {
        case QueryType.Today:
            data = [await getSpecific(new Date().toISOString().slice(0, 10))];
            break;
        case QueryType.Date:
            data = [await getSpecific(startDate.toISOString().slice(0, 10))];
            break;
        case QueryType.Interval:
            data = await getMultiple(startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10));
            break;
        case QueryType.Random:
            data = await getRandom(count);
            break;
        }

        console.log("Data received! Sending it to the main page...");
        setAPIData(data);
    }

    function Fields() {
        switch (queryType) {
        case QueryType.Date:
            return (
                <div>
                    <label>
                        Querying for
                        <DatePicker selected={startDate} onChange={(newStartDate) => {setStardDate(newStartDate); console.log(newStartDate)}} dateFormat={"dd-MM-YYYY"} />
                    </label>
                </div>
            );
        case QueryType.Interval:
            return (
                <div>
                    <label>
                        Query interval starts
                        <DatePicker selected={startDate} onChange={(newStartDate) => setStardDate(newStartDate)} dateFormat={"dd-MM-YYYY"} />
                    </label>
                    <br/>
                    <label>
                        Query interval ends
                        <DatePicker selected={endDate} onChange={(newEndDate) => setEndDate(newEndDate)} dateFormat={"dd-MM-YYYY"} />
                    </label>
                </div>
            );
        case QueryType.Random:
            return (
                <div>
                    <button type="button" disabled={decreasePossible()} onClick={decreaseCount}>-</button>
                    <button type="button" onClick={increaseCount}>+</button>
                    <label>{count} random elements</label>
                </div>
            );
        default:
            return null;
        }
    }

    return(
        <div id="QueryForm">
            <img src={NASALogo} className="icon" height="360" alt="NASA logo"/>
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
                <button type="button" onClick={prepareAndSendQuery}>
                    Submit query to Cosmo!
                </button>
            </form>
        </div>
    );
}