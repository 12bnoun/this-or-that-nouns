import React from "react";
import styled from "styled-components";
import { client, gql } from "../client";
import { Link } from "react-router-dom";
import { CgChevronLeftO as BackArrow } from "react-icons/cg";

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
  font-family: "Sacramento", cursive;
  font-family: "MinecraftiaRegular", sans-serif;
  /* font-size: 61px; */
  font-size: 50px;
  font-weight: bold;
  margin-top: 20px;
  color: #2c3e50;
  @media (max-width: 700px) {
    font-size: 40px;
  }
`;

const RankImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "MinecraftiaRegular", sans-serif;
`;

const LeaderboardWrapper = styled.div`
  background: white;
  width: 60%;
  min-height: 100vh;
  /* border-radius: 25px 0px 25px 0px; */
  border: 2px solid pink;
  margin-top: 20px;
  cursor: pointer;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
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
  cursor: default;
`;

const RankList = styled.div`
  height: 60px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bdc3c7;
  justify-content: space-between;
  font-family: "MinecraftiaRegular", sans-serif;
  &:hover {
    background: #feca57;
  }
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
      ranking: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: gql`
          {
            getRank {
              hash
              uri
              score
            }
          }
        `,
      })
      .then((response) => {
        this.setState({
          ranking: response.data.getRank,
        });
      });
  }

  render() {
    const ranking = this.state.ranking;
    return (
      <ThatWrapper>
        <TitleWrapper>
          <LeaderboardHeader>
            {/* <i className="gg-chevron-left-o"></i>&nbsp;&nbsp;this or that */}
            <Link className="back-link" to="/">
              <BackArrow className="back-arrow" />
            </Link>
            this or that
          </LeaderboardHeader>
        </TitleWrapper>
        <LeaderboardWrapper>
          <Header>
            &nbsp;&nbsp;<i className="em em-crown" aria-label="CROWN"></i>
          </Header>
          {ranking.map(({ uri, hash, score }) => RankL(uri, hash, score))}
        </LeaderboardWrapper>
      </ThatWrapper>
    );
  }
}

function RankL(uri, name, score) {
  return (
    <a href={`https://nouns.wtf/noun/${name}`} key={name}>
      <RankList>
        <RankImgWrapper>
          <RankImg src={uri} />
          <div>Noun #{name}</div>
        </RankImgWrapper>
        <div className="clap">
          <i className="em em-clap" aria-label="CLAP"></i>&nbsp;&nbsp;&nbsp;
          {parseFloat(score).toFixed(2)}
        </div>
      </RankList>
    </a>
  );
}
export default Leaderboard;
