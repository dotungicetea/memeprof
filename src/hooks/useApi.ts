// import { getMainButton } from "@utils/getters";
// import useSWR from "swr";
// import useSWRMutation from "swr/mutation";
// import requests from "./requests";
// import { FetcherOptions } from "./useRestaurantsApi";
// import { MutationOptions } from "./useAuthApi";

// export const useFetch = (url: string, config?: FetcherOptions) => {
//   const { data, error, isLoading, isValidating, mutate } = useSWR(
//     url,
//     requests.get,
//     {
//       onSuccess: (data) => {
//         config?.onSuccess?.(data);
//       },

//       onError: (error) => {
//         config?.onError?.(error);
//       },
//     }
//   );

//   return {
//     data,
//     error,
//     mutate,
//     isLoading,
//     isValidating,
//   };
// };

// export const useDelete = (url: string, config?: MutationOptions) => {
//   const mainButton = getMainButton();

//   const { data, error, trigger, isMutating, reset } = useSWRMutation(
//     url,
//     requests.delete,
//     {
//       onSuccess: (data) => {
//         mainButton?.hideProgress();
//         config?.onSuccess?.(data);
//       },

//       onError: (error) => {
//         mainButton?.hideProgress();
//         config?.onError?.(error);
//       },
//     }
//   );

//   return {
//     data,
//     error,
//     trigger,
//     isMutating,
//     reset,
//   };
// };

// export const useUpdate = (url: string, config?: MutationOptions) => {
//   const mainButton = getMainButton();

//   const { data, error, trigger, isMutating, reset } = useSWRMutation(
//     url,
//     requests.put,
//     {
//       onSuccess: (data) => {
//         mainButton?.hideProgress();
//         config?.onSuccess?.(data);
//       },

//       onError: (error) => {
//         mainButton?.hideProgress();
//         config?.onError?.(error);
//       },
//     }
//   );

//   return {
//     data,
//     error,
//     trigger,
//     isMutating,
//     reset,
//   };
// };

// export const useCreate = (url: string, config?: MutationOptions) => {
//   const mainButton = getMainButton();

//   const { data, error, trigger, isMutating, reset } = useSWRMutation(
//     url,
//     requests.post,
//     {
//       onSuccess: (data) => {
//         mainButton?.hideProgress();
//         config?.onSuccess?.(data);
//       },

//       onError: (error) => {
//         mainButton?.hideProgress();
//         config?.onError?.(error);
//       },
//     }
//   );

//   return {
//     data,
//     error,
//     trigger,
//     isMutating,
//     reset,
//   };
// };
