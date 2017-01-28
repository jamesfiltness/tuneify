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
          <a href="#">Top Artists</a>
        </li>
        <li className="user-sidebar__list-item">
          <a href="#">Top Tracks</a>
        </li>
        <li className="user-sidebar__list-item">
          <a href="#">Trending</a>
        </li>
        <li className="user-sidebar__list-item">
          <a href="#">Decade</a>
        </li>
      </ul>
      <h3 className="user-sidebar__heading">
        <i className="fa fa-user"></i>
        Your Music
      </h3>
      <ul className="user-sidebar__list">
        <li className="user-sidebar__list-item">
          <Link to="/recent-plays">
            Recent plays
          </Link>
        </li>
        <li className="user-sidebar__list-item">
          <a href="#">Library</a>
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

