import React from "react"

export default function TextField({ label, ...props }) {
    const register = props.register
    var today = new Date()
    var date = today.getDate()
    var month = today.getMonth() + 1
    var year = today.getUTCFullYear()
    if (month < 10) {
        month = "0" + month
    }
    if (date < 10) {
        date = "0" + date
    }
    var maxdate = year + "-" + month + "-" + date
    const value = props.value
    return (
        <div style={{ marginRight: "1rem" }}>
            <div>
                <div>
                    {props.type === "submit" ? (
                        <>
                            <button
                                type={props.type}
                                name={props.name}
                                value={props.name}
                                style={{ marginTop: "1rem" }}
                            >
                                {props.name}
                            </button>
                        </>
                    ) : (
                        <div>
                            {props.type === "button" ? (
                                <>
                                    <input
                                        type={props.type}
                                        name={props.name}
                                        onClick={props.handle}
                                        value={label}
                                        style={{ marginTop: "1rem" }}
                                    ></input>
                                </>
                            ) : (
                                <div>
                                    {props.name === "dateOfBirth" ? (
                                        <>
                                            <label
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    flexWrap: "wrap",
                                                }}
                                                htmlFor={props.name}
                                            >
                                                {label}
                                            </label>
                                            <input
                                                type={props.type}
                                                name={props.name}
                                                onChange={props.handleChange}
                                                value={props.value}
                                                max={maxdate}
                                                {...register("dateOfBirth")}
                                            ></input>
                                        </>
                                    ) : (
                                        <>
                                            <label htmlFor={props.name}>
                                                {label}
                                            </label>
                                            <input
                                                type={props.type}
                                                name={props.name}
                                                onChange={props.handleChange}
                                                min={maxdate}
                                                placeholder={props.placeholder}
                                                {...register(props.name)}
                                                // setValue(props.name,)
                                            ></input>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
