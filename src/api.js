import axios from 'axios';

const api = axios.create({
    baseURL : 'https://kr.api.riotgames.com/lol/',
    headers : {   
        'Access-Control-Allow-Origin': '*'
    }
})

//아이디 검색
const API_KEY = '?api_key=RGAPI-29ac1a81-a759-4747-bf51-dc7bb8336da9'


export const lolApi = {
    searchSummonerById : (id)=> api.get(`summoner/v4/summoners/by-name/${id}${API_KEY}`),
    searchMatchById : (accountId)=> api.get(`match/v4/matchlists/by-account/${accountId}${API_KEY}`),
    searchIdByMatch : (id)=> api.get(`match/v4/matches/${id}${API_KEY}`)
    
}