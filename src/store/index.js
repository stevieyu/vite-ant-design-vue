import {reactive, computed} from 'vue';

const state = reactive({
  my: null,
  token: sessionStorage.getItem('token'),
});

export const refreshMy = (res = null) => {
  if (res) {
    state.me = res;
    return;
  }
  $api.get('my').json()
      .then((res) => {
        state.me = res;
      });
};

export const token = (token = '') => {
  if (token) {
    state.token = token;
    refreshMy();
    sessionStorage.setItem('token', token);
  }
  return state.token;
};
export const cleanToken = () => {
  state.token = '';
  state.my = null;
  sessionStorage.removeItem('token');
};

export default computed(() => state);
