import React from 'react';
import styled from 'styled-components';



function Header(){

    return(
        <HeaderContainer>
            <Wrap>
                <LogoBox href="/">
                    <LogoImg src="https://fontmeme.com/permalink/210912/1cfb34148eeaf0d1f78bef00884a3ba3.png" alt="logo" />
                </LogoBox>
                <SearchForm action="/search">
                    <SearchInput type="text" placeholder="닉네임을 입력해주세요" autocomplete="off"/>
                </SearchForm>
            </Wrap>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    width: 100%;
    height: 70px;
    background: #5383e8;
`
const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items : center;
    margin: auto 0;
    height: 70px;

`
const LogoBox = styled.a`
    width: 100px;
    margin-right: 20px;
`
const LogoImg = styled.img`
    width: 100%;
    height: 100%;
`

const SearchForm = styled.form`
    position: relative;
`
const SearchInput = styled.input`
    width: 170px;
    height: 10px;
    border-radius: 5px;
    border : 1px solid #3867c4;
    padding: 15px;
`

export default Header