import React from 'react';

class SendMsg extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState ({
            text: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.text);
    }

    render() {
        return <div>
            <form action="" onSubmit = {this.onSubmit}>
                <input type="text" placeholder="username" onChange = {this.onChange} />
                <br/>
                <input type="submit" value="SEND" />
            </form>
        </div>
    }
}

export default SendMsg;