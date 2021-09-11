import React from 'react';
import styled from 'styled-components';


function MatchingTile({data, team}){

    console.log('mainPlayer:',data)
    console.log('player:', team)
    
    const { A, K ,D, KDA, champId, champLevel, cs, item, spell1Id, spell2Id, teamId, teamwin} = data

    
    //승패 변환
    const resultByGame = (teamwin)=> {
        return (teamwin === true ? '승리' : '패배')
    }
    // KDA 무한대 변환
    const conversionKDA = (KDA)=>{
        return (KDA === 'Infinity') ? 'Perfect' : KDA
    }
    // 아이템 이미지 태그 생성
    const championImg = item.map((item)=>{
        return (item === 0) ? false : <div>{item}</div> 
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
                                {champId}
                            </ChampionImg>
                            <SummonerSpell>
                                <Spell>
                                    {spell1Id}
                                </Spell>
                                <Spell>
                                    {spell2Id}
                                </Spell>
                            </SummonerSpell>
                            <ChampionName>
                                {champId}
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
                            {/* 템스트 */}
                            <div>
                                {/* 아이템 하고 map함수 돌려서 */}
                                <div>{championImg}</div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div></div>
                        </ItemWrap>
                        <TeamGroup>

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
const TeamGroup = styled.div`
    width: 170px;

    display: table-cell;
    height: 96px;
    vertical-align: middle;
`
const DeatilBtn = styled.div`
    width: 30px;

    display: table-cell;
    height: 96px;
    vertical-align: middle;
`

export default MatchingTile