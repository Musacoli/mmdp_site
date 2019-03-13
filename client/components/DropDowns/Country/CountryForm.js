import React from 'react';
import { Grid, Button, Input } from 'semantic-ui-react';
import './styles.scss';
import deletelogo from './group-4.svg';

export const EditDropDownForm = (props) => (
  <>
    <Grid columns="equal">
      <Grid.Column width={7}>
        <label htmlFor="country__name">Country Name</label>
        <input
          type="text"
          id="country__name"
          sharedid={props.itemId}
          className="ui input"
          placeholder="country name"
          name="countryName"
          onChange={props.onchangeHandler}
          defaultValue={props.countryName || ''}
        />
      </Grid.Column>
      <Grid.Column width={7}>
        <label htmlFor="country__description">Description </label>
        <input
          type="text"
          id="country__description"
          sharedid={props.itemId}
          className="ui input"
          placeholder="Description"
          name="countryDescription"
          onChange={props.onchangeHandler}
          defaultValue={props.countryDescription || ''}
        />
      </Grid.Column>
      <Grid.Column>
        <img
          src={deletelogo}
          alt="logo"
          title="delete"
          id="delete__logo"
          sharedid={props.itemId}
          onClick={props.delete}
        />
      </Grid.Column>
    </Grid>
  </>
);

export const ButtonHolder = ({ click }) => (
  <Grid stackable columns={1}>
    <Grid.Column>
      <Grid.Row>
        <a href="#" onClick={click} id="more__options">
          Add more options
        </a>
        <Button type="submit" id="save__dropdown">
          Save dropdown
        </Button>
      </Grid.Row>
    </Grid.Column>
  </Grid>
);
