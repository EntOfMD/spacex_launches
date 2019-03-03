import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_success
      launch_date_local
    }
  }
`;

export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div className="text-center">
                  <div className="spinner-border" role="status" />
                  <span className="sr-only">Loading...</span>
                </div>
              );
            if (error) console.log(error);

            return (
              <Fragment>
                {data.launches.map((launch) => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launches;
