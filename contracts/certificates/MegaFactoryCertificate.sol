pragma solidity ^0.4.15;

import "./FactoryCertificate.sol";

contract FactoryCertificateInterface {
    event CertificateStorageCreated(address certificate, uint now_time);

    function createCertificateStorage();

}

contract MegaFactoryCertificate is FactoryCertificateInterface {
    address owner;
    address osu;

    address factoryAddress;

    // Ownership of the contract
    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

      function MegaFactoryCertificate(address _owner, address _osu) {
          owner = _owner;
          osu = _osu;
      }

      function createCertificateStorageByInterface() public returns(bool) {
          require(factoryAddress != address(0));
          FactoryCertificateInterface factory = FactoryCertificateInterface(factoryAddress);
          factory.createCertificateStorage();
          return true;
      }

      function setFactoryAddress(address _factoryAddress) public OwnerOrOSUniversity returns(address) {
          factoryAddress = _factoryAddress;
          return factoryAddress;
      }

}
