/**
 * This file is created to keep all workflow related configurations.
 * If new workflow is getting added in future, this file can get utilize for the same.
 *
 */
export enum ProductIds {
  // eslint-disable-next-line no-unused-vars
  devIns = 'dev_ins'
}

export interface BuyflowProps {
  productId: ProductIds;
}

export const PRODUCT_IDS_TO_NAMES = {
  [ProductIds.devIns]: 'Developer Insurance'
};
