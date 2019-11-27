export const store = {
    _username: '',
    _email: '',
    _token: '',
    _userId: 0,
    _user: null,

    isLogged () {
      var currentToken = this.getToken();
      return currentToken !== null && currentToken !== '';
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

    getUser() {
      return this._user || localStorage.getItem('user');
    },

    setUser(userModel) {
      if (userModel) {
        this._user = userModel;
        localStorage.setItem('user', JSON.stringify(userModel));
      }
      return this._user;
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

    logout() {
      localStorage.setItem('user', null);
      localStorage.setItem('token', null);
      localStorage.setItem('userId', null);
      localStorage.setItem('user-token', null);
    },

    getTokenModel() {
      return localStorage.getItem('user-token') || null;
    }

  }
