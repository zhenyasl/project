import React from 'react';
import ThreadItem from './ThreadItem';
import styles from './ThreadList.module.css';

const ThreadList = ({threads }) => {
    return (
        <div className={styles.grid}>
            {threads.map((thread) => (
                <ThreadItem
                    key={thread.id}
                    id={thread._id}
                    content={thread.content}
                    username={thread.username}
                    postDate={thread.post_date}
                />
            ))}
        </div>
    );
};

export default ThreadList;
