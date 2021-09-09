import axios from 'axios';

const api = axios.create({
    baseURL : 'https://kr.api.riotgames.com/lol/',
    headers : {   
        'Access-Control-Allow-Origin': '*'
    }
})

//아이디 검색
const API_KEY = '?api_key=RGAPI-c095299d-e5ed-498d-863f-a9e2fd15c1a8'

export const lolApi = {
    searchSummonerById : (id)=> api.get(`summoner/v4/summoners/by-name/${id}${API_KEY}`),
    matchSummonerById : (accountId)=> api.get(`match/v4/matchlists/by-account/${accountId}${API_KEY}`),
    // matchMachById : (matchId)=> api.get(``)
}