import styled from 'styled-components';
import ChampionData from './champion.json';
import GlobalStyle from './GlobalStyles';
import axios from 'axios';

function App() {

    //챔피언 불러오기
    const champion = ChampionData.data
    // console.log(champion)
    const getValues = Object.values(champion)
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
                            src = {"http://ddragon.leagueoflegends.com/cdn/11.17.1/img/champion/" +
                            img +
                            ".png"}
                            alt = {img}
                            width = "22px"
                            height = "22px" /
                        >
                        <Name id = {img} > {entrie.name} </Name> 
                    </Wrap>
                </Item>
            )
        })

    //챔피언 정보 받아오기
    function chamInfo(e) {
        var getId = e.target.id
        console.log(getId)

        axios.get("https://ddragon.leagueoflegends.com/cdn/11.17.1/data/ko_KR/champion/" + getId + ".json")
            .then((res) => {
                const data = Object.values(res.data.data)
                console.log('실행')
                console.log(data[0])
            })
    }

    function search(){
        axios.get("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/hideonbush?api_key=RGAPI-223329d7-fc5b-4a83-bcc9-1c3556c57fe8")
        .then((res)=>{
            console.log(res)
        })
    }

    search()


    return ( 
        <div className = "App" >
            <GlobalStyle / >
            <ListWrap >
                <List > {getValues} </List> 
            </ListWrap>
        </div>
    );
}

const ListWrap = styled.div `
    width: 850px;
    margin: 0 auto;
    border : 1px solid gray
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
const Wrap = styled.a `
    display : flex;
    width: 162px;
    z-index : 1
`
const ChampImg = styled.img `
    margin-right: 5px;
`

const Name = styled.p `
    // width: 100%;
    line-height:22px
`

export default App;