import React from 'react'
import  { Link } from 'react-router';
import Playlists from '../playlists';

export function UserSidebar() {
  return (
    <div className="sidebar sidebar--left user-sidebar">
      <h3 className="user-sidebar__heading">
        <i className="fa fa-list"></i>
        Discover
      </h3>
      <ul className="user-sidebar__list">
        <li className="user-sidebar__list-item">
          <Link to="/">Top Artists</Link>
        </li>
        <li className="user-sidebar__list-item">
          <Link to="/top-tracks">Top Tracks</Link>
        </li>
      </ul>
      <h3 className="user-sidebar__heading">
        <i className="fa fa-list"></i>
        Playlists
      </h3>
      <Playlists />
    </div>
  );
}

export default UserSidebar

