import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { selectAllUsers } from '../users/usersSlice';
import { selectAllNotifications, allNotificationsRead } from './notificationsSlice';

export const NotificationsList = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectAllNotifications);
    const users = useSelector(selectAllUsers);

    useLayoutEffect(() => {
        dispatch(allNotificationsRead())
    });

    const renderedNotifications = notifications.map(notification => {
        const date = parseISO(notification.date);
        const timeAgo = formatDistanceToNow(date);
        const user = users.find(user => user.id === notification.user) || {
            name: 'Unkown User'
        };

        const notificationClassname = classNames('notification', {
            new: notification.isNew
        });

        return (
            <div key={notification.id} className={notificationClassname}>
                <div>
                    <b>{user.name}</b> {notification.message}    
                </div>  
                <div title={notification.date}>
                    <i>{timeAgo}</i>
                </div>
            </div>
        );
    });

    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            {renderedNotifications}
        </section>
    );
}