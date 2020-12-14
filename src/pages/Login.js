import { useState } from 'react'

import { pages } from '../App'

const initialFormErrorsState = {
  email: '',
  password: '',
  formError: ''
}

export function Login({ API, setCurrentPage }) {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState(initialFormErrorsState);
  const [isLoading, setIsLoading] = useState(false)

  const handleFieldFocus = (event) => {
    const { target: { name } } = event;

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  }

  const handleFieldChange = (event) => {
    const { target: { value, name } } = event;

    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setFormErrors(initialFormErrorsState)
    setIsLoading(true)

    API.login(userInfo)
      .then(() => {
        setCurrentPage(pages.welcome)
      })
      .catch(errors => {
        setFormErrors({ ...formErrors, ...errors })
        setIsLoading(false)
      })
  }

  return (
    <main className="paper">
      <h1 className="title">Log in to Account</h1>
      <form action="/login" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <label htmlFor="email" className="field__label">Email</label>
          <input
            id="email"
            required="required"
            type="email"
            name="email"
            placeholder="e.g. rybin@hey.com"
            autoCorrect="off"
            autoCapitalize="off"
            autoFocus
            value={userInfo.email}
            onChange={handleFieldChange}
            onFocus={handleFieldFocus}
            className={`field__input ${formErrors.email ? 'field__input--error' : undefined}`}
          />
          {formErrors.email && <span className="field__error">{formErrors.email}</span>}
        </div>

        <div className="field">
          <label
            htmlFor="password"
            className="field__label"
          >
            Password
            </label>
          <input
            id="password"
            required="required"
            type="password"
            name="password"
            autoComplete="current-password"
            autoCorrect="off"
            autoCapitalize="off"
            value={userInfo.password}
            onChange={handleFieldChange}
            onFocus={handleFieldFocus}
            className={`field__input ${formErrors.password ? 'field__input--error' : undefined}`}
          />
          {formErrors.password && <span className="field__error">{formErrors.password}</span>}
        </div>


        <div className="field">
          <input type="submit" name="commit" value={isLoading ? "Loading..." : "Log in"} disabled={isLoading} className="btn" />
          {formErrors.formError && <span className="field__error">{formErrors.formError}</span>}
        </div>
      </form>
    </main>
  );
}
