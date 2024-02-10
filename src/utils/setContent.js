import ErrorMessage from '../components/error/ErrorMessage';
import Loading from '../components/loading/Loading';
import Skeleton from '../components/skeleton/Skeleton';


export default function setContent (process, Component, data) {
    console.log('dsfcdsfds' + process);
    switch(process){
        case 'waiting':
            return <Skeleton />
        case 'loading':
            return <Loading />
        case 'confirmed':
            return <Component data={data} />
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state');
    }
}