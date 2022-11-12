import * as yup from "yup";


export const productsSchema = yup.object().shape({
    name: yup.string().required("Nazwa jest wymagana"),
    brand: yup
    .string()
    .required("Producent jest wymagany"),
    description: yup.string().max(100).required("Opis jest wymagany"),
    price: yup.string().required("Cena jest wymagana"),
    image: yup.string().required("Zdjęcie jest wymagane"),
})
