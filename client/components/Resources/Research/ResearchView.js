import React from 'react';
import { FileInput } from '../../About/Inputs/FileInput';
import './styles.css';

const ResearchView = ({ onChange, onSubmit, fileName }) => (
  <div className="research__view">
    <h3 id="research__header">Add Research</h3>
    <div className="casca">
      <form onSubmit={onSubmit} className="ui form">
        <div className="ui grid">
          <div className="four wide column">
            <label htmlFor="reportFile" className="title__input">
              {' '}
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
              className="ui input field"
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
  </div>
);

export default ResearchView;
