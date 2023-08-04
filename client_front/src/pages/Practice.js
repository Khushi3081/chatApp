import React, { useEffect, useRef } from "react"

function Practice() {
    const message = useRef(null)
    useEffect(() => {
        const messageBody = message.current
        messageBody.scrollTop =
            messageBody.scrollHeight - messageBody.clientHeight
    })
    return (
        <div
            style={{ maxHeight: "250px", overflow: "auto" }}
            className='msg-body'
            ref={message}
        >
            <div style={{ height: "500px" }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio,
                doloremque. Ut officiis earum aspernatur veritatis enim sit
                provident optio, deleniti adipisci laudantium quis neque
                sapiente distinctio aliquam iusto eveniet reprehenderit? Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Atque non
                dolore pariatur eveniet quam laboriosam, earum delectus quia,
                voluptatum nostrum voluptas quos facere, aliquam nihil mollitia
                impedit alias perferendis debitis. Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Et aperiam distinctio ullam
                placeat sapiente exercitationem officia harum, praesentium
                rerum. Voluptate, ipsam optio? Porro commodi minima
                voluptatibus, voluptate illo ipsam in.Lorem ipsum dolor sit,
                amet consectetur adipisicing elit. Odio, doloremque. Ut officiis
                earum aspernatur veritatis enim sit provident optio, deleniti
                adipisci laudantium quis neque sapiente distinctio aliquam iusto
                eveniet reprehenderit? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Atque non dolore pariatur eveniet quam
                laboriosam, earum delectus quia, voluptatum nostrum voluptas
                quos facere, aliquam nihil mollitia impedit alias perferendis
                debitis. Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Et aperiam distinctio ullam placeat sapiente
                exercitationem officia harum, praesentium rerum. Voluptate,
                ipsam optio? Porro commodi minima voluptatibus, voluptate illo
                ipsam in. Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Odio, doloremque. Ut officiis earum aspernatur veritatis
                enim sit provident optio, deleniti adipisci laudantium quis
                neque sapiente distinctio aliquam iusto eveniet reprehenderit?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                non dolore pariatur eveniet quam laboriosam, earum delectus
                quia, voluptatum nostrum voluptas quos facere, aliquam nihil
                mollitia impedit alias perferendis debitis. Lorem, ipsum dolor
                sit amet consectetur adipisicing elit. Et aperiam distinctio
                ullam placeat sapiente exercitationem officia harum, praesentium
                rerum. Voluptate, ipsam optio? Porro commodi minima
                voluptatibus, voluptate illo ipsam in.Lorem ipsum dolor sit,
                amet consectetur adipisicing elit. Odio, doloremque. Ut officiis
                earum aspernatur veritatis enim sit provident optio, deleniti
                adipisci laudantium quis neque sapiente distinctio aliquam iusto
                eveniet reprehenderit? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Atque non dolore pariatur eveniet quam
                laboriosam, earum delectus quia, voluptatum nostrum voluptas
                quos facere, aliquam nihil mollitia impedit alias perferendis
                debitis. Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Et aperiam distinctio ullam placeat sapiente
                exercitationem officia harum, praesentium rerum. Voluptate,
                ipsam optio? Porro commodi minima voluptatibus, voluptate illo
                ipsam in.
            </div>
        </div>
    )
}

export default Practice
