import gifLoding from '../../assets/gif/loading.gif';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <img src={gifLoding} alt="loading" />
        </div>
    );
};

export default Loading;