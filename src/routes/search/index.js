import React, {useState} from 'react';
import styled from 'styled-components';
import { lolApi } from '../../api'
// import styled from 'styled-components'
import MatchingTile from '../../components/matchingTile';


const Search = ()=>{

    const [ id, setId ] = useState('')
    const [ mainPlayerData, setMainPlayerData ] = useState([])
    const [ playerstats , setPlayerstats ] = useState([])
    const [ playername , setPlayername ] = useState([])
    
    const onKeyPress = async (e)=>{
        
        if(e.key === "Enter"){
            setId(e.target.value)
            const user = await search(id)

            const matchId = await match(user)

            const result = await MatchLog(matchId,user)

            setPlayername(result.result.map(item=>item.match))
            setPlayerstats(result.result.map(item=>item.player))
            setMainPlayerData(result.mainPlayerData)
        }
    }

    return(
        <>
            <HeaderContainer>
                <Wrap>
                    <LogoBox href="/">
                        <LogoImg src="https://fontmeme.com/permalink/210912/1cfb34148eeaf0d1f78bef00884a3ba3.png" alt="logo" />
                    </LogoBox>
                    
                    <SearchInput type="text" placeholder="닉네임을 입력해주세요" autocomplete="off" onKeyPress={onKeyPress} />
                    
                </Wrap>
            </HeaderContainer>
            <Container>
                
                {
                    mainPlayerData.map((item,index)=>{
                        // console.log(item);
                        return <MatchingTile key={index} data={item[0]} stats={playerstats[index]} name={playername[index]} />
                
                    })
                }
            </Container>

        </>
    )
}

//닉네임으로 accountId 검색
async function search(name){
    const result = await lolApi.searchSummonerById(name);
    // console.log(result)
    const {data:summonerId} = result
    
    return summonerId.accountId
    // setUers(summonerId.accountId)
    // // console.log(summonerId)
    
    // match(user)
    
}

//accountId로 최근 15게임 매치 id 확인
async function match(user){
    const result = await lolApi.searchMatchById(user);

    const {data:matchList} = result

    // console.log(matchList)

    var a = []
    
    for(var i = 0 ; i < 15 ; i++){
        a.push(matchList.matches[i].gameId)
    }
    
    return a

    // setMathes(a)
    // // console.log(matches)
    
    // for(var j = 0 ; j < matches.length; j++){
    //     MatchLog(matches[j])
    // }
}

async function MatchLog (idList,user){

    const result = await Promise.all(
        idList.map(async(item)=> {
            const result = await lolApi.searchIdByMatch(item);
            const {data} = result
            // console.log(data);
            // console.log(data.participantIdentities)
    
            const player = data.participants.map((item, idx)=>{
                // console.log(item)
                return (
                    {
                        'teamId' : item.teamId,
                        'champId' : item.championId,
                        'spell1Id' : item.spell1Id,
                        'spell2Id' : item.spell2Id,
                        'champLevel' : item.stats.champLevel,
                        'K' : `${item.stats.kills}`,
                        'D' : `${item.stats.deaths}`,
                        'A' : `${item.stats.assists}`,
                        'KDA' : `${((item.stats.kills+item.stats.assists)/item.stats.deaths).toFixed(2)}`,
                        'item' : [
                            item.stats.item0,
                            item.stats.item1,
                            item.stats.item2,
                            item.stats.item3,
                            item.stats.item4,
                            item.stats.item5,
                            item.stats.item6,
                        ],
                        'teamwin' : item.stats.win,
                        'cs' : `${item.stats.neutralMinionsKilled + item.stats.totalMinionsKilled}`,
                        'participantId' : Number(idx+1),
                        'damage' : item.stats.totalDamageDealtToChampions,
                        'visionscore' : item.stats.visionScore,
                        'visionwardsset' : item.stats.visionWardsBoughtInGame,
                        'wardset' : item.stats.wardsPlaced,
                        'wardskilled' : item.stats.wardsKilled,
                    }
                )
            })
            const match = data.participantIdentities.map((i)=>{
                return(
                    {
                        'accountId' : i.player.accountId,
                        'participantId' : Number(i.participantId),
                        'name' : i.player.summonerName
                    } 
                )
            })
            
            return { player, match }
        })
    )
    

    //메인 플레이어 데이터
    const mainPlayerData = result.map(({player,match})=>{
        const mainPlayer = match.filter(item=>item.accountId === user)
        return player.filter(item=>item.participantId === mainPlayer[0].participantId)
    })
    // console.log(mainPlayerData)


    
    return { mainPlayerData, result }
}

const Container = styled.div`
    width: 700px;
    margin: 0 auto;
`
export default Search

const HeaderContainer = styled.div`
    width: 100%;
    height: 70px;
    background: #5383e8;
    margin-bottom: 15px;
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

const SearchInput = styled.input`
    width: 170px;
    height: 10px;
    border-radius: 5px;
    border : 1px solid #3867c4;
    padding: 15px;
`