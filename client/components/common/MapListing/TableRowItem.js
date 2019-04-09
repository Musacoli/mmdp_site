import {
  Button,
  Checkbox,
  Image,
  Input,
  Label,
  Table,
  Modal,
} from 'semantic-ui-react';
import React, { Component } from 'react';
import InlineSVG from 'svg-inline-react';
import * as d3 from 'd3';
import { valueIsEmpty } from '../../../utils/validations';
import ModalTableRow from './ModalTableRow';
import toastr from '../../../utils/toastr';

export class TableRowItem extends Component {
  state = {
    disabled: true,
    btnName: '',
    name: '',
    id: '',
    lga: '',
    url: '',
    errors: {},
    editLGABtn: '',
  };

  componentDidMount() {
    const {
      mapData: { name, id, lga, url },
      btnName,
    } = this.props;
    this.setState({ id, name, btnName });
    const svg = d3.select(`#${id}`);
    if (svg.node()) {
      const bounding = svg.node().getBBox();
      const newY = (6 - bounding.height) / 2 - bounding.y;
      const newX = (8 - bounding.width) / 2 - bounding.x;
      d3.select(`#${id}`).attr('transform', `translate(${newX},${newY})`);
    }
    this.setState({ id, name, lga, url, btnName, editLGABtn: 'Rename' });
  }

  onChange = (e) => {
    this.setState({ errors: {} });
    const name = e.target.value;
    this.setState({ name });
  };

  onClose = () => {
    const {
      mapData: { name },
    } = this.props;
    this.setState({ name, errors: {} });
  };

  onUpdate = (event) => {
    const { onUpdate } = this.props;
    const { id, name, btnName } = this.state;
    const editMode = btnName === 'Edit';
    const buttonName = editMode ? 'Save' : 'Edit';
    const error = valueIsEmpty(name) ? 'Please enter a state name' : null;
    if (!error) {
      this.setState({ btnName: buttonName, disabled: !editMode });
    } else {
      this.setState({ errors: { stateName: error } });
    }
    if (!editMode && !error) {
      onUpdate({ id, event, name });
    }
  };

  svgMap = (mapData) => {
    const source = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 6" height="50" width="50" transform="scale(6.0,7.4) rotate(180)">
  <g id=${mapData.id}>
  <path fill="#bad9e3" d='${mapData.path}'/>
  </g>
  </svg>`;
    return mapData.url ? (
      <Image src={mapData.url} />
    ) : (
      <InlineSVG src={source} />
    );
  };

  noLGA = () => {
    toastr.error('No LGA Found');
  };

  close = () => {
    document.getElementById('modal').style.visibility = 'hidden';
  };

  editLGA = (event) => {
    const { onUpdate } = this.props;
    const { id, name, editLGABtn } = this.state;
    const editMode = editLGABtn === 'Rename';
    const buttonName = editMode ? 'Save' : 'Rename';
    const error = valueIsEmpty(name) ? 'Please enter a LGA ID' : null;
    if (!error) {
      this.setState({ editLGABtn: buttonName, disabled: !editMode });
    } else {
      this.setState({ errors: { LGA: error } });
    }
    if (!editMode && !error) {
      onUpdate({ id, event, name });
    }
  };

  render() {
    const { mapData, onMapView } = this.props;
    const {
      name,
      id,
      btnName,
      disabled,
      errors,
      lga,
      url,
      editLGABtn,
    } = this.state;
    return (
      <Table.Row className="map-inline">
        <Table.Cell>
          <Checkbox />
        </Table.Cell>
        {id ? <Table.Cell>{id}</Table.Cell> : null}
        <Table.Cell>{this.svgMap(mapData)}</Table.Cell>
        <Table.Cell>
          {disabled ? (
            name
          ) : (
            <React.Fragment>
              <Input
                value={name}
                name="stateName"
                className="state-edit"
                onChange={this.onChange}
                autoFocus
                icon={{
                  name: 'x',
                  link: true,
                  onClick: this.onClose,
                }}
              />
              {errors.stateName ? (
                <Label htmlFor="stateName" basic color="red" pointing>
                  {errors.stateName}
                </Label>
              ) : null}
            </React.Fragment>
          )}
        </Table.Cell>
        {lga ? (
          <Table.Cell>
            <Modal
              trigger={<Button className="map-btn">View</Button>}
              closeIcon
              id="modal"
            >
              <Modal.Header>
                <div className="editlga">
                  {disabled ? (
                    name
                  ) : (
                    <React.Fragment>
                      <Input
                        value={name}
                        name="lganame"
                        className="state-edit"
                        onChange={this.onChange}
                        autoFocus
                      />
                      {errors.lganame ? (
                        <Label htmlFor="lganame" basic color="red" pointing>
                          {errors.lganame}
                        </Label>
                      ) : null}
                    </React.Fragment>
                  )}
                </div>
                <Button className="modal-close" onClick={this.close}>
                  Close
                </Button>
                <br />
                <Button
                  className="map-btn"
                  content={editLGABtn}
                  onClick={(event) => this.editLGA(event)}
                />
                <br />
                <Label
                  htmlFor="stakeholders"
                  className="label-stakeholder"
                  size="large"
                >
                  36 Stakeholders
                </Label>
                <Label
                  htmlFor="stakeholders"
                  className="label-stakeholder"
                  size="large"
                >
                  00 Thematic Pillars
                </Label>
                <Label
                  htmlFor="stakeholders"
                  className="label-stakeholder"
                  size="large"
                >
                  00 Focus Area
                </Label>
              </Modal.Header>
              <Modal.Content image>
                <ModalTableRow />
              </Modal.Content>
            </Modal>
          </Table.Cell>
        ) : (
          <>
            <Table.Cell className="button-inline">
              <Button
                content={btnName}
                id="btn-update"
                className="map-btn"
                onClick={(event) => this.onUpdate(event)}
              />
            </Table.Cell>
            <Table.Cell>
              <Button
                id="btn-view"
                content="View"
                className={url ? 'map-btn' : 'no-map-found'}
                onClick={url ? () => onMapView({ name }) : null}
              />
            </Table.Cell>
          </>
        )}
      </Table.Row>
    );
  }
}
export default TableRowItem;
