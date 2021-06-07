import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

const devURL = 'http://localhost:3000';

enum tickersMap {
  DOW_JONES_30 = 'TSLA',
  NASDAQ_100 = 'NVDA',
  FRANCE_40 = 'DOCU',
  NIKKEI_255 = 'MSFT',
  BIT_COIN = 'ZM',
  LITE_COIN = 'EBAY',
  ETHEREUM = 'MOS',
  IOTA = 'AAL',
}

export interface getSearchedItemsInfo {
  keyword: string;
  email: string;
}

export interface getItemDetailInfo {
  email: string;
  symbols: string;
}

export interface getNewsAndAnalysesInfo {
  offset: number;
  limit: number;
  tickers: String[];
}

export interface createBookmarkInfo {
  email: string;
  symbol: string;
  name: string;
  category: string;
}

export interface deleteBookmarkInfo {
  email: string;
  symbol: string;
  name: string;
  category: string;
}

/**
 * @description search page에 렌더링할 searched items를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns Promise
 */
const getSearchedItems = async ({ keyword, email }: getSearchedItemsInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/search/items?keyword=${keyword}&email=${email}`);

    if (result.status === 200) {
      const { data: searchedItems } = result;

      return searchedItems;
    }

    throw new Error('Getting searched items was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description search page에 렌더링할 searched news를 가져오는 front-side API call 함수
 * @param param0
 * @returns
 */
const getSearchedNews = async ({ offset, limit, tickers }: getNewsAndAnalysesInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/search/news`, {
      params: { offset, limit, tickers },
    });

    if (result.status === 200) {
      const { data: news } = result;

      return news;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * search page에 렌더링할 searched analyses를 가져오는 front-side API call 함수
 * @param param0
 * @returns
 */
const getSearchedAnalyses = async ({ offset, limit, tickers }: getNewsAndAnalysesInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/search/analyses`, {
      params: { offset, limit, tickers },
    });

    if (result.status === 200) {
      const { data: news } = result;

      return news;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description item detail page에 렌더링할 item detail를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns Promise
 */
const getItemDetail = async ({ symbols, email }: getItemDetailInfo) => {
  try {
    let isStock = true;

    const result = await Axios.get(`${devURL}/api/item-detail`, {
      params: {
        symbols: tickersMap[symbols] ? tickersMap[symbols] : symbols,
        email,
      },
    });

    if (tickersMap[symbols]) {
      isStock = false;
    }

    if (result.status === 200) {
      const { data: itemDetail } = result;
      itemDetail.isStock = isStock;

      return itemDetail;
    }

    throw new Error('Getting item detail was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description item detail page에 렌더링할 news들을 가져오는 front-side API 호출 함수 현재 item detail용 service가 없어서 대체 사용중
 * @param param0
 * @returns Promise
 */
const getNews = async ({ offset, limit, tickers }: getNewsAndAnalysesInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/articles/news`, {
      params: { offset, limit, tickers },
    });

    if (result.status === 200) {
      const { data: news } = result;

      return news;
    }

    throw new Error('Getting news was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description item detail page에 렌더링할 analyses를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns Promise
 */

const getAnalyses = async ({ offset, limit, tickers }: getNewsAndAnalysesInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/articles/analyses`, {
      params: { offset, limit, tickers },
    });

    if (result.status === 200) {
      const { data: analyses } = result;

      return analyses;
    }

    throw new Error('Getting analyses was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description email, symbol을 받아 북마크 추가를 요청하는 front-side API call 함수
 * @param param0
 * @returns Promise
 */
const createBookmark = async ({ email, symbol, name, category }: createBookmarkInfo) => {
  try {
    const result = await Axios.post(`${devURL}/api/bookmark`, {
      email,
      symbol,
      name,
      category,
    });

    if (result.status === 201) {
      const { data: bookmark } = result;

      return bookmark;
    }

    throw new Error('Creating bookmark was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

const deleteBookmark = async ({ email, symbol, name, category }: deleteBookmarkInfo) => {
  try {
    const result = await Axios.delete(`${devURL}/api/bookmark`, {
      data: { email, symbol, name, category },
    });

    if (result.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description email을 받아 bookmarks를 가져오는 front-side API call 함수
 * @param email
 * @returns Promise
 */

const getBookmarks = async (email: string) => {
  try {
    const result = await Axios.get(`${devURL}/api/bookmark?email=${email}`);

    if (result.status === 200) {
      const { data: bookmarks } = result;

      return bookmarks;
    }

    throw new Error('Getting bookmarks was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

export {
  getSearchedAnalyses,
  getSearchedItems,
  getItemDetail,
  getNews,
  getAnalyses,
  createBookmark,
  getBookmarks,
  deleteBookmark,
  getSearchedNews,
};
