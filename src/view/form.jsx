/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, Fragment } from 'react';
import { Form, FormGroup, FormFeedback, FormText, Row, Col } from 'reactstrap';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Input, Button, Label } from '../../../cores/components';
import { colors } from '../../../cores/components/varaibles';
import { buttonTexts, labels, errorMessages } from '../../../utils/messages';

import { authLogin } from '../../../cores/services/actions/auth';

const validationSchema = object().shape({
    email: string().trim().email(errorMessages.INVALID_EMAIL).required(errorMessages.EMAIL_REQUIRED),
    password: string().required(errorMessages.PASSWORD_REQUIRED),
});

const LoginForm = ({ isAuthenticating, doLogin }) => {
    const [errorMessage, setErrorMessage] = useState({});
    const [hasError, setHasError] = useState(false);

    const { t } = useTranslation();

    const { replace, push } = useHistory();

    const formSubmitHandler = async formData => {
        setHasError(false);
        const adminEmail = 'rxadmin@gmail.com';
        const adminPassword = 'rxAdmin@9';
        if (formData.email === adminEmail && formData.password === adminPassword) {
            await localStorage.setItem('accessToken', JSON.stringify({ ...formData }));
            replace('/');
            window.location.reload();
        } else {
            setHasError(true);
            setErrorMessage('Invalid Credintials');
        }
        // doLogin({...formData})
        //   .then(res => {
        //     const {userType} = res;
        //     localStorage.setItem('AUTH_USER', JSON.stringify({...res}));
        //     replace('/dashboard');
        //     window.location.reload();
        //   })
        //   .catch(err => {
        //     setHasError(true);
        //     setErrorMessage({...err});
        //   });
    };

    const { handleSubmit, getFieldProps, touched, errors } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: formSubmitHandler,
        validationSchema,
    });

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mt-3">
                    <Input
                        placeholder={t(`${labels.EMAIL}`)}
                        name="email"
                        {...getFieldProps('email')}
                        invalid={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email ? <FormFeedback>{t(errors.email)}</FormFeedback> : null}
                </FormGroup>

                <FormGroup className="mt-3">
                    <Input
                        placeholder={t(`${labels.PASSWORD}`)}
                        name="password"
                        {...getFieldProps('password')}
                        invalid={Boolean(touched.password && errors.password)}
                    />
                    {touched.password && errors.password ? (
                        <FormFeedback>{t(errors.password)}</FormFeedback>
                    ) : null}
                </FormGroup>

                <FormGroup className="mt-3">
                    <Button
                        bgcolor={colors.mainBlue}
                        type="submit"
                        textcolor={colors.mainWhite}
                        disabled={isAuthenticating}
                        className="w-100">
                        {t(buttonTexts.CONTINUE)}
                    </Button>
                </FormGroup>
                {hasError ? (
                    <FormText>
                        <p className="text-danger text-center mt-1 mb-0">{t(errorMessage)}</p>
                    </FormText>
                ) : (
                    ''
                )}
            </Form>
        </Fragment>
    );
};
LoginForm.propTypes = {
    isAuthenticating: PropTypes.bool,
    doLogin: PropTypes.func,
};

LoginForm.defaultProps = {
    isAuthenticating: false,
    doLogin: () => { },
};

const mapStateToProps = ({ authReducer: { isAuthenticating } }) => ({
    isAuthenticating,
});

const mapDispatchToProps = {
    doLogin: payload => authLogin(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
