import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import {
    getRepliedComments,
    addComment,
    deleteComment,
} from "../../utils/database-api";
import { Link } from "react-router-dom";
import styles from "./Comment.module.css";
import { FaEllipsisV, FaArrowRight } from "react-icons/fa";
import { MdReply } from "react-icons/md";
import CommentList from "./CommentList";

const CommentItem = (props) => {
    const {
        id,
        content,
        username,
        postDate,
        level = 0,
        repliedTitle,
        commentId,
    } = props;

    const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
    const [isReplyFormVisible, setReplyFormVisible] = useState(false);
    const [newComment, setNewComment] = useState("");
    const name = localStorage.getItem("name");
    const formattedDate = new Date(postDate).toLocaleString();
    const {
        sendHttpRequest: sendHttpRequestGetRepliedComments,
        status: statusGet,
        data: comments,
    } = useHttp(getRepliedComments);
    const {
        sendHttpRequest: sendHttpRequestAddComment,
        status: statusAdd,
        data: addedComment,
    } = useHttp(addComment);
    const {
        sendHttpRequest: sendHttpRequestDeleteComment,
        status: statusDelete,
        data: deletedComment,
    } = useHttp(deleteComment);

    useEffect(() => {
        sendHttpRequestGetRepliedComments(id);
    }, []);

    useEffect(() => {
        sendHttpRequestGetRepliedComments(id);
    }, [statusAdd]);

    const dynamicStyle = {
        marginLeft: `${(level + 1) * 40}px`,
        maxWidth: `${800 - (level + 1) * 40}px`,
        marginTop: "-20px",
    };

    const deleteCommentHandler = () => {
        const comment = {
            comment_Id: id,
        };
        sendHttpRequestDeleteComment(comment)
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
            replied_id: id,
            replied_title: content,
            username: name,
        };
        console.log("comment");
        console.log(comment);
        sendHttpRequestAddComment(comment);
        setNewComment(" ");
        setReplyFormVisible(false);
    };

    const updateCommentsList = () => {
        sendHttpRequestGetRepliedComments(id);
    };
    return (
        <div>
            <ul className={styles.list}>
                <div className={styles.card} style={dynamicStyle}>
                    <li className={styles.item}>
                        {repliedTitle && (
                            <div
                                style={{
                                    color: "grey",
                                    fontSize: "small",
                                    marginBottom: "10px",
                                }}
                            >
                                {" "}
                                <MdReply
                                    size={15}
                                    style={{ transform: "scaleX(-1)" }}
                                />{" "}
                                {repliedTitle}{" "}
                                <hr
                                    style={{
                                        marginTop: "5px",
                                        marginRight: "50px",
                                    }}
                                ></hr>
                            </div>
                        )}
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
                                                            deleteCommentHandler
                                                        }
                                                    >
                                                        Delete Comment
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
            <div
                className={styles.replyFormContainer}
                style={{
                    marginLeft: dynamicStyle.marginLeft,
                    maxWidth: Math.min(800 - level * 40, 600),
                }}
            >
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
                {statusGet === "completed" && comments.length !== 0 && (
                    <CommentList
                        comments={comments}
                        onUpdate={updateCommentsList}
                        level={level + 1}
                    />
                )}
            </div>
        </div>
    );
};

export default CommentItem;
