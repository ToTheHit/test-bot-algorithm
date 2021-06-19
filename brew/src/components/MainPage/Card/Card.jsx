import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './card.less';
import { NavLink } from 'react-router-dom';
import Layout from '../../InstantBrew/Layout/Layout';
import Title from '../../InstantBrew/Title/Title';
import Paragraph from '../../InstantBrew/Paragraph/Paragraph';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleRedirect() {
    const { changeHide } = this.props;
    changeHide(true);
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 0);
  }

  render() {
    /*        if (this.state.redirect) {
                return <Redirect to={this.props.link} push={true}/>
            } */
    const {
      link, pictureURL, title, description,
    } = this.props;
    return (
      <Layout className="Card">
        {/* <div to={this.props.link} style={{ textDecoration: 'none' }}
        onClick={() => this.handleRedirect()}> */}
        <NavLink
          style={{ textDecoration: 'none' }}
          to={link}
        >
          <div
            className="Card_picture"
            style={{ backgroundImage: `url(${pictureURL})` }}
          />

          <div className="Card_title">
            <h2>
              {title}
            </h2>
          </div>

          <div className="Card_dot" />
          <div className="Card_description">
            <Paragraph>
              {description}
            </Paragraph>
          </div>
        </NavLink>
      </Layout>
    );
  }
}

Card.propTypes = {
  // theme: PropTypes.oneOf(['dark', 'light']).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pictureURL: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
