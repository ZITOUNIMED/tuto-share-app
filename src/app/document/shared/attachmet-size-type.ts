export enum AttachmentSizeType {
  SMALL= 'small size',
  MEDUIM= 'meduim size',
  BIG= 'big size',
}

export const ATTACHMENT_SIZE_CHOICES = [
  {
    key: AttachmentSizeType.SMALL,
    value: 'Small image',
  },
  {
    key: AttachmentSizeType.MEDUIM,
    value: 'Meduim image',
  },
  {
    key: AttachmentSizeType.BIG,
    value: 'Big image',
  }
]

export const sizeValues = (type: AttachmentSizeType) => {
  let size = null;
  switch(type){
    case AttachmentSizeType.SMALL:
      size = {
        width: 150,
        height: 150,
      };
      break;
    case AttachmentSizeType.MEDUIM:
      size = {
        width: 500,
        height: 500,
      };
      break;
    case AttachmentSizeType.BIG:
    size = {
      width: 900,
      height: 900,
    };
      break;
    default:
      size = {
        width: 500,
        height: 500,
      };
  }
  return size;
};
