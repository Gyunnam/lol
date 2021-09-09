import React from 'react';
import styled from 'styled-components';
import ChampionData from '../../data/champion.json'
import axios from 'axios';

const Champion = ()=>{
    
    //챔피언 불러오기
    const {data} = ChampionData
    // console.log(champion)
    const getValues = Object.values(data)
        .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        })
        .map((entrie, index) => {
            const img = entrie.id

            return (
                // console.log(entrie,index),
                <Item key = {index}>
                    <Wrap id = {img}onClick = {chamInfo}>
                        <ChampImg id = {img} 
                            src = {`http://ddragon.leagueoflegends.com/cdn/11.17.1/img/champion/${img}.png`}
                            alt = {img}
                            width = "22px"
                            height = "22px" 
                        />
                        <Name id = {img} > {entrie.name} </Name> 
                    </Wrap>
                </Item>
            )
        })

    
    function chamInfo(e) {

        var getId = e.target.id
        console.log(getId)

        axios.get(`https://ddragon.leagueoflegends.com/cdn/11.17.1/data/ko_KR/champion/${getId}.json`)
            .then((res) => {
                const data = Object.values(res.data.data)
                console.log('실행')
                console.log(data[0])
            })
    }
    console.log("hi")
    return ( 
        
        <ListWrap >
            <List > {getValues} </List> 
        </ListWrap>
    
    );
}

const ListWrap = styled.div `
    width: 850px;
    margin: 0 auto;
    border : 1px solid gray;
`
const List = styled.ul `
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
`
const Item = styled.li `
    display: flex;
    
    margin: 3px 2px;
    height: 22px;
    cursor : pointer;
`

const Name= styled.p `
    line-height:22px;
    width: 100%;
`

const Wrap = styled.a `
    display : flex;
    width: 162px;
    z-index : 1;
    &:hover ${Name}{
        background : red;
    }
`

const ChampImg = styled.img `
    margin-right: 5px;
`

export default Champion;