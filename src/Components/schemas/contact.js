import * as yup from "yup";


export const contactSchema = yup.object().shape({
    email: yup.string().email("Wprowadź poprawny e-mail").required("E-mail jest wymagany"),
    name: yup.string().required("Wprowadź tytuł"),
    message: yup.string().required("Wprowadź wiadomość"),
})