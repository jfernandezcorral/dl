import React from 'react'
import estilos from './BostonHousing.scss'
import {getData, arraysToTensors} from 'data/BostonHousing'
import {computeBaseline,
    linearRegressionModel,
    multiLayerPerceptronRegressionModel1Hidden,
    multiLayerPerceptronRegressionModel2Hidden,
    run} from 'data/models'
import cn from "classnames/bind"

const cx = cn.bind(estilos)
export default class BostonHousing extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            data: undefined,
            tensors: undefined,
            result:{}
        }
        this.loadData = this.loadData.bind(this)
        this.train = this.train.bind(this)
    }
    componentDidMount(){
    }
    loadData(){
        getData().then(data=>{
            const tensors = arraysToTensors(data)
            const [mean, loss] = computeBaseline(tensors)
            this.setState({data, tensors, msg: `Baseline loss (meanSquaredError) es: ${loss}`})
        })
    }
    train(){
        const {tensors} = this.state
        this.setState({result: {}})
        this.modelo = multiLayerPerceptronRegressionModel1Hidden(tensors.numFeatures)
        run(this.modelo, tensors, this.vis).then(data=> this.setState({result: data}))
    }
    render() {
        const {data, msg, result} = this.state
        return (
        	<div className={cx('root')}>
        		<div>
                    <p>Carga del modelo</p>
                    <button disabled={!!data} onClick={this.loadData}>Cargar</button>
                    {data && <div>
                    {Object.keys(data).map(key=><p key={key}>{key}({data[key].length})({data[key][0].length})</p>)}
                    <div>{msg}</div>
                    <button disabled={!data} onClick={this.train}>Train</button>
                    <div style={{width: '600px'}} ref={o=>this.vis=o}></div>
                    <pre>
                        Resultado
                        {JSON.stringify(result, null, 4)}
                    </pre>
                    </div>}
                </div>
        	</div>
        );
    }
}