import React, { Fragment, useState, useEffect, useContext } from 'react';
import PostList from '../components/posts/PostList';
import ThreadList from '../components/threads/ThreadList';
import useHttp from '../hooks/use-http';
import { getThreads, addThread, getFilteredThreads } from '../utils/database-api';
import styles from './Home.module.css';
import UserContext from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { mainActions } from '../store/main-slice'

const Home = () => {
    //const [posts, setPosts] = useState([]);
    const dispatchAction = useDispatch();
    const isCreateThreadVisible = useSelector((state) => state.main.isCreatePostVisible);
    const filter = useSelector((state) => state.main.filter); console.log(filter);
    const isFiltered = useSelector((state) => state.main.isFiltered);
    // const [isCreateThreadVisible, setCreateThreadVisible] = useState(false);
    const [newThreadTitle, setNewThreadTitle] = useState("");
    //const { user, updateUser } = useContext(UserContext);
    const [isDisabled, setIsDisabled] = useState(true);
    const user = localStorage.getItem('name');
    const {
        sendHttpRequest: getThreadsRequest,
        status,
        data: loadedThreads,
    } = useHttp(getThreads);

    const {
        sendHttpRequest: getFilteredThreadsRequest,
        status : statusFiltered,
        data: loadedFilteredThreads,
    } = useHttp(getFilteredThreads);

    const {
        sendHttpRequest: sendHttpRequestAddThread,
        status: statusAdd,
        data: thread_id,
    } = useHttp(addThread);

    useEffect(() => {
        if(!filter) {getThreadsRequest();}
        else {getThreadsRequest();}

    }, []);

    const updateThreadsList = () => {
        getThreadsRequest();
    };

    // useEffect(() => {
    //     dispatchAction(mainActions.setNewFilter(null));
    // }, );

    useEffect(() => {
        if (status === 'completed') {
            //console.log(status);
            // console.log(loadedPosts);
        }
    }, [status]);

    useEffect(() => {
        setNewThreadTitle("");
    }, [isCreateThreadVisible]);

    const toggleCreateThread = () => {
        // setCreateThreadVisible(!isCreateThreadVisible);
        // if (!isCreateThreadVisible) {
        //     setNewThreadTitle('');
        // }
        dispatchAction(mainActions.toggleCreatePostVisibility());
    };

    const handleCreateThread = async () => {
        const thread = {
            content: newThreadTitle,
            username : user,
        };

        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            alert('You should be authorized to create post');
            return;
        }
        console.log('sending thread');
        await sendHttpRequestAddThread(thread)
            .then(() => {
                updateThreadsList();
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
            });

        dispatchAction(mainActions.toggleCreatePostVisibility());
    };

    return (
        <Fragment>
            {/* <button
                className={styles.createPostButton}
                onClick={toggleCreateThread}
            >
                
                    <span className="h2 ms-1 pb-2 mb-0" style={{fontWeight: '100', fontSize: '45px', lineHeight: '0.7', display: 'inline-block', }}>+</span>
                    <span className=" ms-1 mb-0" style={{fontSize: '18px', lineHeight: '1', display: 'inline-block', }}>Create</span>
            </button> */}

            {isCreateThreadVisible && (
                <div className={styles.createPostBlock}>
                    <input
                        type="text"
                        placeholder="Thread title"
                        value={newThreadTitle}
                        onChange={(e) => setNewThreadTitle(e.target.value)}
                        className={styles.inputField}
                    />
                    <button
                        className={`btn ${!newThreadTitle ? 'btn-light' : 'btn-primary'} ${styles.submitButton}`}
                        disabled={!newThreadTitle}  // Состояние для деактивации/активации
                        onClick={handleCreateThread}
                    >
                        Send
                    </button>
                    <button
                        className={styles.closeButton}
                        onClick={toggleCreateThread}
                    >
                        Close
                    </button>
                </div>
            )}


            {status === 'completed' && loadedThreads.length !== 0 && (
                <ThreadList threads={loadedThreads} />
            )}
        </Fragment>
    );
};

export default Home;
