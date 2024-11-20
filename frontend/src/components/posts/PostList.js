import React from 'react';
import PostItem from './PostItem';
import styles from './PostList.module.css';

const PostList = ({ posts, onUpdate }) => {

    const handlePostDelete = () => {
        onUpdate();
    };

    return (
        <div >
            {posts.map((post) => (
                <PostItem
                    key={post.id}
                    id={post._id}
                    content={post.content}
                    username={post.username}
                    postDate={post.post_date}
                    onDelete={handlePostDelete}
                />
            ))}
        </div>
    );
};

export default PostList;
