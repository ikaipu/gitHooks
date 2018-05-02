import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {navigateTo} from '../../modules/navigation/navigation';

class InitialRoute extends Component {
  constructor(props) {
    super(props);
    return navigateTo('Home', this.props.navigation);
  }

  render() {
    return (
      <View />
    );
  }
}

InitialRoute.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(InitialRoute);
