// * Regex: valid camera iso - only numbers
export const CAMERA_ISO_REGEX = /^[0-9]*$/i;

// * Regex: valid lens aperture - starts with 'f/' and finishes with number
export const CAMERA_LENS_APERTURE_REGEX = /^f\/[0-9]*\.[0-9]+$/i;

// * Regex: valid lens focal length - starts with number and finishes with 'mm'
export const CAMERA_LENS_FOCAL_LENGTH_REGEX = /^[0-9]+mm$/i;

// * Regex: valid lens shutter speed - starts with number, followed by '/' and finishes with number
export const CAMERA_LENS_SHUTTER_SPEED_REGEX = /^[0-9]+\/[0-9]+$/i;

// * Regex: valid email address - test@email.com
export const EMAIL_ADDRESS_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// * Regex: valid image file - .gif, jpeg, .jpg, .tiff, .png, .webp, .bmp
export const IMAGE_FILE_REGEX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

// * Regex: secure password - minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// * Regex: no support for special characters or numbers - Martin Luther King, Jr.
export const PERSON_NAME_REGEX = /^[a-z ,.'-]+$/i;

// * Regex: valid http/https url link - https://www.test.com
export const URL_LINK_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
