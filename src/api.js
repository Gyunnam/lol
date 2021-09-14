import axios from 'axios';

const api = axios.create({
    baseURL : 'https://kr.api.riotgames.com/lol/',
    headers : {   
        'Access-Control-Allow-Origin': '*'
    }
})

//아이디 검색
const API_KEY = '?api_key=RGAPI-90b44d94-91dc-4b38-b987-4dc05e0adaa9'


export const lolApi = {
    searchSummonerById : (id)=> api.get(`summoner/v4/summoners/by-name/${id}${API_KEY}`),
    searchMatchById : (accountId)=> api.get(`match/v4/matchlists/by-account/${accountId}${API_KEY}`),
    searchIdByMatch : (id)=> api.get(`match/v4/matches/${id}${API_KEY}`)
    
}