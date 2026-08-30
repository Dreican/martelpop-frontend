export default {
    email: 'Email',
    password: 'Password',
    firstname: 'First name',
    lastname: 'Last name',
    displayName: 'Display name',
    confirmPassword: 'Confirm password',

    login: {
        welcome: 'Welcome back',
        sign_in: 'Sign in to your account',
        notYetRegister: 'Not yet register ?',
        signUp: 'Sign up',
        loginButton: 'Login',
    },
    registration: {
        loginButton: 'Sign in',
        registerButton: 'Create account',

        header: 'Create your account',
        alreadyHaveAccount: 'Already have an account ?',
        signIn: 'Sign in',
    },
    errors: {
        emailRequiredError: 'Email is required',
        emailInvalidError: 'Please enter a valid email',
        passwordRequiredError: 'Password is required',
        passwordMinLengthError: 'Password must be at least 12 characters',

        invalidEmailOrPasswordError: 'Invalid email or password',
        loginError: 'Unable to sign in. Please try again.',

        passwordMaxLengthError: 'Password must be at most 255 characters',
        confirmPasswordRequiredError: 'Please confirm your password',
        passwordNotMatchError: 'Password and confirm password do not match',
        firstNameRequiredError: 'First name is required',
        firstNameMaxLengthError: 'First name must be at most 100 characters',
        lastNameRequiredError: 'Last name is required',
        lastNameMaxLengthError: 'Last name must be at most 100 characters',
        displayNameRequiredError: 'Display name is required',
        displayNameMaxLengthError: 'Display name must be at most 100 characters',

        emailAlreadyExistsError: 'An account with this email already exists.',
        registrationError: 'Unable to create account. Please try again.',
    }
}