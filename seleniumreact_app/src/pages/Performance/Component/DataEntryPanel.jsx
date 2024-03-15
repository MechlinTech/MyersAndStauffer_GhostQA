import { Box, Grid, OutlinedInput } from '@material-ui/core'
import React from 'react'
import { StyledFormControl, StyledOutlinedInput } from './style'

export default function DataEntryPanel() {
  return (
    <Box style={{
        border: "solid 2px #DADADA",
        borderRadius: "5px",
      }}>
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                <Grid item xs={12} md={6}>
                    <Box>
                        file name
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <StyledFormControl>
                    <StyledOutlinedInput type='file'/>
                </StyledFormControl>
                
            </Grid>
        </Grid>
    </Box>
  )
}
