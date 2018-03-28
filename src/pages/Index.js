import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  width: 100%;
`;

export default class Login extends Component {
  static contextTypes = {
    zentI18n: PropTypes.object
  }

  render() {
    return (
      <StyledAppWrap>
        <StyledHeader>
          123
        </StyledHeader>
        <StyledContain>
          <StyledLeftNav>12322</StyledLeftNav>
          <StyledMain>312312</StyledMain>
        </StyledContain>
      </StyledAppWrap>
    );
  }
}
