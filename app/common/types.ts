/**
 * API Types
 */
// Pages
export type TDetailMeta = {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  show_in_menus: boolean;
  seo_title: string;
  search_description: string;
  first_published_at: string; // ISO date string
  alias_of: string | null;
  locale: string;
};

// Images
export type TImageFrag = {
  src: string;
  width: number;
  height: number;
  alt: string;
};
export type TFullImage = {
  id: number;
  title: string;
  original: TImageFrag;
  medium: TImageFrag;
  thumbnail: TImageFrag;
};

// Home Page
export type TTestimonial = {
  id: number;
  slug: string;
  title: string;
  customer_name: string;
  occupation: string;
  lead_sentence: string;
  comment: string;
  image: {
    id: number;
    title: string;
    medium: TImageFrag;
  };
};

export type THomeTestimonial = {
  id: number;
  meta: {
    type: string;
  };
  testimonial: TTestimonial;
};

export type THomeServiceCard = {
  type: string;
  value: {
    image: TFullImage;
    title: string;
    text: string;
    link: string;
  };
  id: string;
};

export type THomePrice = {
  id: number;
  meta: {
    type: string;
  };
  class_price: TClassPrice;
};

export type THomeTeacher = {
  id: number;
  meta: {
    type: string;
  };
  teacher: TTeacherCard;
};

export type THomeBlogPost = {
  id: number;
  meta: {
    slug: string;
  };
  title: string;
  header_image: TFullImage;
  display_title: string;
  display_tagline: string;
  published_date: string; // ISO date string
  category: {
    id: number;
    name: string;
    ja_name: string;
    slug: string;
  };
};

// Prices
export type TClassPrice = {
  id: number;
  slug: string;
  title: string;
  display_title: string;
  length: number;
  length_unit: string;
  quantity: number;
  quantity_unit: string;
  max_num: number;
  is_native: boolean;
  is_online: boolean;
  is_inperson: boolean;
  has_onlinenotes: boolean;
  bookable_online: boolean;
  price_info: {
    name: string;
    display_name: string;
    pretax_price: string;
    posttax_price: string;
    is_sale: boolean;
    start_date: string; // ISO date string
    is_limited_sale: boolean;
    before_sale_pretax_price: string;
    before_sale_posttax_price: string | null;
    end_date: string | null;
  };
};

// Staff
export type TTeacherCard = {
  id: number;
  slug: string;
  title: string;
  display_name: string;
  display_tagline: string;
  image: {
    id: number;
    title: string;
    original: TImageFrag;
    thumbnail: TImageFrag;
  };
};

/*
 * Auth and Session
 */
type TAuthErrorsBase = {
  non_field_errors?: string[];
};

export type TUser = {
  id: number;
  email: string;
  contact: {
    name: string;
  };
  is_staff: boolean;
  groups: { name: string }[];
};
export type TUserData = {
  access: string;
  refresh: string;
  user: TUser;
};
/* Register */
export type TRegister = {
  email: string;
  password1: string;
  password2: string;
};
export type TRegisterFail = TAuthErrorsBase & {
  email?: string[];
  password1?: string[];
  password2?: string[];
};
export type TRegisterOk = {
  detail: string;
};

export type TRegisterResponse = {
  success: boolean;
  status: number;
  data: TRegisterOk | TRegisterFail;
};
export type TRegisterActionResponse = {
  fields: TRegister | null;
  data: null;
  errors: TRegisterFail | null;
};

/* Login */

export type TLogin = {
  email: string;
  password: string;
};
export type TLoginFail = TAuthErrorsBase & {
  email?: string[];
  password?: string[];
};
export type TLoginOk = {
  access: string;
  refresh: string;
  user: TUser;
};
export type TLoginResponse = {
  success: boolean;
  status: number;
  data: TLoginOk | TLoginFail;
};
export type TLoginActionResponse = {
  fields: TLogin | null;
  data: null;
  errors: TLoginFail | null;
};

/* Verify Email */

export type TVerifyResponse = {
  success: boolean;
  status: number;
  data: { detail: string };
};

/* Reset Password */
export type TPasswordResetOk = {
  detail: string;
};

export type TPasswordResetErrors = TAuthErrorsBase & {
  email?: string[];
};

export type TPasswordResetResponse = {
  success: boolean;
  status: number;
  data: TPasswordResetOk | TPasswordResetErrors;
};

export type TPasswordResetActionResponse = {
  fields: { email: string } | null;
  errors: TPasswordResetErrors;
};
/* reset confirm */
export type TResetConfirm = {
  newPassword1: string;
  newPassword2: string;
  uid: number;
  token: string;
};
export type TResetConfirmErrors = TAuthErrorsBase & {
  new_password1?: string[];
  new_password2?: string[];
  uid?: string[];
  token?: string[];
};
export type TResetConfirmOk = {
  detail: string;
};

export type TResetConfirmResponse = {
  success: boolean;
  status: number;
  data: TResetConfirmOk | TResetConfirmErrors;
};

export type TResetConfirmActionResponse = {
  fields: TResetConfirm | null;
  errors: TResetConfirmErrors;
};

/* JWT */
export type TRefreshToken = {
  access: string;
  access_expiration: string;
};

export type TValidateTokens = {
  accessToken: string;
  refreshToken: string;
};
export type TValidateTokensResponse = {
  isValid: boolean;
  isNew: boolean;
  newToken: string | null;
};
