import React from 'react'

const DowloadProgress = () => {
    // const { downloadProgress } = props
  return (
    <>
      <div className="download-progress">
                    <h3>Downloading AI Model...</h3>
                    {/* <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${downloadProgress}%` }}
                        ></div>
                    </div> */}
                    <p> It will take a while to complete</p>
                </div>
    </>
  )
}

export default DowloadProgress
