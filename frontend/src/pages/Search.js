import React, { Fragment, useState, useEffect, useContext } from 'react';
import ThreadList from '../components/threads/ThreadList';
import useHttp from '../hooks/use-http';
import { getThreads, addThread, getFilteredThreads } from '../utils/database-api';
import styles from './Home.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { mainActions } from '../store/main-slice'
import { useParams, useNavigate } from 'react-router-dom';

const Search = () => {
    const { search } = useParams(); //console.log(search);

    const dispatchAction = useDispatch();
    const isCreateThreadVisible = useSelector((state) => state.main.isCreatePostVisible);
    // const filter = useSelector((state) => state.main.filter); console.log(filter);

    const [newThreadTitle, setNewThreadTitle] = useState('');

    const [isDisabled, setIsDisabled] = useState(true);
    const user = localStorage.getItem('name');
    
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
        dispatchAction(mainActions.setNewFilter(search));

    }, [search]);

    useEffect(() => {
        getFilteredThreadsRequest(search);

    }, [search]);
    
    // useEffect(() => {
    //     dispatchAction(mainActions.setNewFilter(null));
    // }, );


    useEffect(() => {
        setNewThreadTitle(" ");
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
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
            });

        dispatchAction(mainActions.toggleCreatePostVisibility());
    };

    return (
        <Fragment>
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
                        disabled={!newThreadTitle} 
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
            <div style={{display : 'flex', marginBottom : '-10px', fontSize : 'larger', marginLeft : '400px', marginBottom : '-50px', marginTop : '30px'}}> Results of search "<strong> {search}</strong>" </div>
            {statusFiltered === 'completed' && loadedFilteredThreads.length !== 0  && (
                <ThreadList threads={loadedFilteredThreads} />
            )}
        </Fragment>
    );
};

export default Search;