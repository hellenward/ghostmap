import React from 'react';
import './ghostmodal.css';

export const GhostModal = ({ ghost, onClose }) => {
    return (
        <div className="ghost-modal" data-testid="ghost-modal">
            <div className="ghost-modal-content">
                <h2>{ghost.name}</h2>
                <h3>{ghost.subtitle}</h3>
                <p>{ghost.story}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default GhostModal;
