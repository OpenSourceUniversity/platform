import Config from '../../config';

const { gasPriceUrl } = Config.network;

export default function getGasPrice() {
  return function dispatcher(dispatch) {
    return fetch(gasPriceUrl)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'GAS_PRICE_GET',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'GAS_PRICE_GET',
            gasPrice: body.fast,
            error: null,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'GAS_PRICE_GET',
          error,
        });
      });
  };
}
