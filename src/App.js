import styled from "styled-components";
import ChampionData from "./champion.json";
import lolItem from "./Item.json";
import GlobalStyle from "./GlobalStyles";

function App() {
  // const tem = lolItem.data[1001]
  // console.log(tem.description)
  const champion = ChampionData.data;
  console.log(champion);
  const getValues = Object.values(champion)
    .sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    })
    .map((entrie, index) => {
      const img = entrie.id;

      return (
        // console.log(entrie,index),
        <Item key={index}>
          <ChampImg
            src={
              "http://ddragon.leagueoflegends.com/cdn/11.17.1/img/champion/" +
              img +
              ".png"
            }
            alt={img}
            width="22px"
            height="22px"
          />
          <Name>{entrie.name}</Name>
        </Item>
      );
    });

  return (
    <div className="App">
      <GlobalStyle />
      <ListWrap>
        <List>{getValues}</List>
      </ListWrap>
      {/* <p>{tem.description}</p> */}
    </div>
  );
}

const ListWrap = styled.div`
  width: 850px;
  margin: 0 auto;
  border: 1px solid gray;
`;
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`;
const Item = styled.li`
  display: flex;
  width: 162px;
  margin: 3px 2px;
  height: 22px;
`;

const ChampImg = styled.img`
  margin-right: 5px;
`;

const Name = styled.p`
  width: 100%;
  line-height: 22px;
`;

export default App;
