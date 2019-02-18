import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';
import BlueCard from '../../common/Card/BlueCard';
import ConfirmModal from '../../common/Modal/ConfirmModal';
import {
  ucFirstLetter,
  getActionLinks,
  ARCHIVE_ACTION,
  UNARCHIVE_ACTION,
} from '../../../utils/helper';

const ListReport = ({
  reports,
  isOpen,
  modalAction,
  showModal,
  handleModalToggle,
  onConfirm,
}) => {
  let modalInfo;
  if (modalAction === 'delete') {
    modalInfo = {
      header: 'Delete report',
      content: 'Are you sure you want to delete report?',
    };
  } else if (
    modalAction === ARCHIVE_ACTION ||
    modalAction === UNARCHIVE_ACTION
  ) {
    modalInfo = {
      header: `${ucFirstLetter(modalAction)} report`,
      content: `Are you sure you want to ${modalAction} report?`,
    };
  }
  return (
    <>
      <Grid>
        {/* Todo : search bar to be added here */}
        <a href="/resources/reports/add" className="btn__add">
          <Button className="btn__add">New Report</Button>
        </a>
      </Grid>
      <Grid relaxed>
        {reports.map(({ _id: id, title, reportType, archived }) => {
          return (
            <Grid.Column key={id} mobile={8} tablet={8} computer={4}>
              <BlueCard
                title={title}
                meta={ucFirstLetter(reportType)}
                actionLinks={getActionLinks({
                  id,
                  archived,
                  onClick: showModal,
                })}
              />
            </Grid.Column>
          );
        })}
        <ConfirmModal
          isOpen={isOpen}
          handleModalToggle={handleModalToggle}
          onConfirm={onConfirm}
          modalInfo={modalInfo}
        />
      </Grid>
    </>
  );
};

ListReport.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalAction: PropTypes.string,
  showModal: PropTypes.func.isRequired,
  handleModalToggle: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ListReport;
