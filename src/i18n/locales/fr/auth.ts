export default {
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    firstname: 'Prénom',
    lastname: 'Nom',
    displayName: "Nom d'affichage",
    municipality: 'Commune',
    date_of_birth: 'Date de naissance',

    login: {
        welcome: 'Bienvenue',
        sign_in: 'Connexion à votre compte',
        notYetRegister: 'Pas encore de compte ?',
        signUp: 'S\'enregistrer',
        loginButton: 'Connexion',
    },
    registration: {
        registerButton: 'Créer un compte',

        header: 'Créer votre compte',
        alreadyHaveAccount: 'Déjà inscrit(e) ?',
        signIn: 'Connexion',
    },
    errors: {
        emailRequiredError: 'L\'adresse email est requise.',
        emailInvalidError: 'Veuillez entrer une adresse email valide',
        passwordRequiredError: 'Le mot de passe est requis',
        passwordMinLengthError: 'Le mot de passe doit contenir au moins 12 caractères',

        invalidEmailOrPasswordError: 'Email ou mot de passe invalide',
        loginError: 'Impossible de vous connecter. Veuillez réessayer.',

        passwordMaxLengthError: 'Le mot de passe doit être au plus 255 caractères',
        confirmPasswordRequiredError: 'Veuillez confirmer votre mot de passe',
        passwordNotMatchError: 'Le mot de passe et la confirmation du mot de passe ne correspondent pas',
        firstNameRequiredError: 'Le prénom est requis',
        firstNameMaxLengthError: 'Le nom doit être au plus 100 caractères',
        lastNameRequiredError: 'Le nom est requis',
        lastNameMaxLengthError: 'Le nom doit être au plus 100 caractères',
        displayNameRequiredError: 'Le nom d\'affichage est requis',
        displayNameMaxLengthError: 'Le nom d\'affichage doit être au plus 100 caractères',
        birthDateRequired: 'La date de naissance est requise',
        birthDateFutureError: 'La date de naissance doit être dans le passé',
        municipalityRequiredError: 'Le nom de la commune est requis',
        municipalityMaxLengthError: 'Le nom de la commune doit être au plus 100 caractères',

        emailAlreadyExistsError: 'Un compte avec cette adresse email existe déjà.',
        registrationError: 'Impossible de créer un compte. Veuillez réessayer.',
    }
}