"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICEFEED = void 0;
const BTC_USD = '0xc907e116054ad103354f2d350fd2514433d57f6f';
const ETH_USD = '0xf9680d99d6c9589e2a93a78a04a279e509205945';
const SOL_USD = '0x10c8264c0935b3b9870013e057f330ff3e9c56dc';
const BNB_USD = '0x82a6c4af830caa6c97bb504425f6a66165c2c26e';
exports.PRICEFEED = {
    CL_URL: {
        [BTC_USD]: 'https://data.chain.link/polygon/mainnet/crypto-usd/btc-usd',
        [ETH_USD]: 'https://data.chain.link/polygon/mainnet/crypto-usd/eth-usd',
        [SOL_USD]: 'https://data.chain.link/polygon/mainnet/crypto-usd/sol-usd',
        [BNB_USD]: 'https://data.chain.link/polygon/mainnet/crypto-usd/bnb-usd',
    },
};
//# sourceMappingURL=pricefeed.js.map