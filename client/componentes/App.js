import React from 'react';
import estilos from'./App.scss';
import {HelpLayoutModal} from "./Modal"
import {test} from 'client/services'
import cn from 'classnames/bind'
const cx = cn.bind(estilos)
export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        test('23').then(console.log)
    }
    render() {
        return (
        	<div>
        		<HelpLayoutModal className={estilos.mensajePopupSimple}>
                    <div className={estilos.cabecera}>Contenido no disponible</div>
                    <div className={estilos.texto}>Actualmente no hay ningún contenido disponible en este apartado.</div>
                    <div className={estilos.botones}><button onClick={window.close} className={cx('boton', 'positivo', 'ico')}>Aceptar</button></div>
                </HelpLayoutModal>
        	</div>
        );
    }
}