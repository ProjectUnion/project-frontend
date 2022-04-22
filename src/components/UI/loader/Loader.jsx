import React from 'react';
import classes from './Loader.module.css'

const Loader = () => {
    return (
		<div className={classes.loader}>
			<div className={classes.preloader}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		</div>
    );
};

export default Loader;