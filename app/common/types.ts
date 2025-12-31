/*
 * Schedules Types
 */
type TAPISchedule = {
  slug: string;
  schedule_url: string;
  teacher: { name: string; id: number };
  language_school: { name: string };
};

export type TAPISchedules = TAPISchedule[];

export type TSchedulesObject = {
  slug: string;
  url: string;
  teacher: string;
  school: string;
};

export type TSchedulesBySchool = {
  [key: string]: TSchedulesObject[];
};

/*
 * Video Call Types
 */
export type TVideoCall = {
  slug: string;
  teacher: { name: string; id: number };
  host_room_url: string;
  room_url: string;
};
export type TVideoCalls = TVideoCall[];

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
// Prices

type TPriceInfo = {
  name: string;
  display_name: string;
  pretax_price: string;
  posttax_price: string;
  is_sale: boolean;
  before_sale_pretax_price: string | null;
  before_sale_posttax_price: string | null;
  start_date: string; // ISO timestamp
  end_date: string | null;
};

export type TPrice = {
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
  price_info: TPriceInfo;
};

export type TPricePlan = {
  id: number;
  meta: {
    type: string; // e.g. "courses.CommonPricePlans"
  };
  price_plan: TPrice;
};

// WagTail Blocks
export type TRichTextBlock = {
  type: "rich_text";
  value: string;
  id: string;
};

export type TYoutubeBlock = {
  type: "youtube";
  value: {
    src: string;
    short: boolean;
    limit: boolean;
  };
  id: string;
};

export type TConversationBlock = {
  type: "conversation";
  value: {
    person_one_name: string;
    person_two_name: string;
    title: string;
    intro: string;
    conversation: { person_one: string; person_two: string }[];
  };
  id: string;
};
type BaseImageBlock = {
  value: {
    image: TFullImage;
    caption: string;
    author: string;
    attribution_url: string;
    license_type: string;
    license_url: string;
  };
  id: string;
};
export type TTextWidthImageBlock = { type: "text_width_img" } & BaseImageBlock;
export type TFullWidthImageBlock = { type: "full_width_img" } & BaseImageBlock;
export type TBeyondTextImageBlock = {
  type: "beyond_text_img";
} & BaseImageBlock;

export type TSimpleImageBlock = {
  type: "simple_image_block";
  value: {
    image: TFullImage;
    caption: string;
  };
  id: string;
};

// Images
export type TImageFrag = {
  src: string;
  width: number;
  height: number;
  alt: string;
};
export type TOrigThumbImage = {
  id: number;
  title: string;
  original: TImageFrag;
  thumbnail: TImageFrag;
};
export type TFullImage = {
  id: number;
  title: string;
  original: TImageFrag;
  medium: TImageFrag;
  thumbnail: TImageFrag;
};

export type TAltFullImage = { alt: string } & TFullImage;

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
    name_en: string;
  };
  is_staff: boolean;
  groups: { name: string }[];
};
export type TUserData = {
  access: string;
  refresh: string;
  user: TUser;
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

export type TLoginResponse =
  | {
      success: false;
      status: number;
      data: null;
      errors: TLoginFail;
    }
  | {
      success: true;
      status: number;
      data: TLoginOk;
      errors: null;
    };

export type TLoginAction = {
  success: false;
  status: number;
  data: null;
  errors: TLoginFail;
  fields: TLogin;
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

export type TRegisterResponse =
  | {
      success: false;
      status: number;
      data: null;
      errors: TRegisterFail;
    }
  | {
      success: true;
      status: number;
      data: TRegisterOk;
      errors: null;
    };

export type TRegisterActionResponse = {
  success: false;
  status: number;
  data: null;
  errors: TRegisterFail;
  fields: TRegister;
};

// Verify Email
type TVerifyEmailFail = {
  success: false;
  status: number;
  data: null;
  errors: { detail: string };
};

type TVerifyEmailSuccess = {
  success: true;
  status: number;
  data: { detail: string };
  errors: null;
};

export type TVerifyEmailResponse = TVerifyEmailSuccess | TVerifyEmailFail;

// Reset Password
export type TPasswordResetOk = {
  detail: string;
};

export type TPasswordResetErrors = TAuthErrorsBase & {
  email?: string[];
};

export type TPasswordResetResponse =
  | {
      success: false;
      status: number;
      data: null;
      errors: TPasswordResetErrors;
    }
  | {
      success: true;
      status: number;
      data: TPasswordResetOk;
      errors: null;
    };

export type TPasswordResetActionResponse = {
  success: false;
  status: number;
  data: null;
  errors: TPasswordResetErrors;
  fields: { email: string };
};

/* reset confirm */
export type TResetConfirm = {
  new_password1: string;
  new_password2: string;
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

export type TResetConfirmResponse =
  | {
      success: false;
      status: number;
      data: null;
      errors: TResetConfirmErrors;
    }
  | {
      success: true;
      status: number;
      data: TResetConfirmOk;
      errors: null;
    };

export type TResetConfirmActionResponse = {
  success: false;
  status: number;
  data: null;
  errors: TResetConfirmErrors;
  fields: TResetConfirm;
};

/* JWT */
export type TRefreshedToken = {
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
  accessToken: string | null;
};
