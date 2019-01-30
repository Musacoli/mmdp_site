import React from 'react';
import './styles.scss';
import { FileInput } from '../../About/Inputs/FileInput';

const ResearchView = ({ onChange, onSubmit }) => (
  <div className="research__view">
    <h3>Add Research</h3>
    <div className="casca">
      <form onSubmit={onSubmit}>
        <div className="ui grid">
          <div className="four wide column">
            <label htmlFor="fileupload"> Upload file</label>
            <input
              type="file"
              name="researchUpload"
              id="fileupload"
              placeholder="select a file"
              onChange={onChange}
              className="ui input"
            />
            {/* <FileInput
              placeholder="select a file"
              onChange={onchange}
              name="researchupload"
              id="fileupload"
              value=""
            /> */}
          </div>
          <div className="four wide column">
            <label htmlFor="research">Research title</label>
            <input
              type="text"
              name="researchTitle"
              id="research"
              className="ui input focus"
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
