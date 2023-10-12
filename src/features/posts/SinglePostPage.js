import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { selectPostsById } from './postsSlice';
import { TimeAgo } from './TimeAgo';

export const SinglePostPage = ({ match }) => {
    const { postId } = match.params;

    const post = useSelector((state) => selectPostsById(state, postId));

    if(!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <p><PostAuthor userId={post.user} /></p>
                <Link to={`/editPost/${post.id}`}>Edit Post</Link>
                <TimeAgo timestamp={post.date} />
            </article>
        </section>
    )
}