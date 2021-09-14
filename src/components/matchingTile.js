import React, { useState } from 'react';
import styled from 'styled-components';
import ChapmionData from '../data/champion.json'
// import SummonerList from './SummonerList';


function MatchingTile({data, name, stats}){

    const [ on , setOn ] = useState(false)
    const {data:champ} =  ChapmionData
    
    const getValues = Object.values(champ)
        .filter(item=> item.key !== undefined)
            .map(item=>{
                return{
                    'id': item.id, 
                    'key': item.key,
                    'name' : item.name
                };
            });
    
    console.log('name원본:',name); // 유저의 닉네임을  
    console.log('stats원본:',stats); //챔피언 아이디를
    
    
    const championList = stats.map((item)=>{
        return item.champId
    })
    const team1Champ = championList.filter((item,index)=> index < 5)
    const team2Champ = championList.filter((item,index)=> index >= 5)

    const team1key = team1Champ.map((item)=>{
        const id = {'key' : item}
        const key = getValues
            .filter((item)=>{return item.key === `${id.key}`})
                .map(item=>{
                    return item.id
                })
        return key
    })
    const team2key = team2Champ.map((item)=>{
        const id = {'key' : item}
        const key = getValues
            .filter((item)=>{return item.key === `${id.key}`})
                .map(item=>{
                    return item.id
                })
        return key
    })
    const imgInIT = (arr)=>{
        const result = arr.map((item)=>{
            // console.log(item)
            return item.map(item=>{
                return (
                    <div>
                        <TeamImgBoX>
                            <TeamChampImg src={`http://ddragon.leagueoflegends.com/cdn/11.18.1/img/champion/${item}.png`} />
                        </TeamImgBoX>
                    </div>
                    )
            })
        })

        return result
    }

    const nameList = name.map((item)=>{
        return [item.name]
    })
    const team1Name = nameList.filter((item,index)=> index < 5 )
    const team2Name = nameList.filter((item,index)=> index >= 5 )

    const nameInit = (arr)=>{
        const list = arr.map((item)=>{
            return item.map(item=>{
                return(
                    <>
                        <TeamUserName>{item}</TeamUserName>
                    </>
                )
            })  
        })
        return list
    }

    // console.log(nameInit(team1Name))

    const { A, K ,D, KDA, champId, champLevel, cs, item, spell1Id, spell2Id, teamwin} = data

    //승패 변환
    const resultByGame = (teamwin)=> {
        return (teamwin === true ? '승리' : '패배')
    }
    // KDA 무한대 변환
    const conversionKDA = (KDA)=>{
        return (KDA === 'Infinity') ? 'Perfect' : KDA
    }

    //챔피언 name 메인
    const champName = getValues
        .filter((item)=>{return item.key === `${champId}`})
            .map(item=>{return item.name})
    //챔피언 id 메인
    const champKey = getValues
        .filter((item)=>{return item.key === `${champId}`})
            .map(item=>{return item.id})
    //챔피언 img 넣기
    const champImg = (key)=>{
        return(<ChapmImg src={`http://ddragon.leagueoflegends.com/cdn/11.18.1/img/champion/${key}.png`} />)
    }

    //스펠 이름 바꾸고 넣기
    const consversionSpell = (spellId)=>{
        switch(spellId){
            case 21:
                name = 'SummonerBarrier' 
                break
            case 1 :
                name = 'SummonerBoost'
                break
            case 14 :
                name = 'SummonerDot'
                break
            case 3 :
                name = 'SummonerExhaust'
                break
            case 4 :
                name = 'SummonerFlash'
                break
            case 6 :
                name = 'SummonerHaste'
                break
            case 7 :
                name = 'SummonerHeal'
                break
            case 13 :
                name = 'SummonerMana'
                break
            case 11 :
                name = 'SummonerSmite'
                break
            case 39 :
                name = 'SummonerSnowURFSnowball_Mark'
                break
            case 32 :
                name = 'SummonerSnowball'
                break
            case 12 :
                name = 'SummonerTeleport'
                break
            case 54 :
                name = 'Summoner_UltBook_Placeholder'
                break
            case 30 :
                name = 'SummonerPoroRecall'
                break
            case 31 :
                name = 'SummonerPoroThrow'
                break
            default:
                console.log('오류임')
        }
        return <SpellImg src={`http://ddragon.leagueoflegends.com/cdn/11.18.1/img/spell/${name}.png`} />
    }

    // 아이템 이미지 태그 생성
    const itemId = item.map((item)=>{
        return (item === 0) ? <NoImg /> : <Items><ItemImg src={`http://ddragon.leagueoflegends.com/cdn/11.18.1/img/item/${item}.png`} alt="" /></Items> 
    }) 
    
    //스텟 팀별로 나누기
    const team1Stats = stats.filter(item=>item.teamId === 100)
    const team2Stats = stats.filter(item=>item.teamId === 200)

    //이름별 나누기
    const team1User = name.filter((item,index)=> index < 5)
    const team2User = name.filter((item,index)=> index >= 5)

    const team1 = [
        {
            'teamStats' : team1Stats,
            'teamUser' : team1User
        }
    ]
    const team2 = [
        {
            'teamStats' : team2Stats,
            'teamUser' : team2User
        }
    ]
    
    
    // console.log('team1:',test);

    // 실수하면 여기 까지 z
    
    const totalData = (arr)=>{
        const result = arr.map(({teamStats,teamUser})=>{

            const userName = teamUser.map(item=>item.name)
            const userStats = teamStats.map((item,index)=>{
                //아이템 넣기
                const itemInit = item.item.map(item=>{
                    return (item === 0) ? <NoImg /> : <Items><ItemImg src={`http://ddragon.leagueoflegends.com/cdn/11.18.1/img/item/${item}.png`} alt="" /></Items>
                })
    
                
                //champId > 챔피언 이름으로 변경
                const champKey = getValues
                .filter((id)=>{return id.key === `${item.champId}`})
                    .map(item=>{return item.id})        
                //ward undefinde 변환
                const ward = (a)=>{
                    if(a === undefined){
                        return '0'
                    }
                    return a
                }
                return(
                    <tr key={index}>
                        <Cell>
                            <DeatailChampionImg>{champImg(champKey)}</DeatailChampionImg>
                        </Cell>
                        <Cell>
                            <Spell>{consversionSpell(item.spell1Id)}</Spell>
                            <Spell>{consversionSpell(item.spell2Id)}</Spell>
                        </Cell>
                        <Cell>
                            {userName[index]}
                        </Cell>
                        <Cell>{item.champLevel}</Cell>
                        <Cell>
                            <div>{item.K} / {item.D} / {item.A}</div>
                            <div>{item.KDA} : 1 평점</div>
                        </Cell>
                        <Cell>{item.damage}</Cell>
                        <Cell>
                            <DetailKDAWrap>
                                <DetailKDABox>시야점수: {item.visionscore}</DetailKDABox>
                                <DetailKDABox>제어와드: {item.visionwardsset}</DetailKDABox>
                                <DetailKDABox>와드: {ward(item.wardset)}</DetailKDABox>
                                <DetailKDABox>와드킬: {ward(item.wardskilled)}</DetailKDABox>
                            </DetailKDAWrap>
                        </Cell>
                        <Cell>{item.cs}</Cell>
                        <Cell>{itemInit}</Cell>
                    </tr>
                )
            })
            return userStats
        })
        return result
    }
    //테이블 짜잘한거 
    const table = (arr)=>{
        return(
            <>
                <colgroup>
                            <ColChampionImg/>
                            <ColSpellImg/>
                            <ColSummonerName/>
                            <ColLevel/>
                            <ColKDA/>
                            <ColDamage/>
                            <ColWard/>
                            <ColCS/>
                            <ColItem/>
                        </colgroup>
                        <TableH>
                            <tr>
                                <Th colSpan="3">{(arr[0].teamwin===true)?'승리':'패배'}</Th>
                                <Th>Level</Th>
                                <Th>KDA</Th>
                                <Th>피해량</Th>
                                <Th>와드</Th>
                                <Th>CS</Th>
                                <Th>아이템</Th>
                            </tr>
                        </TableH>
            </>
        )
    }

    return(
        <>
            <GameItemWrap>
                <GameItem>
                    <Content>
                        <GameResult>
                            <div className="result">
                                {
                                    resultByGame(teamwin)
                                }
                            </div>
                        </GameResult>
                        <GameSetInfo>
                            <ChampionImg>
                                {champImg(champKey)}
                            </ChampionImg>
                            <SummonerSpell>
                                <Spell>
                                    {consversionSpell(spell1Id)}
                                </Spell>
                                <Spell>
                                    {consversionSpell(spell2Id)}
                                </Spell>
                            </SummonerSpell>
                            <ChampionName>
                                {champName}
                            </ChampionName>
                        </GameSetInfo>
                        <GameKDA>
                            <div>
                                <span>{K}</span> / <span>{D}</span> / <span>{A}</span>
                            </div>
                            <div>
                                <span>{conversionKDA(KDA)}</span> : 1 평점
                            </div>
                        </GameKDA>
                        <Stats>
                            <div>레벨 {champLevel}</div>
                            <div><span>{cs}</span> CS</div>
                            <div>킬관여</div>
                        </Stats>
                        <ItemWrap>
                            <ItemList>
                                {itemId}
                            </ItemList>
                        </ItemWrap>
                        <TeamGroup>
                            <TeamContainer>
                                <TeamWrap>
                                    <div>
                                        {imgInIT(team1key)}
                                    </div>
                                    <div>
                                        {nameInit(team1Name)}
                                    </div>
                                </TeamWrap>
                                <TeamWrap>
                                    <div>
                                        {imgInIT(team2key)}
                                    </div>
                                    <div>
                                        {nameInit(team2Name)}
                                    </div>
                                </TeamWrap>
                            </TeamContainer>
                        </TeamGroup>
                        <DeatilBtn onClick={()=>{setOn(!on)}}>
                            상세
                        </DeatilBtn>
                    </Content>
                </GameItem>
                {
                    on === true
                    ? <TableContainer className="detail"> 
                        <TableWrap>
                            <Table>
                                {table(team1Stats)}
                                <tbody>
                                    {totalData(team1)}
                                </tbody>
                            </Table>
                            <Line />
                            <Table>
                                {table(team2Stats)}
                                <tbody>
                                    {totalData(team2)}
                                </tbody>
                            </Table>
                        </TableWrap>
                    </TableContainer>
                    : null
                }
            </GameItemWrap>
        </>
    )
}


const GameItemWrap = styled.div`
    position: relative;
    border-radius: 3px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const GameItem = styled.div`
    position: relative;
    background: none;
`

const Content = styled.div `
    width: 680px;
    display: tatble;
    border-collapse: collapse;
    border:1px solid #cdd2d2;
`

const GameResult = styled.div`
    width: 70px;
    text-align: center;
    font-size: 10px;
    line-height: 15px;

    display: table-cell;
    height: 96px;
    vertical-align: middle;
`
const GameSetInfo = styled.div`
    width: 90px;

    display: table-cell;
    height: 96px;
    vertical-align: middle;
`
const ChampionImg = styled.div`
    display: inline-block;
    width: 46px;
    height: 46px;
    vertical-align: middle;
    border-radius: 50%;
    overflow: hidden;
`
const ChapmImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    background: #000;
    `
const SummonerSpell = styled.div`
    display: inline-block;
    vertical-align: middle;
    margin-left: 4px;
`

const Spell = styled.div`
    display: block;
    width: 22px;
    height: 22px;
    margin-top: 2px;
    border-radius: 3px;
`
const SpellImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`

const ChampionName = styled.div`
    margin-top: 8px;
    font-size: 11px;
    color: #555;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const GameKDA = styled.div`
    text-align: center;
    width: 75px;
    display: table-cell;
    height: 96px;
    vertical-align: middle;
`
const Stats = styled.div`
    width: 90px;
    font-size: 11px;
    text-align: center;
    line-height: 18px;

    display: table-cell;
    height: 96px;
    vertical-align: middle;
`
const ItemWrap = styled.div`
    display: table-cell;
    width: 130px;
    height: 96px;
    vertical-align: middle;
`
const ItemList = styled.div`
    width: 96px;
    margin: 0 auto;
`
const Items = styled.div`
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius:3px;
    margin-top:2px;
    margin-right: 2px;
    overflow: hidden;
`
const NoImg = styled.div`
    display: inline-block;
    background-color: gray;
    border-radius:3px;
    margin-top:2px;
    margin-right: 2px;
    width: 22px;
    height: 22px;
`
const ItemImg = styled.img`
    width:100%;
    height:100%;       
`
const TeamGroup = styled.div`
    width: 170px;
    display: table-cell;
    height: 96px;
    vertical-align: middle;
`
const TeamContainer = styled.div`
    display: flex;
`
const TeamWrap = styled.div`
    width: 90px;
    display: flex;
    margin-right: 5px;
`
const TeamImgBoX = styled.div`
    width: 16px;
    height: 16px;
    margin-bottom: 1px;
    margin-right: 1px;
`

const TeamChampImg = styled.img`
    width: 100%;
    height: 100%;
`
const TeamUserName = styled.div`
    height: 16px;
    line-height: 16px;
    margin-left: 2px;
    margin-bottom: 1px;
    width: 65px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`
const DeatilBtn = styled.div`
    width: 35px;
    display: table-cell;
    height: 96px;
    vertical-align: middle;
    background: #5383e8;
    text-align: center;
    color: #fff;
    font-size: 9px;
`
//디테일부분
const TableContainer = styled.div`
    display : block;
    margin-top: 10px;
`
const TableWrap = styled.div`
    width: 680px;
    border: 1px solid #cdd2d2;
`
const Table = styled.table`
    width: 100%;
    table-layout: fixed;
`
const TableH = styled.thead`
    border: solid 1px #cdd2d2;
    background-color: #fff;
`
const Th = styled.th`
    height: 32px;
    color: #555e5e;
    font-size: 12px;
    font-weight: normal;
`
const ColChampionImg = styled.col`
    width: 44px;
`
const ColSpellImg = styled.col`
    width: 18px;
`
const ColSummonerName = styled.col`
    width: 85px;
`
const ColLevel = styled.col`
    width: 45px;
`

const ColKDA = styled.col`
    width: 96px;
`
const ColDamage = styled.col`
    width: 66px;
`
const ColWard = styled.col`
    width: 70px;
`
const ColCS = styled.col`
    width: 55px;
`
const ColItem = styled.col`
    width: 180px;
`
const Cell = styled.td`
    padding: 3px 0;
    text-align: center;
`
const DeatailChampionImg = styled.div`
    display: inline-block;
    width: 38px;
    height: 38px;
    vertical-align: middle;
    border-radius: 50%;
    overflow: hidden;
`
const DetailKDAWrap = styled.div`
    text-align: center;
`
const DetailKDABox = styled.div`
    font-size: 7px;
`
const Line = styled.div`
    width: 100%;
    background: #5383e8;
    height: 20px;
    
`

export default MatchingTile