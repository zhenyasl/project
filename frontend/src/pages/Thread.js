import React, { Fragment, useState, useEffect, useRef } from "react";
import useHttp from "../hooks/use-http";
import {
    addPost,
    getPosts,
    getThread,
    deleteThread,
} from "../utils/database-api";
import styles from "./Home.module.css";
import { useParams, useNavigate } from "react-router-dom";
import ThreadList from "../components/threads/ThreadList";
import PostList from "../components/posts/PostList";

const Thread = (props) => {
    const [isCreatePostVisible, setCreatePostVisible] = useState(false);
    const [isCreateCommentVisible, setCreateCommentVisible] = useState(false);
    const [newPost, setNewPost] = useState("");
    const [newComment, setNewComment] = useState("");
    const user = localStorage.getItem("name");
    const { threadId } = useParams();
    console.log(threadId);
    const navigate = useNavigate();

    const {
        sendHttpRequest: getThreadRequest,
        status: getThreadStatus,
        data: loadedThread,
    } = useHttp(getThread);

    const {
        sendHttpRequest: sendHttpRequestGetPosts,
        status,
        data: loadedPosts = [],
    } = useHttp(getPosts);

    const {
        sendHttpRequest: sendHttpRequestAddPost,
        status: statusAdd,
        data: addedPost,
    } = useHttp(addPost);

    const { sendHttpRequest: sendHttpRequestDeleteThread } =
        useHttp(deleteThread);

    useEffect(() => {
        sendHttpRequestGetPosts(threadId);
    }, []);
    useEffect(() => {
        getThreadRequest(threadId);
    }, []);

    const inputRef = useRef(null);

    useEffect(() => {
        if (statusAdd === "completed") {
            console.log(addedPost);
            updatePostsList();
        }
    }, [statusAdd]);

    const toggleCreatePost = () => {
        setCreatePostVisible(!isCreatePostVisible);

        if (!isCreatePostVisible) {
            setNewPost("");
        }
    };
    const toggleCreateComment = () => {
        setCreateCommentVisible(!isCreateCommentVisible);

        if (!isCreateCommentVisible) {
            setNewComment("");
        }
    };
    useEffect(() => {
        if (isCreateCommentVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isCreateCommentVisible]);

    const HandleDeleteThread = () => {
        const thread = {
            thread_Id: threadId,
        };
        sendHttpRequestDeleteThread(thread)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
            });
    };

    const handleCreatePost = () => {
        if (!user) {
            alert("You have to be authorized to create a comment");
            return;
        }
        const post = {
            content: newComment,
            thread_id: threadId,
            username: user,
        };
        console.log("post");
        console.log(post);
        sendHttpRequestAddPost(post);

        setCreatePostVisible(false);
        setNewComment(" ");
    };

    const updatePostsList = () => {
        sendHttpRequestGetPosts(threadId);
    };
    console.log("loaded thread:", loadedThread);
    return (
        <Fragment>
            {status === "completed" && getThreadStatus === "completed" && (
                <div>
                    <div>
                        <ThreadList threads={[loadedThread]} />
                    </div>

                    <div className={styles.commentFormContainer}>
                        {isCreateCommentVisible ? (
                            <div className={styles.expandedForm}>
                                <textarea
                                    value={newComment}
                                    onChange={(e) =>
                                        setNewComment(e.target.value)
                                    }
                                    placeholder="Add a comment..."
                                    className={styles.commentInputExpanded}
                                    ref={inputRef}
                                />
                                <div className={styles.buttonContainer}>
                                    <button
                                        onClick={toggleCreateComment}
                                        className={styles.cancelButton}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreatePost}
                                        className={styles.submitButton}
                                    >
                                        Comment
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <input
                                type="text"
                                placeholder="Add a comment"
                                className={styles.commentInput}
                                onClick={toggleCreateComment}
                            />
                        )}
                    </div>
                    {isCreatePostVisible && (
                        <div className={styles.createPostBlock}>
                            <input
                                type="text"
                                placeholder="write title"
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                className={styles.inputField}
                            />
                            <button
                                className={styles.submitButton}
                                onClick={handleCreatePost}
                            >
                                Send
                            </button>
                            <button
                                className={styles.closeButton}
                                onClick={toggleCreatePost}
                            >
                                Close
                            </button>
                        </div>
                    )}

                    <PostList posts={loadedPosts} onUpdate={updatePostsList} />
                </div>
            )}
        </Fragment>
    );
};
export default Thread;
