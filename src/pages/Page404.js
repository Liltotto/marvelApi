import React from 'react'
import ErrorMessage from '../components/error/ErrorMessage'
import { useNavigate } from 'react-router-dom';
import Helmet from "react-helmet";

export default function Page404() {
	const navigate = useNavigate();
	return (
		<>
			<Helmet>
				<title>Error page marvel</title>
				<meta name="description" content="Error" />
			</Helmet>
			<ErrorMessage />
			<button onClick={() => navigate(-1)} className="single-comic__errorBack" style={{ display: 'block', margin: '50px auto' }}>BACK</button>
		</>

	)
}
