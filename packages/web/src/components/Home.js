import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
    <div>
        <h1>Home</h1>
        <Link to="/i-dont-exist">Non-existant page</Link>
    </div>
);
