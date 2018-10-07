import React from 'react';

class User extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState ({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.username);
    }

    render() {
        return <div>
            <form action="" onSubmit = {this.onSubmit}>
                <input type="text" placeholder="username" onChange = {this.onChange} />
                <br/>
                <input type="submit" value="CHAT" />
            </form>
        </div>;
    }
}

export default User;