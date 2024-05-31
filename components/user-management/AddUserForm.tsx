'use client';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

interface AddUserFormProps {
    saveUser: (value:any) => void;
    setParams?: any;
}
const AddUserForm: React.FC<AddUserFormProps> = ({ saveUser, setParams }) => {
    const submitForm = () => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Form submitted successfully',
            padding: '10px 20px',
        });
    };
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const submitForm4 = Yup.object().shape({
        firstname: Yup.string().required('Please fill the first name'),
        lastname: Yup.string().required('Please fill the last name'),
        username: Yup.string().required('Please choose a userName'),
        email: Yup.string().email('Invalid email').required('Please fill the Email'),
        center: Yup.string().required('Please Select the field'),
        status: Yup.string().required('Please Select the field'),
        phone: Yup.string().test('not-match', 'Invalid phone ', function (phone) {
            if (phone === undefined || phone === null) {
                return false;
            }
            return phoneRegex.test(phone);
        }),
        password: Yup.string().test('not-match', 'Invalid Password ', function (password) {
            if (password === undefined || password === null) {
                return false;
            }
            return passwordRegex.test(password);
        }),
        confirmpassword: Yup.string().test('not-match', 'Invalid Confirm Password ', function (confirmpassword) {
            if (confirmpassword === undefined || confirmpassword === null) {
                return false;
            }
            return passwordRegex.test(confirmpassword);
        }),

        designation: Yup.string().required('Enter Designation'),
        address: Yup.string().required('Enter Address'),
    });
    return (
        <div className="mb-5">
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    center: '',
                    status: '',
                    phone: '',
                    password: '',
                    confirmpassword: '',
                    designation: '',
                    address: '',
                }}
                validationSchema={submitForm4}
                onSubmit={saveUser}
            >
                {({ errors, submitCount, touched, values }) => (
                    <Form className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                            <div className={submitCount ? (errors.firstname ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="firstname">First Name </label>
                                <Field name="firstname" type="text" id="firstname" placeholder="Enter First Name" className="form-input" />

                                {submitCount ? errors.firstname ? <div className="mt-1 text-danger">{errors.firstname}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>

                            <div className={submitCount ? (errors.lastname ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="fullName">Last Name </label>
                                <Field name="lastname" type="text" id="lastname" placeholder="Enter Last Name" className="form-input" />

                                {submitCount ? errors.lastname ? <div className="mt-1 text-danger">{errors.lastname}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>
                            <div className={submitCount ? (errors.email ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="fullName">Email </label>
                                <Field name="email" type="text" id="email" placeholder="Enter Email" className="form-input" />

                                {submitCount ? errors.email ? <div className="mt-1 text-danger">{errors.email}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>
                            <div className={submitCount ? (errors.center ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="fullName">Select Center </label>
                                <Field as="select" name="center" className="form-select">
                                    <option value="" disabled={true}>
                                        Open this select menu
                                    </option>
                                    <option value="One">One</option>
                                    <option value="Two">Two</option>
                                    <option value="Three">Three</option>
                                </Field>
                                {submitCount ? errors.center ? <div className=" mt-1 text-danger">{errors.center}</div> : <div className=" mt-1 text-[#1abc9c]">Please select</div> : ''}
                            </div>

                            <div className={submitCount ? (errors.status ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="fullName">Select Status </label>
                                <Field as="select" name="status" className="form-select">
                                   
                                </Field>
                                {submitCount ? (
                                    errors.status ? (
                                        <div className=" mt-1 text-danger">{errors.status}</div>
                                    ) : (
                                        <div className=" mt-1 text-[#1abc9c]">Example valid custom select feedback</div>
                                    )
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className={submitCount ? (errors.phone ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="fullName">Phone </label>
                                <Field name="phone" type="tel" id="phone" placeholder="Enter Phone" className="form-input" />

                                {submitCount ? errors.phone ? <div className="mt-1 text-danger">{errors.phone}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>
                            <div className={submitCount ? (errors.password ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="fullName">Password </label>
                                <Field name="password" type="password" id="password" placeholder="Enter password" className="form-input" />

                                {submitCount ? errors.password ? <div className="mt-1 text-danger">{errors.password}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>
                            <div className={submitCount ? (errors.confirmpassword ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="fullName">Confirm Password </label>
                                <Field name="confirmpassword" type="password" id="confirmpassword" placeholder="Enter Cofirm password" className="form-input" />

                                {submitCount ? errors.confirmpassword ? <div className="mt-1 text-danger">{errors.confirmpassword}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>
                            <div className={submitCount ? (errors.designation ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="designation">Designation </label>
                                <Field name="designation" type="text" id="designation" placeholder="Designation" className="form-input" />

                                {submitCount ? errors.designation ? <div className="mt-1 text-danger">{errors.designation}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>

                            {/* <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="username">Username</label>
                                <div className="flex">
                                    <div className="flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                                        @
                                    </div>
                                    <Field name="username" type="text" id="username" placeholder="Enter Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                                {submitCount ? errors.username ? <div className="mt-1 text-danger">{errors.username}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div> */}
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                            {/* <div className={`md:col-span-2 ${submitCount ? (errors.city ? 'has-error' : 'has-success') : ''}`}>
                                <label htmlFor="customeCity">City</label>
                                <Field name="city" type="text" id="city" placeholder="Enter City" className="form-input" />

                                {submitCount ? errors.city ? <div className="mt-1 text-danger">{errors.city}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div> */}

                            {/* <div className={submitCount ? (errors.state ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="customeState">State</label>
                                <Field name="state" type="text" id="customeState" placeholder="Enter State" className="form-input" />
                                {submitCount ? errors.state ? <div className="mt-1 text-danger">{errors.state}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div> */}
                            <div className={submitCount ? (errors.address ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="address">Address </label>
                                <Field as="textarea" name="address" id="address" placeholder="Address" rows={5} className="form-input" />

                                {submitCount ? errors.address ? <div className="mt-1 text-danger">{errors.address}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>
                            {/* <div className={submitCount ? (errors.zip ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="customeZip">Zip</label>
                                <Field name="zip" type="text" id="customeZip" placeholder="Enter Zip" className="form-input" />
                                {submitCount ? errors.zip ? <div className="mt-1 text-danger">{errors.zip}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div> */}
                        </div>

                        {/* <div className={submitCount ? (errors.agree ? 'has-error' : 'has-success') : ''}>
                            <div className="flex">
                                <Field name="agree" id="agree" type="checkbox" className="form-checkbox" />
                                {values.agree}
                                <label htmlFor="agree" className="font-semibold text-white-dark">
                                    Agree to terms and conditions
                                </label>
                            </div>
                            {submitCount ? errors.agree ? <div className="mt-1 text-danger">{errors.agree}</div> : '' : ''}
                        </div> */}

                        <button
                            type="submit"
                            className="btn btn-primary !mt-6"
                            onClick={() => {
                                if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                                    submitForm();
                                    console.log('values', values);
                                    // setParams(values)
                                    
                                }
                                else{
                                    console.log('values1', values);
                                    // setParams(values)
                                    // saveUser(values);
                                    
                                }
                               
                                
                            }}
                        >
                            Submit Form
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddUserForm;
