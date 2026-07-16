import { useState, useContext, useEffect } from 'react';
import { journalEntry } from "../model/journalEntry";
import { APIDataContext } from '../App';

export function ResultViewer() {
    const {apiData, setAPIData} = useContext(APIDataContext);
    const [pageIndex, setPageIndex] = useState(0);

    const placeholder = new journalEntry("1", "2", "3", "4");
    const goBackwardsIcon = "<";
    const goForwardIcon = ">";

    function goBackwards() {
        setPageIndex(pageIndex - 1);
    }

    function canGoBackwards() {
        return pageIndex > 0;
    }

    function goForward() {
        setPageIndex(pageIndex + 1);
    }

    function canGoForward() {
        return apiData.length - pageIndex > 1;
    }

    return (
        <div id="ResultViewer">
            <title>APOD Query Result</title>
            <div id="ItemView">
                <h1>
                    {apiData[pageIndex].title}
                </h1>
                <img src={apiData[pageIndex].url} alt={apiData[pageIndex].title}/>
                <p>Media is dated {apiData[pageIndex].date}</p>
                <p>{apiData[pageIndex].explanation}</p>
            </div>
            <div id ="ResultViewerControls">
                <button type="button" disabled={!canGoBackwards()} onClick={goBackwards}>{goBackwardsIcon}</button>
                <p>Element {pageIndex + 1} of {apiData.length}</p>
                <button type="button" disabled={!canGoForward()} onClick={goForward}>{goForwardIcon}</button>
            </div>
            <button type="reset" onClick={() => {setAPIData([])}}>Exit</button>
        </div>
    );
}