import * as yup from "yup";
import axios from 'axios';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
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
    .min(5)
    .matches(passwordRules, {message: "Wymagane jest silniejsze hasło"})
    .required("Hasło jest wymagane"),
    surname: yup.string().required("Nazwisko jest wymagane"),
    address: yup.string().required("Adres jest wymagany")
})
