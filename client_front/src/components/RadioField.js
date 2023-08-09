import React from "react"

export default function RadioField({ label, ...props }) {
    const register = props.register
    return (
        <div style={{ marginRight: "1rem" }}>
            {label ? (
                <label htmlFor={props?.name}>{label}</label>
            ) : (
                <div>
                    <>
                        <label
                            style={{ fontSize: "15px" }}
                            htmlFor={props?.name}
                        >
                            {props?.value}
                        </label>
                        <input
                            type={props?.type}
                            name={props?.name}
                            value={props?.value}
                            checked={props?.isCheck}
                            onChange={props?.handleChange}
                            {...register(props?.name)}
                        />
                    </>
                </div>
            )}
        </div>
    )
}

