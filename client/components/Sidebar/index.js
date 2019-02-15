import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DividerTitle from './DividerTitle';
import TitleContent from './TitleContent';
import logo from '../../assets/images/logo-white.svg';
import MainContent from './MainContent';

const SidebarMenu = ({ children, title, activeIndex, goTo, sidebarItems }) => (
  <React.Fragment>
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={3}>
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
              {sidebarItems.map((item, index) => (
                <React.Fragment key={item.title}>
                  <TitleContent
                    title={item.title}
                    items={item.menuItems}
                    active={activeIndex === index}
                    onClick={() => goTo(item.path, index)}
                  />
                  {item.dividerTitle && (
                    <DividerTitle title={item.dividerTitle} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Grid.Column>
        <Grid.Column widescreen="13">
          <MainContent title={title}>{children}</MainContent>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </React.Fragment>
);

SidebarMenu.propTypes = {
  goTo: PropTypes.func.isRequired,
  sidebarItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
export default SidebarMenu;
