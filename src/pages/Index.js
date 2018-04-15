import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AuthNav from './AuthNav';

const StyledAppWrap = styled.div`
  width: 100%;
  min-width: 800px;
  height: 100vh;
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 60px;
  background-color: #404040;
`;

const StyledLogo = styled.span`
  display: inline-block;
  margin: 15px 20px;
  width: 160px;
  height: 30px;
  background-color: #333;
  border-radius: 4px;
`;

const StyledContain = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const StyledLeftNav = styled.div`
  width: 200px;
  height: 100%;
  background-color: #404040;
`;

const StyledMain = styled.div`
  flex: 1;
  width: 100%;
`;

export default class Login extends Component {
  static contextTypes = {
    zentI18n: PropTypes.object
  }

  onMenuClick = (e, key) => {
    console.log(e, key);
  }
  render() {
    return (
      <StyledAppWrap>
        <StyledHeader>
          <StyledLogo />
        </StyledHeader>
        <StyledContain>
          <StyledLeftNav>
            <AuthNav />
          </StyledLeftNav>
          <StyledMain>312312</StyledMain>
        </StyledContain>
      </StyledAppWrap>
    );
  }
}
