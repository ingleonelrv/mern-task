import React,{Component} from 'react'
import {render} from 'react-dom'

class App extends Component{
    constructor(){
        super()
        this.state={
            title:'',
            description:'',
            tasks:[],
            _id:''
        }
        this.addTask=this.addTask.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
    componentDidMount(){
        this.fetchTask()
    }
    // GUARDO la tarea en la BD con la consulta FETCH
    addTask(event){
        if(this.state._id){
            fetch(`/api/task/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'aplication/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                M.toast({html:'Task Updated'})
                this.setState({title:'', description:'',_id:''})
                this.fetchTask()
            })
        }else{
            console.log(this.state)
            //ENVIO la peticion al servidor
            fetch('/api/task',{
                method:'POST',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'aplication/json',
                    'Content-Type':'application/json'
                }
            }).then(res => res.json())
            .then( data => {
                console.log(data)
                //alert de materialize
                M.toast({html:'Task Saved'})
                //limpio el estado q esta vinculado al input
                this.setState({title:'',description:''})
                //cuando se guarde la tarea vuelvo a cargarlas
                this.fetchTask()
            })
            .catch(err => console.error(err));
        }
        //previene que se recargue la pagina
        event.preventDefault()
    }
    //Consulto las tareas en la BD
    fetchTask(){
        //por defecto fech hace peticion GET
        fetch('/api/task')
        .then(res=> res.json())
        .then(data=>{
            this.setState({tasks:data})
            console.log(this.state.tasks)
        })
    }
    //ELIMINO una tarea
    deleteTask(id){
        if(confirm('Are you sure you want to delete it?')){
            fetch(`/api/task/${id}`,{
                method:'DELETE',
                headers:{
                    'Accept':'aplication/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                M.toast({html:'Task Deleted'})
                this.fetchTask()
            })
            .catch(err=>console.error(err))
        }
    }
    //EDITAR
    editTask(id){
        //podria haber pasado de una sola vez los datos pero hare la consulta para uso educativo
        fetch(`/api/task/${id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({
                title:data.title,
                description:data.description,
                _id:data._id
            })
        })
    }
    //cuando el usuario escriba algo lo capturamos
    handleChange(event){
        //obtengo name, value del input que este cambiando
        const {name, value}=event.target
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <div>
                {/* NAVIGATION could be used with router */}
                <nav className='light-blue darken-4'>
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Task</a>
                    </div>
                </nav>

                {/* APLICATION */}
                <div className='container'>
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                {/* Lanzar un envento al dar click al boton */}
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} type="text" name="title" placeholder="Task Title" value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea onChange={this.handleChange} type="text" name="description" className="materialize-textarea" placeholder="Task Description" value={this.state.description} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task=>{
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick={()=>this.editTask(task._id)} className="btn light-blue darken-4"><i className="material-icons">edit</i></button>
                                                        <button onClick={()=>this.deleteTask(task._id)} className="btn light-blue darken-4" style={{margin:'4px'}}><i className="material-icons">delete</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default App