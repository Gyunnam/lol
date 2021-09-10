import React from 'react';
import styled from 'styled-components';


function MatchingTile({data}){

    console.log('matching:',data)
    
    const { KDA, champId } = data


    return(
        <>
            <div>KDA{ KDA }</div>
            <div>챔프{ champId }</div>
        </>
    )
}

export default MatchingTile