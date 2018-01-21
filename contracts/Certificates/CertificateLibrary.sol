pragma solidity ^0.4.15;

library ProposalsLibrary {

    struct structCertificateAndAbstraction {
        address container;
        bool full;
    }

    structCertificateAndAbstraction[] referenceCertificates;

    function getCertificateInstances(uint index) constant returns(address, bool) {
        return (referenceCertificates[index].container, referenceCertificates[index].full);
    }

    function addCertificateInstances(address _storage) returns (uint) {
        referenceCertificates.push(structCertificateAndAbstraction(_storage, false));
        return referenceCertificates.length;
    }

    function countNrOfCertificates() constant returns(uint) {
        return referenceCertificates.length;
    }

}
