import React from 'react';
import styled from 'styled-components';
import ChapmionData from '../data/champion.json'
// import SummonerList from './SummonerList';


function MatchingTile({data, name, stats}){


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
    
    // console.log('name원본:',name); // 유저의 닉네임을  
    // console.log('stats원본:',stats); //챔피언 아이디를
    
    const championList = stats.map((item)=>{
        return item.champId
    })
    const team1Champ = championList.filter((item,index)=> index < 5)
    const team2Champ = championList.filter((item,index)=> index >= 5)




    // console.log(team1Key);
    // console.log(team1Champ);
    
    // const key = getValues.filter((item,index)=>item.key === `${team1Champ[0]}`)
    const team1key = team1Champ.map((item)=>{
        const id = {'key' : item}
        const key = getValues
            .filter((item)=>{return item.key === `${id.key}`})
                .map(item=>{
                    return item.id
                })
        return key[0]
    })
    



    const allChampionImg = (key)=>{
        return key.map((item)=>{
            return <TeamChampImg src={`http://ddragon.leagueoflegends.com/cdn/11.18.1/img/champion/${item}.png`} />
        })
    }
    // console.log('key',team1key)
    

    const nameList = name.map((item)=>{
        return item.name
    })
    const team1Name = nameList.filter((item,index)=> index < 5 )
    const team2Name = nameList.filter((item,index)=> index >= 5 )

    const nameInit = (arr)=>{
        return arr.map((item)=>{
            return <div>{item}</div>
        })
    }
    // console.log(team1Name)
    const team1Info = ()=>{
        for(var i = 0 ; i < 5 ; i++){
            return (
                <>
                <div>{allChampionImg(team1key)}</div>
                <div>{nameInit(team1Name)}</div>
                </>
            )
            
        }
    }

    // console.log(nameList);
    
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
                                <div>
    
                                    {team1Info()}
                                </div>
                                <div>
                                    {nameInit(team2Name)}
                                </div>
                        </TeamGroup>
                        <DeatilBtn>버튼</DeatilBtn>
                    </Content>
                </GameItem>
                <div>디테일</div>
            </GameItemWrap>
        </>
    )
}

const GameItemWrap = styled.div`
    position: relative;
    border-radius: 3px;
    margin-bottom: 8px;
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
    width: 100px;

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

const TeamChampImg = styled.img`
    width: 100%;
    height: 100%;
`
const DeatilBtn = styled.div`
    width: 30px;

    display: table-cell;
    height: 96px;
    vertical-align: middle;
`

export default MatchingTile