import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './ThreadItem.module.css';
import { deleteThread } from '../../utils/database-api';
import useHttp from '../../hooks/use-http';
import { FaEllipsisH } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const ThreadItem = ({ id, content, username, postDate }) => {
    const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const formattedDate = new Date(postDate).toLocaleString();
    const { sendHttpRequest: sendHttpRequestDeleteThread } = useHttp(deleteThread);

    const HandleDeleteThread = () => {
        const thread = {
            thread_Id: id,
        };
        console.log('id', id);
        sendHttpRequestDeleteThread(thread)
            .then(() => {
                navigate('/');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    const toggleDeleteForm = () => {
        setDeleteFormVisible((prev) => !prev);  
    };

    return (
        <div>
            <hr className={styles.hrStyle}></hr>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <Link
                            to={`/user/${username}`}
                            className={styles.link}
                        >
                            <span className={styles.author}>{username}</span>
                        </Link>
                        <span className={styles.dot}>•</span>
                        <span className={styles.date}>{formattedDate}</span>
                    </div>
                    {
                                <div className={styles.deleteButtonContainer}>
                                    <button className={styles.deleteButton} onClick={toggleDeleteForm}>
                                        <FaEllipsisH size={20} />
                                    </button>

                                    {isDeleteFormVisible && (
                                            <div >
                                            {(username === name) ? 
                                                <div className={styles.deleteConfirm}>
                                                <button
                                                    className={styles.deletePostButton}
                                                    onClick={HandleDeleteThread}
                                                >
                                                    Delete Thread
                                                </button>
                                                <button
                                                    className={styles.cancelDeleteButton}
                                                    onClick={toggleDeleteForm}
                                                >
                                                Cancel
                                                </button>
                                            </div>
                                            : 
                                            <div className={styles.deleteConfirm} style={{ bottom : '20px'}}>
                                                <button
                                                        className={styles.cancelDeleteButton}
                                                        onClick={toggleDeleteForm}
                                                    >
                                                    Cancel
                                                </button>
                                            </div>
                                            }  
                                            
                                        </div>
                                        
                                    )}
                                </div>
                    }
                    {/* {username === name && (
                        <button
                            className={styles.deleteButton}
                            onClick={HandleDeleteThread}
                        >
                            Delete 
                        </button>
                    )} */}
                </div>
                <Link to={`/thread/${id}`} className={styles.link}>
                    <div className={styles.content}>
                        <p>{content}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ThreadItem;
