import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  margin: 16,
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class Hormones extends Component {

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>

      <br />
      <br />
      <p>Insert Chart Here</p>
      <br />
      <br />
      <br />


      <Tabs>
        <Tab label="Exercise" style={{fontFamily: 'Julius Sans One', backgroundColor:'#52BFAB'}}>
          <div>

            <h2 style={{fontFamily: 'Julius Sans One'}}>Exercise Recommendations</h2>

            <p style={{fontFamily: 'Alegreya Sans'}}>
              You should be running a lot.
            </p>

          </div>
        </Tab>

        <Tab label="Nutrition" style={{fontFamily: 'Julius Sans One', backgroundColor:'#52BFAB'}}>
          <div>
            <h2 style={{fontFamily: 'Julius Sans One'}}>Nutrition Recommendations</h2>
            <p style={{fontFamily: 'Alegreya Sans'}}>
              You should eat chocolate every day of this week
            </p>
          </div>
        </Tab>

      </Tabs>
      </div>
    )
  }
}


export default Hormones;
