import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import logo from '../../icons/play-button.svg';

const StyledLogo = styled.div`
  a {
    font-family: 'Montserrat', sans serif;
    font-size: 19px;
    letter-spacing: 1px;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    color: #53a3ec;
    img {
      margin-right: 7px;
      vertical-align: middle;
    }
    span {
      color: #ff8e9e;
      font-weight: 900;
    }
  }
`;

export const Logo: FC<{ className?: string }> = memo(({ className }) => {
  return (
    <StyledLogo className={className}>
      <Link href="/" component="a">
        <img src={logo} width={32} alt="Кин" />
        Кин
        <span>чик</span>
      </Link>
    </StyledLogo>
  );
});
