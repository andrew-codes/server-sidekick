import React from 'react';
import TextField from 'material-ui/TextField';

const TextFilter = ({
                        fullWidth,
                        onChange,
                    }) => (
    <TextField
        fullWidth={fullWidth}
        InputProps={{
            fullWidth,
            onKeyDown: onChange,
        }}
    />

);

export default TextFilter;
