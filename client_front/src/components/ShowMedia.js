import React from "react"

function ShowMedia({ e }) {
    return (
        <div>
            <img
                src={`/${e?.filePath?.split("/").pop()}`}
                alt={e.fileName}
                style={{
                    height: "70px",
                    width: "80px",
                }}
            ></img>
        </div>
    )
}

export default ShowMedia
