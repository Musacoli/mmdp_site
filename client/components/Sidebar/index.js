import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DividerTitle from './DividerTitle';
import TitleContent from './TitleContent';
import logo from '../../assets/images/logo-white.svg';

const SidebarMenu = ({
  activeIndex, goTo, sidebarItems,
}) => (
  <React.Fragment>
    <div className="ui sidebar vertical left menu overlay visible theme_primary">
      <div className="item logo">
        <div as="h2">
          <div className="float-left">
            <Image className="brand__logo" circular src={logo} />
          </div>
          <div className="brand__name float-left">
          The Managing Migration through
          Development Programme
          </div>
        </div>
      </div>
      <DividerTitle title="Website" />
      <div className="ui accordion">
        {sidebarItems.map((item, index) => (
          <React.Fragment key={item.title}>
            <TitleContent
              title={item.title}
              items={item.menuItems}
              active={activeIndex === index}
              onClick={() => goTo(item.path, index)}
            />
            {item.dividerTitle && <DividerTitle title={item.dividerTitle} /> }
          </React.Fragment>
        ))}
      </div>
    </div>
  </React.Fragment>
);

SidebarMenu.propTypes = {
  goTo: PropTypes.func.isRequired,
  sidebarItems: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  activeIndex: PropTypes.number.isRequired,
};
export default SidebarMenu;
