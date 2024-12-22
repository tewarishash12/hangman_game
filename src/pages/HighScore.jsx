import React from 'react'
import Sidebar from '../components/Sidebar'

function HighScore({isCollapsed, setIsCollapsed}) {
    return (
        <div>
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
    )
}

export default HighScore