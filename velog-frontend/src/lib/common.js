// @flow
import { pender } from 'redux-pender';
import type { $AxiosXHR, $AxiosError } from 'axios';
import koLocale from 'date-fns/locale/ko';
import distanceInWords from 'date-fns/distance_in_words';
import format from 'date-fns/format';
import removeMd from 'remove-markdown';

export const pressedEnter = (fn: () => void) => (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    fn();
  }
  return null;
};

type Reducer = (state: any, action: any) => any;

export function applyPenders<T: Reducer>(reducer: T, penders: any[]): T {
  const updaters = Object.assign({}, ...penders.map(pender));
  return ((state, action) => {
    if (updaters[action.type]) {
      return updaters[action.type](state, action);
    }
    return reducer(state, action);
  }: any);
}

export type ResponseAction = {
  type: string,
  payload: $AxiosXHR<*>,
  error: $AxiosError<*>,
  meta: any,
};

export type GenericResponseAction<D, M> = {
  type: string,
  payload: {
    data: D,
  },
  meta: M,
};

type Return_<R, F: (...args: Array<any>) => R> = R;
export type Return<T> = Return_<*, T>;

export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};
export const getScrollBottom = () => {
  if (!document.body) return 0;
  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
};

export const preventStickBottom = () => {
  const scrollBottom = getScrollBottom();
  if (scrollBottom !== 0) return;
  if (document.documentElement) {
    document.documentElement.scrollTop -= 1;
  } else {
    if (!document.body) return;
    document.body.scrollTop -= 1;
  }
};

export const escapeForUrl = (text: string): string => {
  return text
    .replace(
      /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf ]/g,
      '',
    )
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};

export const fromNow = (date: string) => {
  const now = new Date();
  const givenDate = new Date(date);
  const diff = now - givenDate;
  if (diff < 1000 * 60) {
    return '방금 전';
  }
  if (diff < 1000 * 60 * 60 * 24 * 7) {
    const distanceString = distanceInWords(now, givenDate, { locale: koLocale, addSuffix: true });
    return distanceString;
  }
  return format(givenDate, 'YYYY년 M월 D일');
};

export function convertToPlainText(markdown: string): string {
  const replaced = markdown.replace(/\n/g, ' ').replace(/```(.*)```/g, '');
  return removeMd(replaced)
    .slice(0, 100)
    .replace(/#/g, '');
}
