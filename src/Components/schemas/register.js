import * as yup from "yup";
import axios from 'axios';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
const zipCodeRules = /^([0-9]{2}-)?[0-9]{3}$/
//min 5 znakow, 1 duzy, 1 maly, 1 numeryczny

export const registerSchema = yup.object().shape({
    email: yup.string().email("Wprowadź poprawny e-mail").required("E-mail jest wymagany")
    .test('email', 'E-mail jest już używany',
                function (value) {
                    return new Promise((resolve, reject) => {
                        axios.get(`http://localhost:8080/users/email/${value}`)
                            .then((res) => {
                                if(res.data === "zajete") {
                                    resolve(false);
                                    console.log("asdas")
                                } else {
                                    resolve(true)
                                }
                            })
                    })
                }
            ),
    login: yup.string().required("Login jest wymagany")
    .test('login', 'Login jest już używany',
        function (value) {
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:8080/users/login/${value}`)
                    .then((res) => {
                        if(res.data === "zajete") {
                            resolve(false);
                            console.log("asdas")
                        } else {
                            resolve(true)
                        }
                    })
            })
        }
    ),
    name: yup.string().required("Imię jest wymagane"),
    password: yup
    .string()
    .min(5, "Hasło musi składać się z co najmniej 5 znaków")
    .matches(passwordRules, {message: "Wymagane jest silniejsze hasło"})
    .required("Hasło jest wymagane"),
    surname: yup.string().required("Nazwisko jest wymagane"),
    city: yup.string().required("Miasto jest wymagane"),
    street: yup.string().required("Ulica jest wymagana"),
    zipCode: yup
    .string()
    .max(6, "Kod pocztowy musi składać się z 5 znaków i myślnika XX-XXX")
    .matches(zipCodeRules, {message: "Wzór: XX-XXX"})
    .required("Kod pocztowy jest wymagany"),
    terms: yup
    .boolean()
    .oneOf([true], 'Musisz zaakceptować regulamin'),
})
