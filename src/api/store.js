export const store = {
    _username: '',
    _email: '',
    _token: '',
    _userId: 0,

    isLogged () {
      return this._token
    },

    getUserId() {
      return this._userId || localStorage.getItem('userId');
    },

    set username (str) {
      this._username = str
      localStorage.setItem('username',str)
    },
    get username () {
      return this._username || localStorage.getItem('username')
    },

    set email (str) {
      this._email = str
      localStorage.setItem('email',str)
    },

    get email () {
      return this._email || localStorage.getItem('email')
    },

    setToken (tokenModel) {
      if (tokenModel) {
        this._token = tokenModel.token;
        this._userId = tokenModel.userId;
        localStorage.setItem('token', tokenModel.token);
        localStorage.setItem('userId', tokenModel.userId);
        localStorage.setItem('user-token', JSON.stringify(tokenModel));
      } else {
        localStorage.setItem('user-token', null);
      }

    },
    getToken () {
      return this._token || localStorage.getItem('token');
    },

    getTokenModel() {
      return localStorage.getItem('user-token') || null;
    }

  }
