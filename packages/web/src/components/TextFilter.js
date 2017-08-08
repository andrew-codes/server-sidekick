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
            onKeyUp: onChange,
        }}
    />

);

export default TextFilter;
