import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '@/redux/slices/userSlice';


function useUser() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const setUser = data => {
        dispatch(updateUser(data));
        // console.log('newData', user);
    };
    return { user, setUser };
}

export default useUser;
