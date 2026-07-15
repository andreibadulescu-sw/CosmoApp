import { useState, useEffect } from 'react'
import NASALogo from '../assets/nasa.svg'
import './NASAInfo.css'

export function NASAInfo() {
    const logoCountStorageKey = "LOGOCOUNT";
    
    const [logoCount, setLogoCount] = useState(() => {
        const value = localStorage.getItem(logoCountStorageKey);
        if (value !== null)
            return JSON.parse(value);
        else
            return 0;
    });

    const [hiddenMesg, setHiddenMesg] = useState("");

    function incrementLogoCount() {
        setLogoCount(logoCount + 1);
    }

    useEffect(() => {
        localStorage.setItem(logoCountStorageKey, JSON.stringify(logoCount));

        if (logoCount % 5 === 0 && logoCount !== 0) {
            setHiddenMesg("Artemis 1 launch successful!");
        } else {
            setHiddenMesg("");
        }
    }, [logoCount]);
    
    return (
        <div id="NASAInfo">
            <button className="nasaicon" onClick={incrementLogoCount}>
                <img src={NASALogo} className="icon" height="360" alt="NASA logo"/>
            </button>
            <title>About NASA</title>
            <p>
                The <b>National Aeronautics and Space Administration</b> is an independent agency of the U.S. federal government responsible for the United States' civil space program and for research in aeronautics and space.
            </p>
            <p>
                {hiddenMesg}
            </p>
            <br></br>
            <p>
                NASA maintains extensive ground and communications infrastructure, including the Deep Space Network and the Near Earth Network. Its science programs focus on Earth observation through the Earth Observing System, heliophysics research, Solar System exploration with robotic missions such as New Horizons and the Perseverance rover, and astrophysics investigations using space-based observatories including the James Webb Space Telescope and the Hubble Space Telescope. The Launch Services Program oversees launch operations for uncrewed launches.
            </p>
        </div>
    )
}