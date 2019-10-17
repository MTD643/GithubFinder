import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ setAlert, searchUsers, hasData, clear }) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (text === '') {
            setAlert('Please search something', 'light');
        }
        else {
            searchUsers(text);
            setText('');
        }
    }
    const onChange = (e) => {
        setText(e.target.value);
    }

    let clearButton = null;

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
                onSubmit={onSubmit}
                className='form'
            >
                <input
                    type='text'
                    name='text'
                    placeholder='Search Users...'
                    value={text}
                    onChange={onChange}
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

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    hasData: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search;
