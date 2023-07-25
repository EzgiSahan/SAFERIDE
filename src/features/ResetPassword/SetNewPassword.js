import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const SetNewPassword = () => {

    const getCharacterValidationError = (str) => {
        return `${str}`;
    };
    const formSchema = Yup.object().shape({
        password: Yup.string()
          .required('Password is mendatory')
          .min(8, 'Password must be at least 8 characters')
          .matches(/[a-z]/, getCharacterValidationError('Password must include one lowercase'))
          .matches(/[A-Z]/, getCharacterValidationError('Password must include one uppercase'))
          .matches(/[[0-9]/, getCharacterValidationError('Password must include one number'))
          .matches(/[^\w]/, getCharacterValidationError('Password must include one special symbol')),
        confirmPwd: Yup.string()
          .required('Password is mendatory')
          .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    function onSubmit(data) {
        console.log(JSON.stringify(data, null, 4))
        return false
    }

    return(
        <div className='main-container'>
            <header className='header'>
                <text>Transportation App</text>
            </header>
            <div className='login-container'> 
                <div>
                    <h1>Set New Password</h1>
                    <h4>We'll send you reset instructions.</h4>
                </div>
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input 
                        name='password'
                        type='password'
                        {...register('password')} 
                        class={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                        placeholder='password' 
                        required/>
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div class="form-group">
                        <label for="password">Confirm Password:</label>
                        <input 
                        name='confirmPwd'
                        type='password'  
                        {...register('confirmPwd')} 
                        class={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                        placeholder='confirm password' required/>
                        <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
                    </div>
                    <button type="submit" class="btn btn-primary" id="button"><a href='/reset-password-success'>Reset Password</a></button>
                </form>
            </div>
        </div>
    )
}