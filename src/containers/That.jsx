import React from "react";
// import RankDB from '../components/RankDB';
import Holder from "../components/Holder";
import Loading from "../components/Loading";
import styled from "styled-components";
import { client, gql } from "../client";

import "../components/flip-click.css";
import loadnoun from "../components/logo-noun.gif";

import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";

const ThatWrapper = styled.div`
  background: papayawhip;
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  margin-top: 60px;
  align-items: center;
`;

const HolderWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 300px;
  width: 1000px;
  margin-top: 30px;

  @media (max-width: 700px) {
    flex-direction: column;
    width: 100%;
    height: auto;
    align-items: center;

    & .scene {
      margin-bottom: 20px;
    }
  }
`;

const TitleWrapper = styled.div`
  /*font-family: 'Cedarville Cursive', cursive;*/
  /* font-family: "Sacramento", cursive; */
  font-family: "Minecraft", cursive;
  font-size: 61px;
  font-weight: bold;
  color: #2c3e50;

  @media (max-width: 700px) {
    font-size: 45px;
  }
`;

const LeaderboardLink = styled.div`
  display: flex;
  align-items: center;
  background: #f3cb2b;
  border-color: #f3cb2b;
  padding: 10px 20px;
  /* border-radius: 25px; */
  font-family: Minecraft;
  cursor: pointer;
  border-style: outset;

  &:hover {
    background: #e7bc0d;
    border-color: #e7bc0d;
  }

  @media (max-width: 700px) {
    margin: 25px 0px;
  }
`;

class That extends React.Component {
  constructor() {
    super();
    this.state = {
      left: {
        hash: 0,
        uri: loadnoun,
        //uri: 'https://nouns.wtf/static/media/loading-skull-noun.d7293d44.gif',
      },
      right: {
        hash: 1,
        uri: loadnoun,
        //uri: 'https://nouns.wtf/static/media/loading-skull-noun.d7293d44.gif',
      },
      limit: 0,
      isFrontLeft: true,
      isFrontRight: true,
      defaultUri: loadnoun,
      //defaultUri: 'https://nouns.wtf/static/media/loading-skull-noun.d7293d44.gif',
    };

    this.holderClick = this.holderClick.bind(this);
  }

  async getNextPair(prevId, otherId) {
    const nextPair = await client.query({
      query: gql`
        query NextPair($prevId: Int, $otherId: Int) {
          getNextPair(prevId: $prevId, otherId: $otherId) {
            left {
              hash
              uri
            }
            right {
              hash
              uri
            }
          }
        }
      `,
      variables: {
        prevId: prevId,
        otherId: otherId,
      },
    });

    return nextPair.data.getNextPair;
  }

  async getNext(prevId, otherId) {
    const next = await client.query({
      query: gql`
        query NextQuery($prevId: Int, $otherId: Int) {
          getNext(prevId: $prevId, otherId: $otherId) {
            hash
            uri
          }
        }
      `,
      variables: {
        prevId: prevId,
        otherId: otherId,
      },
    });

    return next.data.getNext;
  }

  async updateRank(id, over) {
    const { address } = this.props;

    if (!address) {
      return;
    }

    const vote = await client.mutate({
      mutation: gql`
        mutation VoteMutation(
          $leftHash: Int
          $rightHash: Int
          $address: String
        ) {
          addVote(id: $leftHash, over: $rightHash, address: $address)
        }
      `,
      variables: {
        leftHash: id,
        rightHash: over,
        address: address,
      },
    });
  }

  async holderClick(option) {
    const { left, right, limit, isFrontLeft, isFrontRight } = this.state;

    option
      ? this.updateRank(left.hash, right.hash)
      : this.updateRank(right.hash, left.hash);

    if (limit == 12) {
      this.props.history.push("/nouns/leaderboard");
    }

    const nextPair = await this.getNextPair(left.hash, right.hash);
    this.setState({
      left: nextPair.left,
      right: nextPair.right,
      limit: limit + 1,
      isFrontLeft: !isFrontLeft,
      isFrontRight: !isFrontRight,
    });
  }

  componentDidMount() {
    client
      .query({
        query: gql`
          {
            getPair {
              left {
                hash
                uri
              }
              right {
                hash
                uri
              }
            }
          }
        `,
      })
      .then((response) => {
        this.setState({
          left: response.data.getPair.left,
          right: response.data.getPair.right,
        });
      });
  }

  render() {
    const { left, right, isFrontLeft, isFrontRight, defaultUri } = this.state;
    return (
      <ThatWrapper>
        <TitleWrapper>this or that</TitleWrapper>

        <HolderWrapper>
          <div className="scene">
            <div className={isFrontLeft ? "card" : "card is-flipped"}>
              <div
                className={
                  isFrontLeft ? "card__face" : "card__face front--hidden"
                }
              >
                <Holder
                  text="this"
                  imgSrc={!isFrontLeft ? defaultUri : left.uri}
                  click={() => this.holderClick(true)}
                ></Holder>
              </div>

              <div className="card__face card__face--back">
                <Holder
                  text="this"
                  imgSrc={!isFrontLeft ? left.uri : defaultUri}
                  click={() => this.holderClick(true)}
                ></Holder>
              </div>
            </div>
          </div>

          <div className="scene">
            <div className={isFrontRight ? "card" : "card is-flipped-right"}>
              <div
                className={
                  isFrontRight ? "card__face" : "card__face front--hidden"
                }
              >
                <Holder
                  text="that"
                  imgSrc={!isFrontRight ? defaultUri : right.uri}
                  click={() => this.holderClick(false)}
                ></Holder>
              </div>

              <div className="card__face card__face--back">
                <Holder
                  text="that"
                  imgSrc={!isFrontRight ? right.uri : defaultUri}
                  click={() => this.holderClick(false)}
                ></Holder>
              </div>
            </div>
          </div>
        </HolderWrapper>

        <Link className="a-text" to="/nouns/leaderboard">
          <LeaderboardLink>
            <i className="gg-crown"></i>&nbsp;&nbsp;Affinity Ranking
          </LeaderboardLink>
        </Link>
      </ThatWrapper>
    );
  }
}

export default withRouter(That);
