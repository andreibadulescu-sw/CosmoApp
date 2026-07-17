import { useState, useContext, useEffect } from 'react';
import { journalEntry } from "../model/journalEntry";
import { APIDataContext } from '../App';
import styled from 'styled-components';

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
        <ViewerDiv>
            <title>APOD Query Result</title>
            <div id="ItemView">
                <h1>
                    {apiData[pageIndex].title}
                </h1>
                <img src={apiData[pageIndex].url} alt={apiData[pageIndex].title}/>
                <p><i>Media is dated {apiData[pageIndex].date}</i></p>
                <p>{apiData[pageIndex].explanation}</p>
            </div>
            <NaviDiv>
                <NaviButton type="button" disabled={!canGoBackwards()} onClick={goBackwards}>{goBackwardsIcon}</NaviButton>
                <p>Element {pageIndex + 1} of {apiData.length}</p>
                <NaviButton type="button" disabled={!canGoForward()} onClick={goForward}>{goForwardIcon}</NaviButton>
            </NaviDiv>
            <ExitButton type="reset" onClick={() => {setAPIData([])}}>Exit</ExitButton>
        </ViewerDiv>
    );
}

const ExitButton = styled.button`
    background: darkred;
    color: white;
    font-size: 1em;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 7px 12px;
`;

const NaviButton = styled.button`
    color: white;
    font-size: 1em;
    padding: 3px 7px;
    border: none;
    border-radius: 9px;
`;

const ViewerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 40px;
`;

const NaviDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    margin-top: 50px;
    margin-bottom: 100px;
`;