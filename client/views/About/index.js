import React from 'react';
import Templates from '../Templates';
import AboutMMDPContainer from '../../containers/About/AboutMMDP';
import CoordinationContainer from '../../containers/About/Coordination';
import GovernorMessageContainer from '../../containers/About/GovernorMessage';
import EdoStateApproachContainer from '../../containers/About/EdoStateApproach';
import ObjectivesContainer from '../../containers/About/Objectives';

export const AboutMMDP = ({ ...props }) => (
  <Templates {...props} title="About MMDP">
    <AboutMMDPContainer {...props} />
  </Templates>
);

export const Coordination = ({ ...props }) => (
  <Templates {...props} title="Coordination">
    <CoordinationContainer {...props} />
  </Templates>
);

export const GovernorMessage = ({ ...props }) => (
  <Templates {...props} title="Governor Message">
    <GovernorMessageContainer {...props} />
  </Templates>
);

export const EdoStateApproach = ({ ...props }) => (
  <Templates {...props} title="The Edo State Approach">
    <EdoStateApproachContainer {...props} />
  </Templates>
);

export const Objectives = ({ ...props }) => (
  <Templates {...props} title="Objectives">
    <ObjectivesContainer {...props} />
  </Templates>
);
