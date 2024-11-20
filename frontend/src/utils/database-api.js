const DATABASE_ROOT_DOMAIN = 'http://localhost:3000';

export async function getThreads() {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/threads`); //всі пости поки прикріплені до 2го треду, поки проект не масштабований і тредів немає
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Threads fetching error.');
    }

    const convertedThreads = [];

    for (const key in data) {
        const thread = {
            id: key,
            ...data[key],
        };

        convertedThreads.push(thread);
    }

    return convertedThreads;
}

export async function getThread(threadId) {
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/threads/${threadId}`
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Thread fetching error.');
    }

    // const convertedThreads = [];

    // for (const key in data) {
    //     const thread = {
    //         id: key,
    //         ...data[key],
    //     };

    //     convertedThreads.push(thread);
    // }

    // return convertedThreads;
    return data;
}

export async function getUserThreads(userId) {
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/threads/user/${userId}`
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Posts fetching error.');
    }

    const convertedThreads = [];

    for (const key in data) {
        const thread = {
            id: key,
            ...data[key],
        };

        convertedThreads.push(thread);
    }

    return convertedThreads;
}

export async function getUserThreadsByName(username) {
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/threads/username/${username}`
    ); //всі пости поки прикріплені до 2го треду, поки проект не масштабований і тредів немає
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Posts fetching error.');
    }

    const convertedThreads = [];

    for (const key in data) {
        const thread = {
            id: key,
            ...data[key],
        };

        convertedThreads.push(thread);
    }

    return convertedThreads;
}

export async function getFilteredThreads(searchText) {
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/threads/search/search`,
        {
            method: 'POST',
            body: JSON.stringify({ search: searchText }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Threads fetching error.');
    }

    const convertedThreads = [];

    for (const key in data) {
        const thread = {
            id: key,
            ...data[key],
        };

        convertedThreads.push(thread);
    }

    return convertedThreads;
}

export async function deleteThread(ThreadData) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/threads/${ThreadData.thread_Id}`,
        {
            method: 'DELETE',
            body: JSON.stringify(ThreadData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        }
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.text || 'Thread deleting error.');
    }
    return data;
}

export async function addThread(ThreadData) {
    const token = localStorage.getItem('authToken');
    // console.log(localStorage.getItem('authToken'));
    // console.log(PostData);
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/threads`, {
        method: 'POST',
        body: JSON.stringify(ThreadData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Thread adding error.');
    }

    return data;
}

export async function getPost(userId) {
    
    return 0;
}

export async function getPosts(threadId) {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/posts/${threadId}`); 
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Threads fetching error.');
    }

    const convertedPosts = [];

    for (const key in data) {
        const post = {
            id: key,
            ...data[key],
        };

        convertedPosts.push(post);
    }

    return convertedPosts;
}


export async function getUserPosts(userId) {
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/posts/user/${userId}`
    ); //всі пости поки прикріплені до 2го треду, поки проект не масштабований і тредів немає
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Posts fetching error.');
    }

    const convertedPosts = [];

    for (const key in data) {
        const post = {
            id: key,
            ...data[key],
        };

        convertedPosts.push(post);
    }

    return convertedPosts;
}

export async function getUserPostsByName(username) {
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/posts/username/${username}`
    ); //всі пости поки прикріплені до 2го треду, поки проект не масштабований і тредів немає
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Posts fetching error.');
    }

    const convertedPosts = [];

    for (const key in data) {
        const post = {
            id: key,
            ...data[key],
        };

        convertedPosts.push(post);
    }

    return convertedPosts;
}

export async function addUser(UserData) {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(UserData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Post adding error.');
    }
}

export async function login(UserData) {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(UserData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Post adding error.');
    }
    return data;
}

// export async function getName(id) {
//     console.log(id);
//     // const response = await fetch(`${DATABASE_ROOT_DOMAIN}/users/${id}`);
//     // const data = await response.json();

//     // if (!response.ok) {
//     //   throw new Error(data.message || "Posts fetching error.");
//     // }

//     // return data;
// }
export async function getUserComments(username) {
    console.log(username);
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/comments/users/${username}`
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Posts fetching error.');
    }

    const convertedComments = [];

    for (const key in data) {
        const comment = {
            id: key,
            ...data[key],
        };

        convertedComments.push(comment);
    }

    return convertedComments;
}

export async function getId(login) {
    //console.log(id);
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/username/${login}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Posts fetching error.');
    }

    return data;
}

export async function addPost(PostData) {
    const token = localStorage.getItem('authToken');
    console.log(localStorage.getItem('authToken'));
    console.log(PostData);
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/posts`, {
        method: 'POST',
        body: JSON.stringify(PostData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Post adding error.');
    }

    return data;
}

export async function addComment(CommentData) {
    const token = localStorage.getItem('authToken');
    // console.log(CommentData);
    // console.log(localStorage.getItem('authToken'));
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/comments`,
        {
            method: 'POST',
            body: JSON.stringify(CommentData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        }
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.text || 'Comment adding error.');
    }
    return data;
}

export async function getComments(postId) {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/comments/post/${postId}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Comments fetching error.');
    }

    const convertedComments = [];

    for (const key in data) {
        const comment = {
            id: key,
            ...data[key],
        };

        convertedComments.push(comment);
    }

    return convertedComments;
}

export async function getRepliedComments(commentId) {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/comments/replied/${commentId}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Comments fetching error.');
    }

    const convertedComments = [];

    for (const key in data) {
        const comment = {
            id: key,
            ...data[key],
        };

        convertedComments.push(comment);
    }

    return convertedComments;
}

export async function deleteComment(CommentData) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/comments/${CommentData.comment_Id}`,
        {
            method: 'DELETE',
            body: JSON.stringify(CommentData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        }
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.text || 'Comment adding error.');
    }
    return data;
}

export async function deletePost(PostData) {
    const token = localStorage.getItem('authToken');
    console.log(PostData);
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/posts/${PostData.post_Id}`,
        {
            method: 'DELETE',
            body: JSON.stringify(PostData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        }
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.text || 'Comment adding error.');
    }
    return data;
}
