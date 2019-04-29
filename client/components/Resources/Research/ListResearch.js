import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import BlueCard from '../../common/Card/BlueCard';
import ConfirmModal from '../../common/Modal/ConfirmModal';
import InvalidPage from '../../common/InvalidPage';
import {
  ucFirstLetter,
  ARCHIVE_ACTION,
  UNARCHIVE_ACTION,
} from '../../../utils/helper';
import Search from '../../common/Search';
import AddNewButton from '../../common/AddNewButton';

const ListResearch = ({
  results,
  isOpen,
  modalAction,
  addResearchUrl,
  instanceName,
  showModal,
  handleModalToggle,
  onConfirm,
  handleSearch,
  handleSearchChange,
  loading,
}) => {
  const generateEditLink = (id) => `/resources/research/edit/${id}`;
  const researchResults = results.results;
  let modalInfo;
  if (modalAction === 'delete') {
    modalInfo = {
      header: 'Delete research',
      content: 'Are you sure you want to delete research?',
    };
  } else if (
    modalAction === ARCHIVE_ACTION ||
    modalAction === UNARCHIVE_ACTION
  ) {
    modalInfo = {
      header: `${ucFirstLetter(modalAction)} research`,
      content: `Are you sure you want to ${modalAction} research?`,
    };
  }
  return (
    <>
      <Grid>
        <Grid.Column width={12}>
          <Search
            onSearch={handleSearch}
            onChange={handleSearchChange}
            className="research-search"
            placeholder="Search research"
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <AddNewButton
            url={addResearchUrl}
            text="Research"
            className="common__button bg-ugly-blue"
          />
        </Grid.Column>
      </Grid>
      <Grid relaxed>
        {researchResults && researchResults.length
          ? researchResults.map(({ _id: id, title, archived }) => {
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
                    editLink={generateEditLink(id)}
                  />
                </Grid.Column>
              );
            })
          : !loading && (
              <Grid.Row className="ui loading center aligned animated fadeIn">
                <InvalidPage
                  pathLabel={`Add a ${instanceName}`}
                  errorMessage={`No ${instanceName} to display`}
                  errorDescription={`Please add ${instanceName}`}
                  path={addResearchUrl || '/'}
                />
              </Grid.Row>
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

ListResearch.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalAction: PropTypes.string,
  showModal: PropTypes.func.isRequired,
  handleModalToggle: PropTypes.func.isRequired,
  results: PropTypes.shape({}).isRequired,
  onConfirm: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ListResearch;
