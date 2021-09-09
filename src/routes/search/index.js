import React, {useState} from 'react';
import { lolApi } from '../../api'
// import styled from 'styled-components'



const Search = ()=>{

    const [ id, setId] = useState('')
    const [ user, setUers ] = useState('')
    const [ matches, setMathes] = useState('')


    async function search(name){
        const result = await lolApi.searchSummonerById(name);
        // console.log(result)
        const {data:summonerId} = result
        
        setUers(summonerId.accountId)
        // console.log(summonerId)
        
        match(user)
        
    }
    async function match(user){
        const result = await lolApi.matchSummonerById(user);

        const {data:matchList} = result

        console.log(matchList)

        var a = []
        
        for(var i = 0 ; i < 15 ; i++){
            a.push(matchList.matches[i].gameId)
        }
        
        setMathes(a)
        console.log(matches)
    }

    const onKeyPress = (e)=>{
        if(e.key === "Enter"){
            setId(e.target.value)
        }

        search(id)
    }


    
    return(
        <>
            <input type="text" onKeyPress={onKeyPress} />
            <div>
                <p>값 : {id}</p>
            </div>
        </>
    )
}

export default Search

