import debounce from "lodash.debounce";

export const debounceUpdateQuantity = debounce(
  async (productId, updatedQuantity, patchFn) => {
    await patchFn(productId, updatedQuantity);
  },
  500
);
