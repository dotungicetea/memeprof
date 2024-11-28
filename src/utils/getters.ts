import { User } from "grammy/types";
import { DEFAULT_TAX_PERCENTAGE } from "../app/constants";
import Telegram, { UserDataType } from "../types/telegram";
import { isBrowser, isEmpty } from "./helpers";
import { darkTheme } from "./palette";

export const getTelegram = (): Telegram | undefined => {
  return isBrowser
    ? {
        ...window?.Telegram?.WebApp,
        showConfirm: isEmpty(window?.Telegram?.WebApp?.initDataUnsafe)
          ? (message, okCallback) => {
              const ok = confirm(message);

              okCallback?.(ok);
            }
          : window?.Telegram?.WebApp?.showConfirm,
        showAlert: isEmpty(window?.Telegram?.WebApp?.initDataUnsafe)
          ? (message) => {
              alert(message);
            }
          : window?.Telegram?.WebApp?.showAlert,
        themeParams: isEmpty(window?.Telegram?.WebApp?.initDataUnsafe)
          ? darkTheme
          : window?.Telegram?.WebApp?.themeParams,
        CloudStorage: window?.Telegram?.WebApp?.isVersionAtLeast("6.9")
          ? window?.Telegram?.WebApp?.CloudStorage
          : {
              setItem: (
                key: string,
                value: string,
                clb?: (param: null | Error, is_stored: boolean) => void
              ) => {
                window.localStorage.setItem(key, value);
                clb?.(null, true);
              },

              getItem: (
                key: string,
                clb?: (param: null | Error, value: string) => void
              ) => {
                const value = window.localStorage.getItem(key);
                clb?.(null, value as string);
              },
              getItems: (
                keys: string[],
                clb?: (param: null | Error, value: string[]) => void
              ) => {
                const value = keys.map((key) =>
                  window.localStorage.getItem(key)
                );
                clb?.(null, value as string[]);
              },

              getKeys: (
                clb?: (param: null | Error, value: string[]) => void
              ) => {
                const keys = Object.keys(window.localStorage);
                clb?.(null, keys);
              },

              removeItem: (
                key: string,
                clb?: (param: null | Error, value: boolean) => void
              ) => {
                window.localStorage.removeItem(key);
                clb?.(null, true);
              },

              removeItems: (
                keys: string[],
                clb?: (param: null | Error, removed: boolean) => void
              ) => {
                keys.forEach((key) => window.localStorage.removeItem(key));
                clb?.(null, true);
              },
            },
      }
    : undefined;
};

export const getTgUser = (): UserDataType | undefined => {
  const Telegram = getTelegram();

  if (Telegram) {
    const tgQuery = window?.Telegram?.Utils?.urlParseQueryString(
      Telegram?.initData
    ) as any;

    return {
      query_id: tgQuery?.query_id,
      user:
        process.env.NODE_ENV === "production"
          ? JSON.parse(tgQuery?.user || "{}")
          : {
              id: "1839588386",
            },

      auth_date: tgQuery?.auth_date,
      hash: tgQuery?.hash,
    };
  }

  return undefined;
};

export const getMainButton = () => {
  const Telegram = getTelegram();
  return Telegram?.MainButton;
};

const getName = (user: any) => {
  if (user.username) {
    return `@${user.username}`;
  } else if (user.first_name || user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  } else {
    return "Link to user";
  }
};

export const getUsername = (user: any) =>
  user.first_name || user.last_name || user.username || "";

const seperator = "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _";

export const getQueryMessage = (
  user: any,
  order: any,
  other: {
    delivery_fee: number;
  }
) => {
  return `<b>Your order is successfully placed</b>

<b>Order ID:</b> <code>#${order.id}</code>
<b>Status:</b> <i>Processing</i>
${seperator}

<b>👇Order Details👇</b>
 
${order.items
  ?.map(
    (item: any) =>
      ` - ${item.name} ${item.quantity}x$${item.price} = <i>$${item.total}</i>`
  )
  .join("\n" + seperator + "\n")}

${seperator}

<b>Total:</b> <code>$${order.total}</code>
<b>🛵Delivery Fee:</b> <i>$${other.delivery_fee}</i>

Thank you ${getUsername(user)} for purchasing!`;
};

export const getAdminMessage = (
  {
    full_name,
    address,
    phone,
    email,
    order_note,
    user,
    delivery_fee,
  }: {
    full_name: string;
    address: string;
    phone: string;
    email: string;
    order_note?: string;
    user: User;
    delivery_fee: number;
  },
  order: any
) => {
  return `<b>New Order from (@${user.username})</b>

<b>Order ID:</b> <code>#${order.id}</code>
<b>Status:</b> <i>Processing</i>
<b>Customer:</b> ${full_name}
<b>Contact:</b> <a href="tg://user?id=${user.id}">${getName(user)}</a>
<b>Phone:</b> <a href="tel:${phone}">${phone}</a>
${seperator}

<b>👇Order Details👇</b>

${order.items
  ?.map(
    (item: any) =>
      ` - ${item.name} ${item.quantity}x$${item.price} = <i>$${item.total}</i>`
  )
  .join("\n" + seperator + "\n")}  

${seperator}
    
<b>Addres:</b> <i>${address}</i>
<b>Email:</b> <i>${email}</i>
<b>Order Note:</b> <i>${order_note}</i>
<b>🛵Delivery Fee:</b> <i>$${delivery_fee}</i>
<b>Total VAT:</b> <i>$${(order.total * (DEFAULT_TAX_PERCENTAGE / 100)).toFixed(
    2
  )}</i>
<b>Total:</b> <code>$${order.total}</code>`;
};

export const getErrorMessage = (error: any, stack = "Error: ") => {
  let msg = stack;
  if (typeof error?.message === "string") msg += error?.message;
  if (typeof error === "string") msg += error;
  else msg += JSON.stringify(error).substring(0, 2048);

  return msg;
};
