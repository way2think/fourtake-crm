
import React from 'react';
import classes from "./TimeAttendence.module.css"
import TabsAttendence from '../tabs/tabs-attendence';


const TimeAttendence = () => {


    return (
        <>
            <h1 className={classes.headingtime}>Time & Attendence</h1>
            <TabsAttendence />
        </>
    );
};

export default TimeAttendence;
