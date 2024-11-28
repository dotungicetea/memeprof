declare global {
  interface Window {
    Telegram: {
      WebApp: Telegram;
      Utils: {
        sessionStorageGet: (key: string) => string;
        sessionStorageSet: (key: string, value: string) => void;
        urlAppendHashParams: (url: string, addHash: string) => string;
        urlParseHashParams: (url: string) => string;
        urlParseQueryString: (queryString: string) => string;
        urlSafeDecode: (url: string) => string;
      };
    };
  }
}

export type WebAppUser = {
  id: number; //A unique identifier for the user or bot.
  is_bot?: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium?: boolean;
  photo_url?: string; //Optional. URL of the user’s profile photo.
};

export type UserDataType = {
  query_id: string;
  user?: WebAppUser;
  receiver?: any;
  chat?: any;
  start_param?: string; //Optional. The value of the startattach parameter, passed via link. Only returned for Web Apps when launched from the attachment menu via link.
  can_send_after?: number; //Optional. Time in seconds, after which a message can be sent via the answerWebAppQuery method.
  auth_date: number;
  hash: string;
};

export type eventType =
  | "themeChanged"
  | "viewportChanged"
  | "mainButtonClicked"
  | "backButtonClicked"
  | "settingsButtonClicked"
  | "invoiceClosed"
  | "popupClosed "
  | "qrTextReceived"
  | "clipboardTextReceived"
  | "writeAccessRequested"
  | "contactRequested";

export type invoiceStatus = "paid" | "failed" | "canceled" | "pending ";
export type NotificationType = "success" | "warning" | "error";
export type popupParams = {
  title?: string; //0-64 characters
  message: string; //1-256 characters.
  buttons?: {
    id?: string | number; //If the button is pressed, its id is returned in the callback and the popupClosed event.
    text?: string; //0-64 characters  Required if type is default or destructive. Irrelevant for other types.
    type?: "default" | "cancel" | "destructive" | "ok" | "close";
  }[]; //1-3 buttons. Set to [{“type”:“close”}] by default.
};
export type BackButtonType = {
  isVisible: boolean;
  onClick: (clb: () => void) => void;
  offClick: (clb: () => void) => void;
  show: () => void;
  hide: () => void;
};

export type CloudStorage = {
  setItem: (
    key: string,
    value: string,
    clb?: (param: null | Error, stored: boolean) => void
  ) => void;
  getItem: (
    key: string,
    clb?: (param: null | Error, value: string) => void
  ) => void;
  getItems: (
    keys: string[],
    clb?: (param: null | Error, values: string[]) => void
  ) => void;
  removeItem: (
    key: string,
    clb?: (param: null | Error, removed: boolean) => void
  ) => void;
  removeItems: (
    keys: string[],
    clb?: (param: null | Error, removed: boolean) => void
  ) => void;
  getKeys: (clb?: (param: null | Error, keys: string[]) => void) => void;
};

export type ImpactStyleType = "light" | "medium" | "heavy" | "rigid" | "soft";

export type MainButtonType = {
  text: string; //Current button text. Set to CONTINUE by default.
  color: string; //Current button color. Set to themeParams.button_color by default.
  textColor: string; //Current button text color. Set to themeParams.button_text_color by default.
  isVisible: boolean; //defaul false
  isActive: boolean; // default true
  isProgressVisible: boolean; //Readonly. Shows whether the button is displaying a loading indicator.
  setText: (text: string) => void;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
  show: () => void;
  hide: () => void;
  enable: () => void;
  disable: () => void;
  showProgress: (leaveActive?: boolean) => void;
  hideProgress: () => void;
  setParams: (params: {
    text?: string;
    color?: string;
    text_color?: string;
    is_visible?: boolean;
    is_active?: boolean;
  }) => void;
};

export type SettingsButton = {
  isVisible: boolean;
  onClick: (clb: () => void) => void;
  offClick: (clb: () => void) => void;
  show: () => void;
  hide: () => void;
};

type Telegram = {
  initData: string;
  initDataUnsafe: UserDataType;
  version: string; //The version of the Bot API available in the user's Telegram app.
  colorScheme: "light" | "dark";
  platform: string | "unkown";
  themeParams: {
    bg_color: string; // #RRGGBB --> var(--tg-theme-bg-color)
    secondary_bg_color: string; // #RRGGBB --> var(--tg-theme-secondary-bg-color)
    button_text_color: string; // #RRGGBB --> var(--tg-theme-button-text-color)
    button_color: string; // #RRGGBB --> var(--tg-theme-button-color)
    link_color: string; // #RRGGBB --> var(--tg-theme-link-color)
    hint_color: string; // #RRGGBB --> var(--tg-theme-hint-color)
    text_color: string; // #RRGGBB --> var(--tg-theme-text-color)
    header_bg_color: string; // #RRGGBB --> var(--tg-theme-header-bg-color)
    accent_text_color: string; // #RRGGBB --> var(--tg-theme-accent-text-color)
    section_bg_color: string; // #RRGGBB --> var(--tg-theme-section-bg-color)
    section_header_text_color: string; // #RRGGBB --> var(--tg-theme-section-header-text-color)
    subtitle_text_color: string; // #RRGGBB --> var(--tg-theme-subtitle-text-color)
    destructive_text_color: string; // #RRGGBB --> var(--tg-theme-destructive-text-color)
  };
  isExpanded: boolean;
  viewportHeight: number; //The current height of the visible area of the Web App
  viewportStableHeight: number;
  headerColor: string; //Current header color
  backgroundColor: string; //Current background color

  isClosingConfirmationEnabled: boolean;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;

  BackButton: BackButtonType;
  MainButton: MainButtonType;
  CloudStorage: CloudStorage;
  SettingsButton: SettingsButton;

  isVerticalSwipesEnabled: boolean;
  disableVerticalSwipes: () => void;
  enableVerticalSwipes: () => void;

  HapticFeedback: {
    impactOccurred: (style: ImpactStyleType) => void;
    notificationOccurred: (type: NotificationType) => void;
    selectionChanged: () => void;
  };
  isVersionAtLeast: (version: string) => boolean;
  setHeaderColor: (color: "bg_color" | "secondary_bg_color" | string) => void;
  setBackgroundColor: (
    color: "bg_color" | "secondary_bg_color" | string
  ) => void;

  onEvent: (eventType: eventType, callback: () => void) => any;
  // onEvent(
  //   eventType: "invoiceClosed",
  //   callback: () => {
  //     url: string;
  //     status: "paid" | "failed" | "canceled" | "pending ";
  //   }
  // );
  offEvent: (eventType: eventType, callback: () => void) => void;
  sendData?: (data: any) => void;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void; // opens in external browser
  openTelegramLink: (url: string) => void; // opens in telegram
  openInvoice: (url: string, clb?: (status: invoiceStatus) => void) => void;
  showPopup: (
    params: popupParams,
    clb?: (id?: string | number) => void
  ) => void;
  showConfirm: (
    message: string,
    clb?: (status: boolean) => void //the first argument will be a boolean indicating whether the user pressed the 'OK' button.
  ) => void;
  showAlert: (message: string, clb?: () => void) => void; // clb called when the user closes the alert.
  ready: () => void;
  expand: () => void;
  close: () => void;
};

export default Telegram;
