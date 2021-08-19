import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    width: '95%',
    height: 55,
    backgroundColor: "#45a29e",
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    padding: '0 !important',
  },
});

export default function TableRows(props) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root} >
        <CardContent className={classes.content} >
          <p>David Tennant</p>
          <p>
            <Rating
              name="candidate1"
              precision={0.5} />
          </p>
          <p>Satisfactory</p>
          <p>Selected</p>
          <p>23/1/19</p>
        </CardContent>
      </Card>
    </>
  );
}