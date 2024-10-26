/**
 * Returns a modified URL that reduces the width of the image to the specified value.
 * Defaults to 400px if width is not specified.
 * @param imageUrl The URL of the image
 * @param width The desired width of the image. Defaults to 400.
 * @returns The modified URL
 */
export const reduceImageWidth = (imageUrl: string, width: number = 400) =>
  imageUrl.replace(/w=\d+/, `w=${width}`);
