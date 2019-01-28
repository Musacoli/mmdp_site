import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DividerTitle from './DividerTitle';
import TitleContent from './TitleContent';
import logo from '../../assets/images/logo-white.svg';

import './styles.sass';

const SidebarMenu = ({ activeIndex, handleClick, goTo }) => (
  <React.Fragment>
    <div className="ui sidebar vertical left menu overlay visible theme_primary">
      <div className="item logo">
        <div as="h2">
          <div className="float-left">
            <Image className="brand__logo" circular src={logo} />
          </div>
          <div className="brand__name float-left">
            The Managing Migration through Development Programme
          </div>
        </div>
      </div>
      <DividerTitle title="Website" />
      <div className="ui accordion">
        <TitleContent
          title="Thematic Pillars"
          items={[
            { name: 'Pillar 1', path: '/pillar-1' },
            { name: 'pillar-2' },
          ]}
          active={activeIndex === 0}
          onClick={() => handleClick(0)}
        />
        <TitleContent
          title="About"
          items={[
            {
              name: 'Message from the governor',
              path: '/about/governor-message',
            },
            {
              name: 'About MMDP',
              path: '/about/about-mmdp',
            },
          ]}
          active={activeIndex === 1}
          onClick={() => handleClick(1)}
        />
        <TitleContent
          title="Events"
          items={[]} // Provide an empty array if the item doesn't have menu levels
          active={activeIndex === 2}
          onClick={() => goTo('/events', 2)}
        />
        <TitleContent
          title="Resources"
          items={[
            { name: 'Resource 1', path: '/resource-1' },
            { name: 'Report', path: '/resources/report/add' },
          ]}
          active={activeIndex === 3}
          onClick={() => handleClick(3)}
        />
        <DividerTitle title="COORDINATION MATRIX" />
        <TitleContent
          title="National level"
          items={[]} // Provide an empty array if the item doesn't have menu levels
          active={activeIndex === 4}
          onClick={() => goTo('/national-level', 4)}
        />
        <TitleContent
          title="State level"
          items={[]} // Provide an empty array if the item doesn't have menu levels
          active={activeIndex === 5}
          onClick={() => handleClick(5)}
        />
        <DividerTitle title="DROPDOWNS" />
        <TitleContent
          title="Manage dropdowns"
          items={[]} // Provide an empty array if the item doesn't have menu levels
          active={activeIndex === 6}
          onClick={() => handleClick(6)}
        />
        <DividerTitle title="USERS & GROUPS" />
        <TitleContent
          title="Users"
          items={[]} // Provide an empty array if the item doesn't have menu levels
          active={activeIndex === 7}
          onClick={() => goTo('/users/all', 7)}
        />
        <TitleContent
          title="Groups"
          items={[]} // Provide an empty array if the item doesn't have menu levels
          active={activeIndex === 8}
          onClick={() => goTo('/group/list', 8)}
        />
      </div>
    </div>
  </React.Fragment>
);

SidebarMenu.propTypes = {
  goTo: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
};
export default SidebarMenu;
