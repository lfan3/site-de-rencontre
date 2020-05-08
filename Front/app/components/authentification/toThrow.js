export class SignUpForm extends Component {
    state = {
        username : '',
        email : '',
        passwd : '',
        confPasswd : '',
        error : {
            username : '',
            email : '',
            passwd : '',
            confPasswd : ''
        }
    }
    handleChange = (e)=>{
        let target = e.target
        let {name, value} = target
        let {error} = this.state
        let {passwd} = this.state
        switch(name){
            case 'username' :
                error.username = valideUsername(value)
            break;
            case 'email' :
                error.email = valideEmailRegex.test(value) 
                ? '' 
                : 'This is not a valid Email';
            break;
            case 'passwd': 
                error.passwd = validePass(value)
            break;
            case 'confPasswd':
                error.confPasswd = stringCompare(passwd, value)
            break;
        }
        this.setState({
            [name] : value,
            error,
        })
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        let {username, email, passwd,confPasswd, error} = this.state
        let {signedup} = this.props
        let content = {
            username,
            email, 
            passwd,
            confPasswd
        }
        let empty = emptyInput(content)
        if(valideForm(error) && empty === false){
            this.sendEmailApi()
            signedup()
            console.log('valide')
        }else{
            console.log('not valide form')
           // console.log(error)
        }
    }
    sendEmailApi = async()=>{
        let param = 'signup'
        let data = this.state
        let auth = authPost(param, data)
        console.log(auth)
        let res = await Axios(auth)
        console.log(res)
    }
    render(){
        let {error} = this.state
        return(
            <div className = 'FormContainer'>
                <form className = 'FormeFields' onSubmit = {this.handleSubmit}>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='username' className='whiteLetters'>Username</label>
                        <input
                            type = 'text'
                            id = 'username'
                            name = 'username'
                            placeholder = 'create your username'
                            //very react way to handle the formulaire
                            value = {this.state.username}
                            onChange = {this.handleChange}
                        />
                        {error.username.length > 0 && <span style = {{color : "red"}}> {error.username} </span>}
                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='email' className='whiteLetters' >Email</label>
                        <input
                            type = 'text'
                            id = 'email'
                            name = 'email'
                            placeholder = 'fill your email adress'
                            //very react way to handle the formulaire
                            value = {this.state.email}
                            onChange = {this.handleChange}
                        />
                        {error.email.length > 0 && <span style = {{color : "red"}}> {error.email} </span>}

                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='passwd' className='whiteLetters'>Password</label>
                        <input
                            type = 'text'
                            id = 'passwd'
                            name = 'passwd'
                            placeholder = 'create your password'
                            //very react way to handle the formulaire
                            value = {this.state.passwd}
                            onChange = {this.handleChange}
                        />
                        {error.passwd.length > 0 && <span style = {{color : "red"}}> {error.passwd} </span>}
                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='confPasswd' className='whiteLetters'>Confirme your password</label>
                        <input
                            type = 'text'
                            id = 'confPasswd'
                            name = 'confPasswd'
                            placeholder = 'create your username'
                            //very react way to handle the formulaire
                            value = {this.state.confPasswd}
                            onChange = {this.handleChange}
                        />
                        {error.confPasswd.length > 0 && <span style = {{color : "red"}}> {error.confPasswd} </span>}
                    </div>
                    <div className= "submitButton"> 
                        <button id='submit' className ='submit-button whiteLetters'>
                           Sign Up
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}