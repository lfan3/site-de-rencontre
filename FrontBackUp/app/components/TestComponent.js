import React from 'react'

export default class TestComponent extends React.Component{
    state = {
        id : 2,
        sex : 'man'
    }
    componentDidMount(){
        this.setState({id : 5})
    }
    render(){
        console.log(this.state)
        return(
            <div>{this.state.id}</div>
        )
    }
}