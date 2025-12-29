import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service'
import { addOrderFromSocket } from '../store/actions/order.actions'

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBus.on('show-msg', msg => {
            setMsg(msg)
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 5000)
        })

        socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
            showSuccessMsg(`New review about me ${review.txt}`)
        })

        socketService.on('order-added', (order) => {
            addOrderFromSocket(order)

            const newMsg = {
                type: 'success',
                title: 'New booking confirmed!',
                txt: `${order.guest.fullname} booked ${order.stay.name}.`,
                imgUrl: order.stay.imgUrl
            }

            setMsg(newMsg)

            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
                timeoutIdRef.current = null
            }
            timeoutIdRef.current = setTimeout(closeMsg, 5000)
        })

        return () => {
            unsubscribe()
            socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
            socketService.off('order-added')
        }
    }, [])


    function closeMsg() {
        setMsg(null)
    }

    function msgClass() {
        return msg ? 'visible' : ''
    }

    if (!msg) return null

    const txtToRender = typeof msg.txt === 'string' ? msg.txt : JSON.stringify(msg.txt)

    return (
        <section className={`user-msg ${msgClass()} ${msg.type || ''}`}>

            {msg.imgUrl && (
                <div className="user-msg-img-container">
                    <img src={msg.imgUrl} alt="" />
                </div>
            )}

            <div className="user-msg-content">
                {msg.title && <h4 className="user-msg-title">{msg.title}</h4>}

                <p className="user-msg-text">{txtToRender}</p>
            </div>

            <button className="close-btn" onClick={closeMsg}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: 3, overflow: 'visible' }} aria-hidden="true" role="presentation" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
            </button>
        </section>
    )
}
