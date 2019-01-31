import React from 'react';
import { FileInput } from '../../About/Inputs/FileInput';
import './styles.scss';

const ResearchView = ({ onChange, onSubmit, fileName }) => (
  <div id="research__view">
    <div className="research__header__container">
      <h3 id="research__header">Add Research</h3>
    </div>
    <form onSubmit={onSubmit} className="ui ">
      <div className="ui grid">
        <div className="four wide column report__file__container">
          <label htmlFor="reportFile" className="title__input">
            Upload file
          </label>
          <FileInput
            placeholder={fileName || 'select a file'}
            change={onChange}
            name="reportFile"
            id="reportFile"
            value=""
          />
        </div>
        <div className="four wide column research__input">
          <div className="research__header">
            <label htmlFor="research__title" className="title__input">
              Research title
            </label>
          </div>
          <input
            type="text"
            name="title"
            id="research__title"
            className="ui input "
            placeholder="Research carried out last year"
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="login__container">
        <button type="submit" className="ui button " id="resources__btn">
          <span id="sign__text">Upload Research</span>
        </button>
      </div>
    </form>
  </div>
);

export default ResearchView;
