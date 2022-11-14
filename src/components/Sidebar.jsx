import React from 'react';
import { NavLink } from 'react-router-dom';
import DvrIcon from '@material-ui/icons/Dvr';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StyleIcon from '@mui/icons-material/Style';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ScheduleIcon from '@mui/icons-material/Schedule';
import '../scss/sidebar.scss';
const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <ul className='sidebar__list'>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to={'/transactions'}
          >
            <DvrIcon />
            <p>Transaction history</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to={'/scheduled'}
          >
            <ScheduleIcon />
            <p>Scheduled payments</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to={'/profile'}
          >
            <SettingsSuggestIcon />
            <p>User settings</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/cards'}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <StyleIcon />
            <p>Your cards</p>
          </NavLink>
        </li>

        <li>
          <NavLink to={'/logout'}>
            <ExitToAppIcon />
            <p>Logout</p>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
