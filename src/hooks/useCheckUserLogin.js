import useUser from './useUser';
import { useRouter } from 'next/router';
const { useEffect } = require('react');

const useCheckUserLogin = () => {
    const router = useRouter();
    const { user } = useUser();

    const checkLogined = () => {
        if (!user.id) {
            alert('請先登入');
            router.push('/');
        }
    };
    useEffect(() => {
        checkLogined();
    }, [user]);
};

export default useCheckUserLogin;