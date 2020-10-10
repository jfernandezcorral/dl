import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
const modalRoot = document.getElementById('portal')
import estilos from'./Modal.scss';
import cn from 'classnames/bind'
const cx = cn.bind(estilos)
const Modal = ({children})=>{
    //const [d, setD] = useState(document.createElement('div'))
    const d = document.createElement('div')
    d.classList.add(estilos.pop)
    useEffect(() => {
        modalRoot.appendChild(d)
        return function clean(){
            modalRoot.removeChild(d)
        }
    }, [])
    return ReactDOM.createPortal(children, d)
}
const HelpLayoutModal = ({children, className})=>{
    return (
        <Modal>
        <div className={estilos.velo}></div>
        <div className={[cx('client'),className].join(" ")}>{children}</div>  
        </Modal>
    )
}
export default Modal
export {HelpLayoutModal}