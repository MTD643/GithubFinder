import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clear: PropTypes.func.isRequired,
        hasData: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { text } = this.state;

        if (text === '') {
            this.props.setAlert('Please search something', 'light');
        }
        else {
            this.props.searchUsers(text);
            this.setState({
                text: ''
            })
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let clearButton = null;
        const { hasData, clear } = this.props;
        if (hasData) {
            clearButton =
                <button
                    className="btn btn-light btn-block"
                    onClick={clear}
                >
                    Clear
                </button>
        }
        return (
            <div>
                <form
                    onSubmit={this.onSubmit}
                    className='form'
                >
                    <input
                        type='text'
                        name='text'
                        placeholder='Search Users...'
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input
                        type='submit'
                        value='Search'
                        className='btn btn-dark btn-block'
                    />
                </form>
                {clearButton}
            </div>
        );
    }
}

export default Search;
