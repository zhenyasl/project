import React from "react";
import CommentItem from "./CommentItem";
import styles from "../comments/Comments.module.css";

const CommentList = ({ comments, onUpdate, level = 0 }) => {
    const handleCommentDelete = () => {
        onUpdate();
    };
    console.log(comments);
    return (
        <div>
            {comments.map((comment) => (
                <CommentItem
                    key={comment._id}
                    id={comment._id}
                    content={comment.content}
                    username={comment.username}
                    postDate={comment.post_date}
                    repliedTitle={comment.replied_title}
                    onDelete={handleCommentDelete}
                    level={level}
                />
            ))}
        </div>
    );
};

export default CommentList;
