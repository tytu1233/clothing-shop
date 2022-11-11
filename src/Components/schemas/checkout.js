import * as yup from "yup";

const zipCodeRules = /^([0-9]{2}-)?[0-9]{3}$/

export const checkoutSchema = yup.object().shape({
    name: yup.string().required("Imię jest wymagane"),
    surname: yup.string().required("Nazwisko jest wymagane"),
    city: yup.string().required("Miasto jest wymagane"),
    street: yup.string().required("Ulica jest wymagana"),
    zipCode: yup
    .string()
    .max(6, "Kod pocztowy musi składać się z 5 znaków i myślnika XX-XXX")
    .matches(zipCodeRules, {message: "Wzór: XX-XXX"})
    .required("Kod pocztowy jest wymagany"),
})
