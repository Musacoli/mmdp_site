import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';
import BlueCard from '../../common/Card/BlueCard';
import ConfirmModal from '../../common/Modal/ConfirmModal';
import {
  ucFirstLetter,
  ARCHIVE_ACTION,
  UNARCHIVE_ACTION,
} from '../../../utils/helper';
import Search from '../../common/Search';

const ListReport = ({
  reports,
  isOpen,
  modalAction,
  showModal,
  handleModalToggle,
  onConfirm,
  handleSearch,
  handleSearchChange,
  loading,
}) => {
  const generateEditLink = (id) => `/resources/reports/${id}/edit`;
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
        <Grid.Column width={12}>
          <Search
            onSearch={handleSearch}
            onChange={handleSearchChange}
            className="report-search"
            placeholder="Search report"
          />
        </Grid.Column>
        <Grid.Column>
          <a href="/resources/reports/add" className="btn__add">
            <Button className="btn__add">New Report</Button>
          </a>
        </Grid.Column>
      </Grid>
      <Grid relaxed>
        {reports.length
          ? reports.map(({ _id: id, title, reportType, archived }) => {
              const archiveAction = archived
                ? UNARCHIVE_ACTION
                : ARCHIVE_ACTION;
              return (
                <Grid.Column key={id} mobile={8} tablet={8} computer={4}>
                  <BlueCard
                    title={title}
                    archived={archived}
                    onArchive={(event) =>
                      showModal(event, { id, modalAction: archiveAction })
                    }
                    onDelete={(event) =>
                      showModal(event, { id, modalAction: 'delete' })
                    }
                    meta={ucFirstLetter(reportType)}
                    editLink={generateEditLink(id)}
                  />
                </Grid.Column>
              );
            })
          : !loading && (
              <div className="ui info message no-reports">
                <p>No reports found in the records.</p>
              </div>
            )}
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
  handleSearchChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ListReport;
