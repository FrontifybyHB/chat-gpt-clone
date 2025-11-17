import React from 'react'

const PermissionModel = (props) => {
    const { downloadLocalLLM, useAPIMode } = props
    return (
        <>
            <div className="permission-modal">
                <div className="modal-content">
                    <h2>🤖 Local AI Assistant</h2>
                    <p>Would you like to download a local AI model for offline chat?</p>
                    <div className="warning">
                        <strong>⚠️ Warning:</strong>
                        <ul>
                            <li>Model size: ~4-5GB download</li>
                            <li>Requires significant GPU/CPU resources</li>
                            <li>First-time setup may take several minutes</li>
                            <li>Works completely offline once downloaded</li>
                        </ul>
                    </div>
                    <div className="modal-buttons">
                        <button onClick={downloadLocalLLM} className="download-btn">
                            Download Local Model
                        </button>
                        <button onClick={useAPIMode} className="api-btn">
                            Use Online API Instead
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PermissionModel
