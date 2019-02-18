export default {
  isNullOrUndefined(data) {
    return typeof data === 'undefined' || (!data && typeof data === 'object');
  },

  isString(data) {
    return typeof data === 'string';
  },

  isEmptyObject(obj) {
    if (!this.isObject(obj)) {
      return true;
    }
    return !Object.keys(obj).length;
  },

  isObject(obj) {
    return typeof obj === 'object';
  },
};

export const insertMediaType = (req) => {
  const { body } = req;
  const { files } = body;
  const { mediaFile } = files;
  const { mimetype } = mediaFile;
  const MediaType = (mimeType) => {
    const video = [
      'video/mp4',
      'application/mp4',
      'video/3gpp',
      'video/3gpp2',
      'video/x-msvideo',
      'video/x-ms-wmv',
      'video/quicktime',
      'video/x-flv',
    ];
    return video.map((choices) => mimeType === choices && true);
  };
  const checkMedia = MediaType(mimetype);
  const checkTypeOfMedia = (options) =>
    options.includes(true) ? 'video' : 'photo';
  return checkTypeOfMedia(checkMedia);
};
