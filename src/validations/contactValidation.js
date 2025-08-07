import * as Yup from 'Yup';
export const contactSchema = Yup.object().shape({
    fullName: Yup.string().required("نام و نام خانوادگی الزامی است"),
    photo: Yup.string().url("آدرس معتبر نیست").required("عکس الزامی است"),
    mobile: Yup.number().required("شماره موبایل الزامی است").min(1000000000, "شماره موبایل معتبر نیست").max(9999999999, "شماره موبایل معتبر نیست"),
    email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
    job: Yup.string().nullable(),
    group: Yup.string().required("گروه الزامی است")
})