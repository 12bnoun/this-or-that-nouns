import React from 'react';
import styled from 'styled-components';
import { client, gql } from '../client';
import { Link } from 'react-router-dom';

const ThatWrapper = styled.div`
  background: papayawhip;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  /*font-family: 'Cedarville Cursive', cursive;*/
  font-family: 'Sacramento', cursive;
  font-size: 61px;
  font-weight: bold;
  margin-top: 20px;
  color: #2c3e50;
`;

const RankImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LeaderboardWrapper = styled.div`
  background: white;
  width: 60%;
  min-height: 100vh;
  border-radius: 25px 0px 25px 0px;
  border: 2px solid pink;
  margin-top: 20px;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Header = styled.div`
  height: 60px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bdc3c7;
`;

const RankList = styled.div`
  height: 60px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bdc3c7;
  justify-content: space-between;
`;

const RankImg = styled.img`
  border-radius: 25px;
  height: 40px;
  margin-right: 20px;
`;

const LeaderboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & i {
    margin-top: -5px;
  }
`;

class Leaderboard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ranking: []
    };
  }

  componentDidMount() {
    client.query({
      query: gql`{
        getRank {
          hash
          uri
          score
        }
      }
      `
    }).then(response => {
      this.setState({
        ranking: response.data.getRank
      });
    });
  }

  render() {

    const ranking = this.state.ranking;
    return (
      <ThatWrapper>
        <TitleWrapper>
          <Link className="a-text" to="/">
            <LeaderboardHeader><i class="gg-chevron-left-o"></i>&nbsp;&nbsp;this or that</LeaderboardHeader>
          </Link>
        </TitleWrapper>
        <LeaderboardWrapper>
          <Header>&nbsp;&nbsp;<i className="em em-crown" aria-label="CROWN"></i></Header>
          {
            ranking.map(({ uri, hash, score }) => RankL(uri, hash, score))
          }
        </LeaderboardWrapper>
      </ThatWrapper>
    );
  }
}

function RankL(uri, name, score) {
  return (
    <RankList key={name}>
      <RankImgWrapper>
        <RankImg src={uri}/>
        <div>Noun #{name}</div>
      </RankImgWrapper>
      <div><i className="em em-clap" aria-label="CLAP"></i>&nbsp;&nbsp;&nbsp;{parseFloat(score).toFixed(2)}</div>
    </RankList>
  )
}
export default Leaderboard;
