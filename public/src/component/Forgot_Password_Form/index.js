import React from 'react';
import './styles.css'

export const ForgotPasswordForm = (props) => {
    const { email, error, onSuccess} = props.formInputs;

    const isDisabled = email === '';

    return (
        <div className="SignIn-Form-Wrapper">
            <div className="SignIn-Form">
                <div>
                    <h1>Forgot Password</h1>
                </div>
                <form onSubmit={props.onSubmit}>
                    <div>
                        <label>
                            <div> Email</div>
                            <div>
                                <input type="email" name="email" value={email} onChange={props.onChange} />
                            </div>
                        </label>
                    </div>
                    <div>
                        <button disabled={isDisabled}>
                            Submit
                </button>
                    </div>
                </form>
            {error ? <p>{error.message}</p> : <p>{onSuccess}</p>}
            </div>
        </div>
    )
}