import * as yup from "yup";
import axios from 'axios';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
//min 5 znakow, 1 duzy, 1 maly, 1 numeryczny

export const passwordSchema = yup.object().shape({
    oldPassword: yup
    .string()
    .min(5, "Hasło musi składać się z co najmniej 5 znaków")
    .matches(passwordRules, {message: "Wymagane jest silniejsze hasło"})
    .required("Hasło jest wymagane"),
    password: yup
    .string()
    .min(5, "Hasło musi składać się z co najmniej 5 znaków")
    .matches(passwordRules, {message: "Wymagane jest silniejsze hasło"})
    .required('Hasło jest wymagane'),
    passwordConfirmation: yup.string()
       .oneOf([yup.ref('password'), null], 'Hasła muszą być takie same')
})
