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
          <DvrIcon />
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to={'/transactions'}
          >
            Transaction history
          </NavLink>
        </li>

        <li>
          <ScheduleIcon />
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to={'/scheduled'}
          >
            Scheduled payments
          </NavLink>
        </li>
        <li>
          <SettingsSuggestIcon />
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to={'settings'}
          >
            User settings
          </NavLink>
        </li>
        <li>
          <StyleIcon />
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Your cards
          </NavLink>
        </li>

        <li>
          <ExitToAppIcon />
          <NavLink to={'/logout'}>Logout</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
