import {
    ChangeEvent,
    FormEvent,
    useState,
    // useContext
} from "react";
import { useDispatch } from "react-redux";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { signUpStart } from "../../store/user/user.action";

// import { UserContext } from "../../contexts/user.context";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignUpContainer } from './sign-up-form.styles'
import { AuthError, AuthErrorCodes } from "firebase/auth";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });
    const { displayName, email, password, confirmPassword } = formFields;
    // const { setCurrentUser } = useContext(UserContext);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("The passwords are not Matched!");
            return;
        }
        try {
            // const { user } = await createAuthUserWithEmailAndPassword(email, password); CHANGED_FROM_THUNK_TO_REDUX_SAGA
            // console.log({ user });
            // console.log(formFields);
            // setCurrentUser(user)
            // await createUserDocumentFromAuth(user, { displayName });   CHANGED_FROM_THUNK_TO_REDUX_SAGA
            dispatch(signUpStart(email, password, displayName));
            setFormFields({ displayName: '', email: '', password: '', confirmPassword: '' })
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already exist');
            } else {
                console.log('user creation encountered an error ', error);
            }
        }
    }


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log(name);
        setFormFields({ ...formFields, [name]: value });
        // console.log(formFields);
        // console.log(password);
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account? </h2>
            <span>Sign Up with Your Email and Password. </span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;