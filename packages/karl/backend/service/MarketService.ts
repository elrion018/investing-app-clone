import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { marketStackConfig } from '../../../common/backend/config';
import axios from 'axios';

@Service()
export default class MarketService {
  constructor() {}

  /**
   * @description home page에 렌더링할 stock들을 가져오는 service
   * @returns stock과 pagination을 담은 Object
   */
  public async getStocks() {
    try {
      const { accessKey } = marketStackConfig;
      let stocks = await (await axios.get(`http://api.marketstack.com/v1/tickers?access_key=${accessKey}`)).data;

      if (stocks) {
        return stocks;
      }

      throw new Error('getting stocks was failed in MarketService');
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description home page에 렌더링할 indices를 가져오는 service
   */

  public async getIndices() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description home page에 렌더링할 crypto currencies를 가져오는 service
   */
  public async getCryptoCurrencies() {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}