import React from 'react'
import classes from "./TimeAttendence.module.css"
import ComponentsFormDatePickerRange from '../Reusable/range/components-form-date-picker-range'

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import UserList from '../user-management/UserList';
import ListAttendanceTable from './ListAttendanceTable';

function TimeSheet() {
    return (
        <div>
            <div className='flex justify-start items-center'>
                <h1 className={classes.timesheet}>TimeSheet</h1>
                <ComponentsFormDatePickerRange />
            </div>
            <div className={classes.overallpay}>
                <div className={classes.pay}>
                    <p>Start of Pay: <b>1 Sep</b> </p>
                    <p>End of Pay: <b>30 Sep</b> </p>
                </div>
                <div className="flex justify-evenly items-center mb-10 container-fluid">
                    <Tippy content="working" placement="bottom">
                        <p className={classes.day}>1</p>
                    </Tippy>
                    <Tippy content="working" placement="bottom">
                        <p className={classes.day}>2</p>
                    </Tippy>
                    <p className={classes.day}>3</p>
                    <p className={classes.day}>4</p>
                    <p className={classes.day}>5</p>
                    <p className={classes.day}>6</p>
                    <p className={classes.day}>7</p>
                    <p className={classes.day}>8</p>
                    <p className={classes.day}>9</p>
                    <p className={classes.day}>10</p>
                    <p className={classes.day}>11</p>
                    <p className={classes.day}>12</p>
                    <p className={classes.day}>13</p>
                    <p className={classes.day}>14</p>
                    <p className={classes.day} >15</p>
                    <p className={classes.day}>16</p>
                    <p className={classes.day}>17</p>
                    <p className={classes.day}>18</p>
                    <p className={classes.day}>19</p>
                    <p className={classes.day}>20</p>
                    <Tippy content="leave" placement="bottom">
                        <p className={classes.leaveday}>21</p>
                    </Tippy>
                    <p className={classes.leaveday}>22</p>
                    <p className={classes.leaveday}>23</p>
                    <p className={classes.leaveday}>24</p>
                    <p className={classes.day}>25</p>
                    <p className={classes.day}>26</p>
                    <p className={classes.day}>27</p>
                    <p className={classes.day}>28</p>
                    <p className={classes.day}>29</p>
                    <p className={classes.day}>30</p>
                    <p className={classes.day}>31</p>
                </div>

            </div>
            <ListAttendanceTable />

        </div>
    )
}

export default TimeSheet