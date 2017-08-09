import React from 'react';
import SearchIcon from 'material-ui-icons/Search';
import Input from 'material-ui/Input';
import {createStyleSheet, withStyles} from 'material-ui/styles';

const stylesheet = createStyleSheet({
    icon: {
        paddingRight: '6px',
    },
    root: {
        alignItems: 'center',
        background: 'rgba(0,0,0,0.15)',
        display: 'flex',
        padding: '6px',
    },
    textFieldContainer: {
        flex: 1,
    }
});

const TextFilter = ({
                        classes,
                        fullWidth,
                        onChange,
                    }) => (
    <div className={classes.root}>
        <SearchIcon className={classes.icon} />
        <div className={classes.textFieldContainer}>
            <Input
                disableUnderline
                fullWidth={fullWidth}
                onKeyUp={onChange}
            />
        </div>
    </div>
);

export default withStyles(stylesheet)(TextFilter);
