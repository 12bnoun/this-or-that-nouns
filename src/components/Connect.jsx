import React from 'react';
import styled from 'styled-components';

import detectEthereumProvider from '@metamask/detect-provider';

const ConnectWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  background: papayawhip;
`;

const ConnectButton = styled.div`
  color: #2c3e50;
  font-weight: bold;
  border: 2px solid #2c3e50;
  padding: 5px 10px;
  margin-top: 30px;
  margin-right: 50px;
  cursor: pointer;
`;

const AddressWrapper = styled.div`
  background: #feca57;
  border: 1px solid #feca57;
  padding: 5px 10px;
  border-radius: 25px;
  margin-top: 30px;
  margin-right: 15px;
  width: 150px;
  padding-left: 20px;
  padding-top: 8px;
  font-size: 17px;
  color: #2c3e50;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  font-family: "Courier New", monospace;
`;

class Connect extends React.Component {
  constructor(props) {
    super();

    this.state = {
      connectedMetamask: false,
      address: undefined,
    };

    this.connectMetamask = this.connectMetamask.bind(this);
  }

  componentDidMount() {
    const { ethereum } = window;

    detectEthereumProvider().then((provider) => {

      if (ethereum) {
        ethereum.enable().then((addressList) => {
          this.setState({
            connectedMetamask: true,
            address: addressList[0],
          });

          this.props.addressUpdate(addressList[0]);
        });  
      }
    });
  }

  async connectMetamask() {
    const { ethereum } = window;

    if (ethereum) {

      const { connectedMetamask } = this.state;

      if (connectedMetamask) {
        this.setState({
          connectedMetamask: false,
          address: undefined,
        });
      } else {
        const addressList = await ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({
          connectedMetamask: true,
          address: addressList[0],
        });
        this.props.addressUpdate(addressList[0]);
      }

    }
  }

  render() {

    const { address, connectedMetamask } = this.state;

    return (
      <ConnectWrapper>
        {address && <AddressWrapper>{address}</AddressWrapper>}
        <ConnectButton onClick={() => this.connectMetamask()}>{connectedMetamask ? 'Disconnect':'Connect'}</ConnectButton>
      </ConnectWrapper>
    )
  }
}

export default Connect;
