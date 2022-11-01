import React from 'react';

const Sidebar = () => {
  return (
    <aside>
      <ul>
        {/* Sooner to be Link components with React router */}
        <li>Settings</li>
        <li>Scheduled payments</li>
        <li>Transaction history</li>
        <li>Payment methods</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
