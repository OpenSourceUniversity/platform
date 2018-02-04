// import PositionStorage from '../../../build/contracts/PositionStorage.json';
// import store from '../../store';
//
// const contract = require('truffle-contract');
//
//
// export function addPosition(state) {
//   let web3 = store.getState().web3.web3Instance;
//   const positionStorage = contract(PositionStorage);
//   positionStorage.setProvider(web3.currentProvider);
//
//   var positionStorageInstance;
//
//   web3.eth.getCoinbase((error, coinbase) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//
//     positionStorage.deployed().then(function(instance) {
//       positionStorageInstance = instance;
//
//       positionStorageInstance.addPosition(ala, bala, {from: coinbase})
//       .then(function(result) {
//         console.log(result);
//       })
//       .catch(function(error) {
//         console.error(error);
//       });
//     });
//
//   });
// }
