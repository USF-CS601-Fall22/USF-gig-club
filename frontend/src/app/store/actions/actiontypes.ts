export enum ActionTypes {
    LOGIN = "[Auth] Login",
    
    USER_LOGIN_SUCCESS = "[Auth] User Login Success",
    ADMIN_LOGIN_SUCCESS = "[Auth] Admin Login Success",

    LOGIN_FAILURE = "[Auth] Login Failure",
    SIGNUP = "[Auth] Signup",
    SIGNUP_SUCCESS = "[Auth] Signup Success",
    SIGNUP_FAILURE = "[Auth] Signup Failure",
    FETCH_CLASSIFIEDS = "[Classifieds] Fetch Classifieds",
    FETCH_CLASSIFIEDS_SUCCESS = "[Classifieds] Fetch Classifieds Success",
    FETCH_CLASSIFIEDS_FAILURE = "[Classifieds] Fetch Classifieds Failure",
    CREATE_CLASSIFIED = "[Classifieds] Create Classified",
    CREATE_CLASSIFIED_SUCCESS = "[Classifieds] Create Classified Success",
    CREATE_CLASSIFIED_FAILURE = "[Classifieds] Create Classified Failure",

    GET_NOTIFICATIONS_COUNT = "[Notifications] Get Notifications Count",
}
