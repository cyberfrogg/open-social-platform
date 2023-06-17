import { useSelector } from 'react-redux';
import classes from './createnewpostpanel.module.css'
import { useRouter } from 'next/router';
import { RootState } from '@/store';

export interface ICreateNewPostPanelProps {

}

export const CreateNewPostPanel: React.FC<ICreateNewPostPanelProps> = (props) => {
    const router = useRouter();

    const userSession = useSelector((state: RootState) => state.authSession.session);
    const isSessionCollected = useSelector((state: RootState) => state.authSession.isSessionCollected);


    const OnInputClick = () => {
        if (isSessionCollected && userSession != null) {
            router.push("/create");
        }
        if (isSessionCollected && userSession == null) {
            router.push("/auth/signin");
        }
    }

    return (
        <div className={classes.panel}>
            <input
                className={classes.input}
                placeholder='Create post'
                onClick={OnInputClick}
            />
        </div>
    );
}