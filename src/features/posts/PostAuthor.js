import React from 'react';
import { useSelector } from 'react-redux';

export const PostAuthor = React.memo(({ userId }) => {
    const author = useSelector(state => state.users.find(user => user.id === userId));

    return <span> by {author ? author.name : 'Unkown Author'}</span>;
});