import React, { useState, useEffect, useRef } from 'react';
import './Popover.css';

const Popover = ({ children, defaultHeight, isOpen }) => {
    const [popoverHeight, setPopoverHeight] = useState(0);
    const popoverRef = useRef(null);

    useEffect(() => {
        setPopoverHeight(defaultHeight);
    },[defaultHeight])

    return (
        <div className={`popover-container ${isOpen ? 'open' : ''}`} style={{ height: `${popoverHeight}px` }}>
            <div
                className="popover-content backdrop"
                ref={popoverRef}
            >
                {children}
            </div>
        </div>
    );
};

export default Popover;
