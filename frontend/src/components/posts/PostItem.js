import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { getComments, addComment } from "../../utils/database-api";
import { Link } from "react-router-dom";
import styles from "./PostItem.module.css";
import { FaEllipsisV } from "react-icons/fa";
import { deletePost } from "../../utils/database-api";
import CommentList from "../comments/CommentList";

const PostItem = (props) => {
    const { id, content, username, postDate, level = 0 } = props;
    const { sendHttpRequest } = useHttp(deletePost);
    const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
    const [isReplyFormVisible, setReplyFormVisible] = useState(false);
    const [newComment, setNewComment] = useState("");
    const name = localStorage.getItem("name");
    const formattedDate = new Date(postDate).toLocaleString();
    const {
        sendHttpRequest: sendHttpRequestGetComments,
        status: statusGet,
        data: loadedComments,
    } = useHttp(getComments);
    const {
        sendHttpRequest: sendHttpRequestAddComment,
        status: statusAdd,
        data: addedComment,
    } = useHttp(addComment);

    console.log("POST ID", id);

    useEffect(() => {
        sendHttpRequestGetComments(id).then(() => console.log(loadedComments));
    }, []);

    const deletePostHandler = () => {
        const post = {
            post_Id: id,
        };
        sendHttpRequest(post)
            .then(() => {
                props.onDelete();
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
            });
    };

    const toggleDeleteForm = () => {
        setDeleteFormVisible((prev) => !prev);
    };

    const toggleReplyButton = () => {
        setReplyFormVisible((prev) => !prev);
        setNewComment(" ");
    };

    const handleCreateComment = () => {
        if (!name) {
            alert("You have to be authorized to create a comment");
            return;
        }
        const comment = {
            content: newComment,
            post_id: id,
            username: name,
        };
        console.log("comment");
        console.log(comment);
        sendHttpRequestAddComment(comment).then(() => {
            sendHttpRequestGetComments(id);
        });
        setNewComment(" ");
        setReplyFormVisible(false);
    };

    const updateCommentsList = () => {
        sendHttpRequestGetComments(id);
    };

    return (
        <div>
            <ul className={styles.list}>
                <div className={styles.card}>
                    <li className={styles.item}>
                        <div className={styles.header}>
                            <Link
                                to={`/user/${username}`}
                                className={styles.link}
                            >
                                <span className={styles.author}>
                                    {username}
                                </span>
                            </Link>
                            <span className={styles.dot}>•</span>
                            <span className={styles.date}>{formattedDate}</span>
                            {
                                <div className={styles.deleteButtonContainer}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={toggleDeleteForm}
                                    >
                                        <FaEllipsisV size={20} />
                                    </button>

                                    {isDeleteFormVisible && (
                                        <div>
                                            {username === name ? (
                                                <div
                                                    className={
                                                        styles.deleteConfirm
                                                    }
                                                >
                                                    <button
                                                        className={
                                                            styles.deletePostButton
                                                        }
                                                        onClick={
                                                            deletePostHandler
                                                        }
                                                    >
                                                        Delete Post
                                                    </button>
                                                    <button
                                                        className={
                                                            styles.cancelDeleteButton
                                                        }
                                                        onClick={
                                                            toggleDeleteForm
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    className={
                                                        styles.deleteConfirm
                                                    }
                                                    style={{ bottom: "0px" }}
                                                >
                                                    <button
                                                        className={
                                                            styles.cancelDeleteButton
                                                        }
                                                        onClick={
                                                            toggleDeleteForm
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            }
                        </div>

                        <div className={styles.content}>
                            <p>{content}</p>
                        </div>
                        <button
                            className={styles.replyButton}
                            onClick={toggleReplyButton}
                        >
                            Reply
                        </button>
                    </li>
                </div>
            </ul>
            <div className={styles.replyFormContainer}>
                {isReplyFormVisible && (
                    <div className={styles.expandedForm}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className={styles.commentInputExpanded}
                        />
                        <div className={styles.buttonContainer}>
                            <button
                                onClick={toggleReplyButton}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateComment}
                                className={styles.submitButton}
                            >
                                Comment
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {statusGet === "completed" && loadedComments.length !== 0 && (
                    <CommentList
                        comments={loadedComments}
                        onUpdate={updateCommentsList}
                    />
                )}
            </div>
        </div>
    );
};

export default PostItem;
