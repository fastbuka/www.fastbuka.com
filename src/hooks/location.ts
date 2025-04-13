export const useLocation = () => {
  /**
   * Add address
   * @param param0
   * @returns
   * @description Adds the address to local storage
   * @example addAddress({ name: 'Home', address: '123 Main St', city: 'New York', state: 'NY', country: 'USA', longitude: -74.006, latitude: 40.7128 })
   */
  const addAddress = async ({
    name,
    address,
    city,
    state,
    country,
    longitude,
    latitude,
  }: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    longitude: number;
    latitude: number;
  }) => {
    const addressData = {
      name,
      address,
      city,
      state,
      country,
      longitude,
      latitude,
    };

    localStorage.setItem('address', JSON.stringify(addressData));
    return addressData;
  };

  /**
   * Get address
   * @returns
   * @description Returns the address from local storage
   * @example Address()
   */
  const getAddress = () => {
    const address = localStorage.getItem('address');
    if (address) {
      return JSON.parse(address);
    }
    return null;
  };

  /**
   * Remove address
   * @returns
   * @description Removes the address from local storage
   * @example removeAddress()
   */
  const removeAddress = () => {
    localStorage.removeItem('address');
  };

  return {
    addAddress,
    getAddress,
    removeAddress,
  };
};
