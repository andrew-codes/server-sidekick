import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Home = ({builds}) => (
    <div>
        <h1>Home</h1>
        <Link to="/i-dont-exist">Non-existant page</Link>
        {builds.map((build, index) => (<div key={index}>{build.name}</div>))}
    </div>
);

export default connect((state) => ({
    builds: Object.keys(state.builds).map(id => state.builds[id]),
}))(Home);
