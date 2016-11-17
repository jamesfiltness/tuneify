import React from 'react'

function UserSidebar() {
  return (
    <div className="sidebar sidebar--left user-sidebar">
      <h3 className="user-sidebar__heading"><i className="fa fa-list"></i>Discover</h3>
      <ul className="user-sidebar__list">
        <li className="user-sidebar__list-item">Top Artists</li>
        <li className="user-sidebar__list-item">Top Tracks</li>
        <li className="user-sidebar__list-item">Trending</li>
      </ul>
      <h3 className="user-sidebar__heading"><i className="fa fa-user"></i>Your Music</h3>
      <ul className="user-sidebar__list">
        <li className="user-sidebar__list-item">Recent plays</li>
        <li className="user-sidebar__list-item">Library</li>
      </ul>
      <h3 className="user-sidebar__heading"><i className="fa fa-list"></i>Playlists</h3>
    </div>
  );
}

export default UserSidebar

