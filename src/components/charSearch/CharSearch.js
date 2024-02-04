import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup'
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
import ErrorMessageIcon from '../error/ErrorMessage';


import './charSearch.scss'


const MyTextInput = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

export default function CharSearch() {

    const [name, setName] = useState(null);

    const [id, setId] = useState(null);

    const { loading, error, getCharacterByName } = useMarvelService();

    const errorMessage = error ? <ErrorMessageIcon /> : null
    const loadingMessage = loading ? <Loading /> : null
    const content = !(loading) ? <ViewToPage name={name} id={id} /> : null

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Must be 2 characters or more')
                    .required('This field is required')
            })}
            onSubmit={(value, { setSubmitting, setErrors }) => {
                console.log(value);
                // Отправить данные на сервер для валидации
                getCharacterByName(value.name)
                    .then(response => {
                        console.log(response);

                        if (!response.length) {
                            setId(null)
                            setName(null)
                            setErrors({ name: 'The character was not found. Check the name and try again' });
                        } else {
                            response[0].id ? setId(+response[0].id) : setId(null)
                            setName(value.name + '')
                        }

                        // Если ответ успешный, продолжить с обработкой формы
                    })
                    .catch(error => {
                        // Если сервер вернул ошибку валидации, установить ошибки в форме

                        if (error.response && error.response.data) {

                            setErrors(error.response.data);
                        }
                    })
                    .finally(() => {
                        // В любом случае сбросить флаг отправки формы
                        setSubmitting(false);
                    });
            }}>

            <Form className='char__search'>
                <div className="char__search-lable">Or find a character by name:</div>
                <div className="char__inputAndFind">
                    {/* <MyTextInput id='name' name='name' type='text' placeholder='Enter name' /> */}


                    <Field className='char__search-input' id='name' name='name' type='text' placeholder='Enter name' />

                    {/* <input type="text" placeholder='Enter name' className='char__search-input' /> */}
                    <button type="submit" className="button button__main">
                        <div className="inner">Find</div>
                    </button>

                </div>

                <ErrorMessage className='error' name='name' component='div' />

                {/* {name ? <div className="char__toPageSection">
                    <div className="char__toPageSection_lable">{`There is! Visit ${name} page?`}</div>
                    <Link to={`/${id}`} className="button button__secondary">
                        <div className="inner">To page</div>
                    </Link>
                </div> : null} */}
                {name ?
                    <>
                        {errorMessage}
                        {loadingMessage}
                        {content}
                    </>
                    : null}

            </Form>


        </Formik>

    )
}

const ViewToPage = ({name, id}) => {
    return (
        <div className="char__toPageSection">
            <div className="char__toPageSection_lable">{`There is! Visit ${name} page?`}</div>
            <Link to={`/${id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div>
    )
}